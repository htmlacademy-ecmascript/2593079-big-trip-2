import { remove, render, replace } from '../framework/render';
import EditEventView from '../view/edit-event-view';
import EventView from '../view/event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class EventPresenter {
  #event = null;
  #allDestinations = null;
  #listComponent = null;
  #eventsModel = null;
  #eventComponent = null;
  #editEventFormComponent = null;
  #onDataChange = null;
  #handleModeChange;
  #mode = Mode.DEFAULT;
  #allDestinationsNames = null;

  constructor({ listComponent, eventsModel, onDataChange, onModeChange, }) {
    this.#listComponent = listComponent;
    this.#eventsModel = eventsModel;
    this.#onDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#allDestinationsNames = this.#eventsModel.getAllDestinationsNames();
  }

  init = (event) => {
    this.#event = event;

    const type = event.type;
    const fullDestination = this.#eventsModel.getDestinationById(event.destination);
    const fullOffers = this.#eventsModel.getOffersById(event.offers, type);
    const allOffers = this.#eventsModel.getOffers();
    const allDestinations = this.#eventsModel.getDestinations();

    const prevEventComponent = this.#eventComponent;
    const prevEditEventFormComponent = this.#editEventFormComponent;


    this.#eventComponent = new EventView({
      event,
      fullDestination,
      fullOffers,
      onOpenClick: () => {
        this.#replaceEventToEditForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      onFavoriteClick: this.#handleFavoriteClick

    });

    this.#editEventFormComponent = new EditEventView({
      event,
      fullDestination,
      allOffers,
      allDestinations,
      allDestinationsNames: this.#allDestinationsNames,
      onSubmit: this.#onFormSubmit,
      onCloseClick: () => {
        this.#editEventFormComponent.reset();
        this.#replaceEditFormToEvent();
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    });

    if (prevEventComponent === null && prevEditEventFormComponent === null) {
      render(this.#eventComponent, this.#listComponent.element);
      return;
    }


    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editEventFormComponent, prevEditEventFormComponent);
    }

    remove(prevEditEventFormComponent);
    remove(prevEventComponent);

  };

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editEventFormComponent.reset();
      this.#replaceEditFormToEvent();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#editEventFormComponent);
  }

  #replaceEventToEditForm = () => {
    replace(this.#editEventFormComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToEvent() {

    replace(this.#eventComponent, this.#editEventFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#onDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editEventFormComponent.reset();
      this.#replaceEditFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onFormSubmit = (event) => {
    this.#onDataChange(event);
    this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);

}
