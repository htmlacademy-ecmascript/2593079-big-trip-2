import { UpdateTypes, UserActions } from '../consts.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { getNewEvent } from '../utils/utils.js';
import EditEventView from '../view/edit-event-view';


export default class NewEventPresenter {
  #listComponent = null;
  #eventsModel = null;
  #editEventFormComponent = null;
  #onDataChange = null;
  #allDestinationsNames = null;
  #handleCloseClick = null;

  constructor({ listComponent, eventsModel, onDataChange, handleCloseClick }) {
    this.#listComponent = listComponent;
    this.#eventsModel = eventsModel;
    this.#onDataChange = onDataChange;
    this.#handleCloseClick = handleCloseClick;
    this.#allDestinationsNames = this.#eventsModel.getAllDestinationsNames();
  }

  init() {
    const event = getNewEvent();
    const fullDestination = this.#eventsModel.getDestinationById(event.destination);
    const allOffers = this.#eventsModel.offers;
    const allDestinations = this.#eventsModel.destinations;
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#editEventFormComponent = new EditEventView({
      event,
      fullDestination,
      allOffers,
      allDestinations,
      allDestinationsNames: this.#allDestinationsNames,
      onDeleteClick: this.#cancelClickHandler,
      onSubmit: this.#onFormSubmit,
      onCloseClick: () => {
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    });

    render(this.#editEventFormComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    this.#handleCloseClick();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#editEventFormComponent);
  }

  setSaving() {
    this.#editEventFormComponent.updateElement({ isDisabled: true, isSaving: true });
    document.addEventListener('keydown', this.#onEscKeyDown);

  }

  setAborting() {
    const resetEditingForm = () => {
      this.#editEventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editEventFormComponent.shake(resetEditingForm);
    document.addEventListener('keydown', this.#onEscKeyDown);

  }

  #onFormSubmit = (update) => {
    this.#onDataChange(UserActions.ADD_EVENT, UpdateTypes.MAJOR, update);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #cancelClickHandler = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);

    }
  };

}
