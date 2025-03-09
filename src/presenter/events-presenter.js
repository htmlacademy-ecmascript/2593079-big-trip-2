import { render } from '../framework/render.js';
import { getFilters, SortFunctions, updateItem } from '../utils.js';
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
  #eventPresenters = new Map();

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#listComponent = new EventsListView();
    this.#eventsModel = eventsModel;
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#events = SortFunctions.SORT_DAY([...this.#eventsModel.getEvents()]);
    this.#sourcedEvents = this.#events;
    this.#destinations = [...this.#eventsModel.getDestinations()];
    this.#offers = [...this.#eventsModel.getOffers()];
    this.#currentEvents = [...this.#eventsModel.getOffers()];
    this.#renderFilters();
    render(new EventsSortView(), this.#eventsContainer);
    render(this.#listComponent, this.#eventsContainer);
    this.#renderEvents();
  }

  #renderFilters() {
    const filters = getFilters(this.#events);
    render(new FiltersView({ filters }), this.#filtersContainer);
  }

  #renderEvents(events = this.#events) {
    for (let i = 0; i < events.length; i++) {
      this.#createEvent(events[i]);
    }
  }

  #handleEventChange = (newEventData) => {

    this.#events = updateItem(this.#events, newEventData);
    this.#eventPresenters.get(newEventData.id).init(newEventData);
  };

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

  }

  #resetView() {
    this.#eventPresenters.map((presenter) => presenter.resetView());
  }

  #createEvent(event) {

    const eventPresenter = new EventPresenter({
      listComponent: this.#listComponent,
      allDestinations: this.#eventsModel.getAllDestinationsNames(),
      eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventChange
    });
    this.#eventPresenters.set(event.id, eventPresenter);
    eventPresenter.init(event);

  }


}

