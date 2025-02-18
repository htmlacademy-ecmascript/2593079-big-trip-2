import { render } from '../render.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsSortView from '../view/events-sort-view.js';

export default class EventsPresenter {

  listComponent = new EventsListView();

  constructor({ eventsContainer, eventsModel }) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }


  init() {
    this.events = [...this.eventsModel.getEvents()];
    this.destinations = [...this.eventsModel.getDestinations()];
    this.offers = [...this.eventsModel.getOffers()];
    render(new EventsSortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);

    render(new EditEventView({ event: this.events[0], destination: this.eventsModel.getDestinationById(this.events[0].destination), offers: this.eventsModel.getOffersById(this.events[0].offers, this.events[0].type) }), this.listComponent.getElement());

    render(new AddEventView(), this.listComponent.getElement());

    for (let i = 1; i < this.events.length; i++) {
      const event = this.events[i];
      const type = this.events[i].type;
      const destination = this.eventsModel.getDestinationById(event.destination);
      const offers = this.eventsModel.getOffersById(event.offers, type);

      render(new EventView({ event, destination, offers }), this.listComponent.getElement());
    }
  }
}
