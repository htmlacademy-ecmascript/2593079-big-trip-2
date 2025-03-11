import { render } from '../framework/render.js';
import { getFilters, SortFunctions, updateItem, FilterFunctions, sortNameAdapter } from '../utils.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventsSortView from '../view/events-sort-view.js';
import FiltersView from '../view/filters-view.js';


export default class EventsPresenter {
  #destinations;
  #events;
  #offers;
  #eventsContainer;
  #eventsModel;
  #sourcedEvents;
  #filtersContainer;
  #listComponent;
  #currentEvents;
  #sortComponent = null;
  #eventPresenters = new Map();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#listComponent = new EventsListView();
    this.#eventsModel = eventsModel;
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#events = SortFunctions.SORT_DAY([...this.#eventsModel.getEvents()]);
    this.#sourcedEvents = this.#events.slice();
    this.#destinations = [...this.#eventsModel.getDestinations()];
    this.#offers = [...this.#eventsModel.getOffers()];
    this.#currentEvents = [...this.#eventsModel.getOffers()];
    this.#sortComponent = new EventsSortView({ onSortTypeChange: this.#handleSortChange });
    this.#renderFilters();
    render(this.#sortComponent, this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);
    this.#renderEvents();
  }

  #renderFilters() {
    const filters = getFilters(this.#events);
    render(new FiltersView({ filters, onFilterChange: this.#handleFilterChange }), this.#filtersContainer);
  }

  #renderEvents = () => {
    for (let i = 0; i < this.#events.length; i++) {
      this.#createEvent(this.#events[i]);
    }
  };

  #handleFilterChange = (type) => {

    this.#clearEventsList();
    this.#events = FilterFunctions[type.toUpperCase()](this.#sourcedEvents.slice());
    this.#resetSort();
    this.#renderEvents();


  };

  #handleSortChange = (sortType) => {
    this.#events = SortFunctions[sortNameAdapter(sortType)](this.#events);
    this.#clearEventsList();
    this.#renderEvents();

  };

  #resetSort = () => {
    this.#sortComponent.element.querySelector('.trip-sort__input:checked').checked = false;
    this.#sortComponent.element.querySelector('#sort-day').checked = true;
  };

  #resetEvents = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());

  };

  #handleEventChange = (newEventData) => {

    this.#events = updateItem(this.#events, newEventData);
    this.#eventPresenters.get(newEventData.id).init(newEventData);
  };

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #createEvent(event) {

    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent,
      allDestinations: this.#eventsModel.getAllDestinationsNames(),
      eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#resetEvents
    });
    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);

  }


}

