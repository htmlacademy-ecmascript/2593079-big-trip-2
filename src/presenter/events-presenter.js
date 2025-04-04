import { remove, render, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventsSortView from '../view/events-sort-view.js';
import { FilterFunctions, SortFunctions } from '../utils/time.js';
import { sortNameAdapter } from '../utils/utils.js';
import { FilterTypes, SortTypes, UIBLOCK_LOWER_LIMIT, UIBLOCK_UPPER_LIMIT, UpdateTypes, UserActions } from '../consts.js';
import NoEventsView from '../view/no-events-view.js';
import NewEventBtnView from '../view/new-event-btn-view.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import FailedLoadingView from '../view/failed-loading-view.js';


export default class EventsPresenter {
  #destinations = null;
  #eventsContainer = null;
  #eventsModel = null;
  #filterModel = null;
  #listComponent = null;
  #sortComponent = null;
  #eventPresenters = new Map();
  #currentSort = SortTypes.SORT_DAY;
  #newEventBtnComponent = null;
  #newEventBtnContainer = null;
  #newEventPresenter = null;
  #eventsInfoPresenter = null;
  #noEventComponent = null;
  #loadingComponent = null;
  #isLoading = true;
  #uiBlocker = null;
  #failedLoadingComponent = null;

  constructor({ eventsContainer, eventsModel, filterModel, newEventBtnContainer, eventsInfoPresenter }) {
    this.#eventsContainer = eventsContainer;
    this.#newEventBtnContainer = newEventBtnContainer;
    this.#eventsInfoPresenter = eventsInfoPresenter;
    this.#listComponent = new EventsListView();
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#eventsModel.destinations];
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#uiBlocker = new UiBlocker({ lowerLimit: UIBLOCK_LOWER_LIMIT, upperLimit: UIBLOCK_UPPER_LIMIT });
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = FilterFunctions[filterType](events);
    return SortFunctions[this.#currentSort](filteredEvents);

  }

  init() {
    this.#newEventBtnComponent = new NewEventBtnView({ onClick: this.#newEventBtnClickHandler });
    render(this.#newEventBtnComponent, this.#newEventBtnContainer);
    render(this.#listComponent, this.#eventsContainer);
    this.#renderEvents();

  }

  initSort() {
    if (!this.#sortComponent) {
      this.#sortComponent = new EventsSortView({ onSortTypeChange: this.#handleSortChange });
      render(this.#sortComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    }
  }


  #activateNewEventBtn() {
    this.#newEventBtnComponent.activate();
  }

  #disableNewEventBtn() {
    this.#newEventBtnComponent.disable();
  }

  #createNewEvent = () => {

    if (!this.#newEventPresenter) {
      const newEventPresenter = new NewEventPresenter({
        listComponent: this.#listComponent,
        eventsModel: this.#eventsModel,
        allDestinations: this.#destinations,
        onDataChange: this.#handleViewAction,
        handleCloseClick: () => {
          this.#activateNewEventBtn();
          if (this.events.length === 0) {
            this.#clearNoEvent();
            this.#createNoEvent();
          }
        }
      });
      this.#newEventPresenter = newEventPresenter;
    }
    this.#newEventPresenter.init();
  };

  #resetSort() {
    this.#sortComponent?.resetSort();
    this.#currentSort = SortTypes.SORT_DAY;
  }

  #resetEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
    this.#newEventPresenter?.destroy();

  };

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    this.#newEventPresenter?.destroy();
  }

  #createEvent(event) {

    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent,
      eventsModel: this.#eventsModel,
      allDestinations: this.#destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#resetEvents
    });

    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);

  }

  #createNoEvent() {
    this.#noEventComponent = new NoEventsView(this.#filterModel.filter);
    render(this.#noEventComponent, this.#eventsContainer);
  }

  #renderEvents() {
    const events = this.events;
    if (this.#isLoading) {
      this.#disableNewEventBtn();
      this.#renderLoading();
      return;
    }
    if (events.length === 0) {
      this.#createNoEvent();
      remove(this.#sortComponent);
      this.#sortComponent = null;
    } else {
      this.initSort();
      for (let i = 0; i < events.length; i++) {
        this.#createEvent(events[i]);
      }
    }
  }

  #renderLoading() {
    this.#loadingComponent = new LoadingView();
    render(this.#loadingComponent, this.#listComponent.element);
  }

  #renderFailedLoading() {
    this.#failedLoadingComponent = new FailedLoadingView();
    render(this.#failedLoadingComponent, this.#listComponent.element);
  }

  #clearLoading() {
    remove(this.#loadingComponent);
    this.#loadingComponent = null;
  }

  #clearNoEvent() {
    if (this.#noEventComponent) {
      remove(this.#noEventComponent);
      this.#noEventComponent = null;
    }
  }

  #desactivateNewEventBtn() {
    this.#newEventBtnComponent.desactivate();
  }

  #handleViewAction = (actionType, updateType, update) => {
    this.#uiBlocker.block();
    this.#desactivateNewEventBtn();

    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        this.#eventsModel.addEvent(updateType, update).catch(() => {
          this.#newEventPresenter.setAborting();
        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewEventBtn();
        });
        break;

      case UserActions.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();

        this.#eventsModel.deleteEvent(updateType, update).catch(() => {
          this.#eventPresenters.get(update.id).setAborting();
        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewEventBtn();

        });
        break;

      case UserActions.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();

        this.#eventsModel.updateEvent(updateType, update).catch(() => {
          this.#eventPresenters.get(update.id).setAborting();

        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewEventBtn();

        });
        break;
    }

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateTypes.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        this.#resetEvents();
        this.#activateNewEventBtn();
        break;

      case UpdateTypes.MINOR:

        this.#clearEventsList();
        this.#clearNoEvent();
        this.#renderEvents();
        break;

      case UpdateTypes.MAJOR:

        this.#clearEventsList();
        this.#clearNoEvent();
        this.initSort();
        this.#resetSort();
        this.#renderEvents();
        break;

      case UpdateTypes.INIT:

        this.#clearLoading();
        this.#activateNewEventBtn();
        this.#isLoading = false;
        this.initSort();
        this.#resetSort();
        this.#renderEvents();
        break;

      case UpdateTypes.FAILED:
        this.#clearLoading();
        this.#isLoading = false;
        this.#renderFailedLoading();
        break;
    }
    this.#eventsInfoPresenter.init(this.#eventsModel.events);


  };

  #handleSortChange = (sortType) => {
    this.#currentSort = sortNameAdapter(sortType);
    this.#clearEventsList();
    this.#renderEvents();

  };

  #newEventBtnClickHandler = () => {
    this.#disableNewEventBtn();
    this.#clearNoEvent();
    this.#resetEvents();
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
    this.#createNewEvent();
  };


}

