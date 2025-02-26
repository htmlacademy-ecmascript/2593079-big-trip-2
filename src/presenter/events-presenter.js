import { render, replace } from '../framework/render.js';
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

    for (let i = 1; i < this.events.length; i++) {
      const event = this.events[i];
      const type = this.events[i].type;
      const destination = this.eventsModel.getDestinationById(event.destination);
      const offers = this.eventsModel.getOffersById(event.offers, type);

      const eventComponent = new EventView({
        event, destination, offers, onClick: () => {
          replaceEventToEditForm();
          document.addEventListener('keydown', onEscKeyDown);
        }
      });
      const editEventFormComponent = new EditEventView({
        event, destination, offers,
        allDestinations: this.eventsModel.getAllDestinationsNames(),
        onSubmit: () => {
          replaceEditFormToEvent();
          document.removeEventListener('keydown', onEscKeyDown);
        },
        onClick: () => replaceEditFormToEvent()
      });

      // Ругается на Function Declaration, хотя без поднятия здесь никак(есть ли какой-нибудь совет?)

      function onEscKeyDown(event) {
        event.preventDefault();
        replaceEditFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
      function replaceEventToEditForm() {
        replace(editEventFormComponent, eventComponent);
      };
      function replaceEditFormToEvent() {
        replace(eventComponent, editEventFormComponent);
      };
      render(eventComponent, this.listComponent.element);

    }
  }
}
