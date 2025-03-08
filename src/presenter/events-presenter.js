import { render, replace } from '../framework/render.js';
import { FilterFunctions, getFilters, removeChildren, SortFunctions, sortNameAdapter } from '../utils.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsSortView from '../view/events-sort-view.js';
import FiltersView from '../view/filters-view.js';
import NoEventsView from '../view/no-events-view.js';


export default class EventsPresenter {
  #destinations;
  #events;
  #offers;
  #eventsContainer;
  #eventsModel;
  #noEventsView;
  #filtersContainer;
  #listComponent;
  #currentEvents;

  constructor({ eventsContainer, eventsModel }) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    this.#events = SortFunctions.SORT_DAY([...this.#eventsModel.getEvents()]);
    this.#destinations = [...this.#eventsModel.getDestinations()];
    this.#offers = [...this.#eventsModel.getOffers()];

    const filters = getFilters(this.#events);

    render(new FiltersView({ filters, onClick: this.#onFilterClick }), this.#filtersContainer);

    this.#renderEvents();

  }

  #renderEvents(events = this.#events) {
    this.#currentEvents = events;


    if (events.length === 0) {

      this.#clearEvents();
      render(this.#noEventsView, this.#eventsContainer);
      this.#listComponent = null;

    } else {

      if (!this.#listComponent) {
        this.#clearEvents();
      }
      render(new EventsSortView({ onClick: this.#onSortClick }), this.#eventsContainer);
      this.#clearEventsList();
      this.#listComponent = new EventsListView();
      render(this.#listComponent, this.#eventsContainer);

      for (let i = 0; i < events.length; i++) {

        this.#createEvent(events[i]);
      }
    }
  }

  #onSortClick = (type) => {
    const sortedEvents = SortFunctions[sortNameAdapter(type)](this.#currentEvents);
    this.#renderEvents(sortedEvents);
  };

  #clearEvents = () => {
    removeChildren(this.#eventsContainer, 1);
  };

  #clearEventsList = () => {
    removeChildren(this.#eventsContainer, 2);
  };

  #createEvent(event) {
    const type = event.type;
    const destination = this.#eventsModel.getDestinationById(event.destination);
    const offers = this.#eventsModel.getOffersById(event.offers, type);

    const eventComponent = new EventView({
      event, destination, offers, onClick: () => {
        replaceEventToEditForm();
        document.addEventListener('keydown', onEscKeyDown);
      }
    });
    const editEventFormComponent = new EditEventView({
      event, destination, offers,
      allDestinations: this.#eventsModel.getAllDestinationsNames(),
      onSubmit: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      },
      onClick: () => {
        replaceEditFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function onEscKeyDown(evt) {
      evt.preventDefault();
      replaceEditFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }

    function replaceEventToEditForm() {
      replace(editEventFormComponent, eventComponent);
    }

    function replaceEditFormToEvent() {
      replace(eventComponent, editEventFormComponent);
    }

    render(eventComponent, this.#listComponent.element);
  }

  #onFilterClick = (type) => {
    const filteredEvents = FilterFunctions[type.toUpperCase()](this.#events);

    if (filteredEvents.length === 0) {
      this.#noEventsView = new NoEventsView(type);
    }

    this.#renderEvents(filteredEvents);

  };
}
