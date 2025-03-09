import { remove, render, replace } from '../framework/render';
import EditEventView from '../view/edit-event-view';
import EventView from '../view/event-view';

export default class EventPresenter {
  #event = null;
  #allDestinations = null;
  #listComponent = null;
  #eventsModel = null;
  #eventComponent = null;
  #editEventFormComponent = null;
  #onDataChange = null;

  constructor({ allDestinations, listComponent, eventsModel, onDataChange }) {
    this.#allDestinations = allDestinations;
    this.#listComponent = listComponent;
    this.#eventsModel = eventsModel;
    this.#onDataChange = onDataChange;
  }

  init = (event) => {
    this.#event = event;

    const type = event.type;
    const destination = this.#eventsModel.getDestinationById(event.destination);
    const offers = this.#eventsModel.getOffersById(event.offers, type);

    const prevEventComponent = this.#eventComponent;
    const prevEditEventFormComponent = this.#editEventFormComponent;


    this.#eventComponent = new EventView({
      event,
      destination,
      offers,
      onClick: () => {
        this.#replaceEventToEditForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      onFavoriteClick: this.#handleFavoriteClick

    });

    this.#editEventFormComponent = new EditEventView({
      event,
      destination,
      offers,
      allDestinations: this.#allDestinations,
      onSubmit: this.#onFormSubmit,
      onClick: () => {
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    });

    if (prevEventComponent === null && prevEditEventFormComponent === null) {
      render(this.#eventComponent, this.#listComponent.element);
      return;
    }


    if (this.#listComponent.element.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#listComponent.element.contains(prevEditEventFormComponent.element)) {
      replace(this.#editEventFormComponent, prevEditEventFormComponent);
    }

    remove(prevEditEventFormComponent);
    remove(prevEventComponent);

  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventFormComponent);
  }

  #replaceEventToEditForm() {
    replace(this.#editEventFormComponent, this.#eventComponent);

  }

  #replaceEditFormToEvent() {
    replace(this.#eventComponent, this.#editEventFormComponent);

  }

  #handleFavoriteClick = () => {
    this.#onDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #onEscKeyDown(evt) {
    evt.preventDefault();
    this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onFormSubmit = (task) => {
    this.#onDataChange(task);
    this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

}
