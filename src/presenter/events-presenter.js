import { render } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventsSortView from '../view/events-sort-view.js';
import FiltersView from '../view/filters-view.js';
import { defaultSort, FilterFunctions, getFilters, SortFunctions } from '../utils/time.js';
import { sortNameAdapter, updateItem } from '../utils/utils.js';
import { FilterTypes, SortTypes } from '../consts.js';


export default class EventsPresenter {
  #destinations;
  #eventsContainer;
  #eventsModel;
  #filtersContainer;
  #listComponent;
  #sortComponent = null;
  #eventPresenters = new Map();
  #currentFilter = FilterTypes.EVERYTHING;
  #currentSort = SortTypes.SORT_DAY;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#listComponent = new EventsListView();
    this.#eventsModel = eventsModel;
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#destinations = [...this.#eventsModel.getDestinations()];
    this.#sortComponent = new EventsSortView({ onSortTypeChange: this.#handleSortChange });
    this.#renderFilters();
    render(this.#sortComponent, this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);

    this.#renderEvents();
  }

  get events() {
    return SortFunctions[this.#currentSort](FilterFunctions[this.#currentFilter](this.#eventsModel.events));
  }

  #renderFilters() {
    const filters = getFilters(this.events);
    render(new FiltersView({ filters, onFilterChange: this.#handleFilterChange }), this.#filtersContainer);
  }

  #renderEvents() {
    const events = this.events;
    for (let i = 0; i < events.length; i++) {
      this.#createEvent(events[i]);
    }
  }

  #handleFilterChange = (type) => {
    this.#currentFilter = type.toUpperCase();
    this.#clearEventsList();
    this.#currentSort = SortTypes.SORT_DAY;
    this.#sortComponent.resetSort();
    this.#renderEvents();
  };

  #handleSortChange = (sortType) => {
    this.#currentSort = sortNameAdapter(sortType);
    this.#clearEventsList();
    this.#renderEvents();

  };

  #resetEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());

  };

  #handleEventChange = (newEventData) => {
    this.#eventPresenters.get(newEventData.id).init(newEventData);
  };

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #createEvent(event) {

    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent,
      eventsModel: this.#eventsModel,
      allDestinations: this.#destinations,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#resetEvents
    });

    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);

  }


}

