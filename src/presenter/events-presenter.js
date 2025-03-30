import { remove, render, RenderPosition } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventsSortView from '../view/events-sort-view.js';
import { FilterFunctions, SortFunctions } from '../utils/time.js';
import { sortNameAdapter } from '../utils/utils.js';
import { FilterTypes, SortTypes, UpdateTypes, UserActions } from '../consts.js';
import NoEventsView from '../view/no-events-view.js';
import NewEventBtnView from '../view/new-event-btn-view.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view.js';


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
  #noEventComponent = null;
  #loadingComponent = null;
  #isLoading = true;

  constructor({ eventsContainer, eventsModel, filterModel, newEventBtnContainer }) {
    this.#eventsContainer = eventsContainer;
    this.#newEventBtnContainer = newEventBtnContainer;
    this.#listComponent = new EventsListView();
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#eventsModel.destinations];
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#newEventBtnComponent = new NewEventBtnView({ onClick: this.#newEventBtnClickHandler });
    render(this.#newEventBtnComponent, this.#newEventBtnContainer);
    render(this.#listComponent, this.#eventsContainer);
    this.#renderEvents();

  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = FilterFunctions[filterType](events);
    return SortFunctions[this.#currentSort](filteredEvents);

  }

  #newEventBtnClickHandler = () => {
    this.#filterModel.setFilter(UpdateTypes.MAJOR, FilterTypes.EVERYTHING);
    this.#disableNewEventBtn();
    this.#resetEvents();
    this.#clearNoEvent();
    this.#createNewEvent();
  };

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

  #handleSortChange = (sortType) => {
    this.#currentSort = sortNameAdapter(sortType);
    this.#clearEventsList();
    this.#renderEvents();

  };

  #handleViewAction = (actionType, updateType, update) => {

    switch (actionType) {
      case UserActions.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        this.#eventsModel.addEvent(updateType, update).catch(() => {
          this.#newEventPresenter.setAborting();
        });
        break;
      case UserActions.DELETE_EVENT:
        this.#eventPresenters.get(update.id).setDeleting();

        this.#eventsModel.deleteEvent(updateType, update).catch(() => {
          this.#eventPresenters.get(update.id).setAborting();
        });

        break;
      case UserActions.UPDATE_EVENT:
        this.#eventPresenters.get(update.id).setSaving();

        this.#eventsModel.updateEvent(updateType, update).catch(() => {
          this.#eventPresenters.get(update.id).setAborting();

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
    }


  };

  #resetSort() {
    this.#sortComponent?.resetSort();
    this.#currentSort = SortTypes.SORT_DAY;
  }

  #resetEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
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
}

