import { render } from '../render.js';
import AddEventView from '../view/add-event-view.js';
import EditEventView from '../view/edit-event-view.js';
import EventView from '../view/event-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsSortView from '../view/events-sort-view.js';

export default class EventsPresenter {

  listComponent = new EventsListView();

  constructor({ eventsContainer }) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new EventsSortView(), this.eventsContainer);
    render(this.listComponent, this.eventsContainer);
    render(new EditEventView(), this.listComponent.getElement());
    render(new AddEventView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.listComponent.getElement());
    }
  }
}
