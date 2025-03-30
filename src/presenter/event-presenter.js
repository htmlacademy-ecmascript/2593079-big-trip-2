import { Mode, UpdateTypes, UserActions } from '../consts';
import { remove, render, replace } from '../framework/render';
import { isDatesEqual } from '../utils/time';
import EditEventView from '../view/edit-event-view';
import EventView from '../view/event-view';

export default class EventPresenter {
  #event = null;
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
    const allOffers = this.#eventsModel.offers;
    const allDestinations = this.#eventsModel.destinations;

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
      onDeleteClick: this.#handleDeleteClick,
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

  #handleDeleteClick = (data) => {
    this.#onDataChange(UserActions.DELETE_EVENT, UpdateTypes.MINOR, data);
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
    this.#onDataChange(UserActions.UPDATE_EVENT, UpdateTypes.MINOR, { ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editEventFormComponent.reset();
      this.#replaceEditFormToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onFormSubmit = (update) => {
    const isMinorUpdate = (!isDatesEqual(this.#event.dateFrom, update.dateFrom) || !isDatesEqual(this.#event.dateTo, update.dateTo))
      || this.#event.basePrice !== update.basePrice;
    this.#onDataChange(UserActions.UPDATE_EVENT, isMinorUpdate ? UpdateTypes.MINOR : UpdateTypes.PATCH, update);
    // this.#replaceEditFormToEvent();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  // #getDestinationByName = (name) => this.#eventsModel.getDestinationByName(name);

}
