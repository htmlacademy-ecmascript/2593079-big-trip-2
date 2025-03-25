import { UpdateTypes, UserActions } from '../consts.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { getNewEvent } from '../utils/utils.js';
import EditEventView from '../view/edit-event-view';


export default class NewEventPresenter {
  // #event = null;
  #listComponent = null;
  #eventsModel = null;
  #eventComponent = null;
  #editEventFormComponent = null;
  #onDataChange = null;
  #allDestinationsNames = null;
  #handleCancelClick = null;

  constructor({ listComponent, eventsModel, onDataChange, handleCancelClick }) {
    this.#listComponent = listComponent;
    this.#eventsModel = eventsModel;
    this.#onDataChange = onDataChange;
    this.#handleCancelClick = handleCancelClick;
    // this.#handleModeChange = onModeChange;
    this.#allDestinationsNames = this.#eventsModel.getAllDestinationsNames();
  }

  init() {
    const event = getNewEvent();
    // const type = event.type;
    const fullDestination = this.#eventsModel.getDestinationById(event.destination);
    // const fullOffers = this.#eventsModel.getOffersById(event.offers, type);
    const allOffers = this.#eventsModel.getOffers();
    const allDestinations = this.#eventsModel.getDestinations();

    // const prevEventComponent = this.#eventComponent;
    // const prevEditEventFormComponent = this.#editEventFormComponent;

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

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onFormSubmit = (update) => {

    this.#onDataChange(UserActions.ADD_EVENT, UpdateTypes.MAJOR, update);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #cancelClickHandler = () => {
    this.destroy();
    this.#handleCancelClick();
  };


  destroy() {
    remove(this.#editEventFormComponent);
  }

}
