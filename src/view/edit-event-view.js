import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getTimeFromTemplate, toUppercaseFirstLetter, toKebabCase, DateTemplates } from '../utils.js';

const EVENTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_EVENT = {
  basePrice: 0,
  type: 'flight'
};

function createDestinationPicturesTemplate(destination) {

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img >`).join('')}
      </div>
    </div>
  `;
}

function createEditEventDestinationTemplate(destination) {
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${destination.pictures.length ? createDestinationPicturesTemplate(destination) : ''}
  </section>

  `;
}

function createEditEventOffersTemplate({ offers, allOffers }) {
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${allOffers.map((offer) => {
    const isCheckedAttribute = offers.some((activeOffer) => activeOffer === offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${toKebabCase(offer.title)}" ${isCheckedAttribute}>
      <label class="event__offer-label" for="${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('')}
  </section>`;

}

function createEditEventTypeListTemplate(checkedType) {

  return `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${EVENTS_TYPES.map((type) => `
        <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === checkedType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${toUppercaseFirstLetter(type)}</label>
      </div>
        `).join('')}

    </fieldset>
  </div>
  `;
}

function createEditEventRollupBtnTemplate() {
  return `<button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
          </button>`;

}

function createEditEventDestinationsListTemplate(allDestinations) {
  return `
  <datalist id="destination-list-1">
  ${allDestinations.map((destinationName) => `
    <option value="${destinationName}"></option>
    `).join('')}
  </datalist>`;
}

function createEditEventTemplate({ basePrice, type, dateTo, dateFrom, allOffers, allDestinations, isNew, offers, fullDestination }) {

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${createEditEventTypeListTemplate(type)}
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isNew ? '' : fullDestination.name}" list="destination-list-1">
                    ${createEditEventDestinationsListTemplate(allDestinations)}
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getTimeFromTemplate(DateTemplates.DATETIME_INPUT_FORMAT, dateFrom)}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getTimeFromTemplate(DateTemplates.DATETIME_INPUT_FORMAT, dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">${basePrice}</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete'}</button>
                  ${!isNew ? createEditEventRollupBtnTemplate() : ''}
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${!isNew && allOffers.length ? createEditEventOffersTemplate({ offers, allOffers }) : ''}

                  ${!isNew && fullDestination.description ? createEditEventDestinationTemplate(fullDestination) : ''}
                </section>
              </form>
            </li>`;
}
/**
 * @param {Object} eventData
 * @param {Object} [eventData.event] Объект события
 * @param {Object} [eventData.destination] Объект пункта назначения
 * @param {Array} [eventData.offers] Массив предложений
 * @param {Array} eventData.allDestinations Массив всех доступных пунктов назначения
 * @returns {Object<EditEventView>} Возвращает экземпляр EditEventView
 */


export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #handleSubmit = null;
  #handleCloseClick = null;
  #getAllOffers = null;
  #getDestination = null;
  #sourcedState = null;


  constructor({ event, fullDestination, allOffers, allDestinations, onSubmit, onCloseClick, getAllOffers, getDestination } = DEFAULT_EVENT) {
    super();
    this.#event = event || DEFAULT_EVENT;
    this._setState({ ...event, fullDestination, allOffers, allDestinations });
    this.#sourcedState = { ...event, fullDestination, allOffers, allDestinations };
    this.#handleSubmit = onSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#getDestination = getDestination;
    this.#getAllOffers = getAllOffers;
    this._restoreHandlers();

  }

  get template() {
    return createEditEventTemplate({ ...this._state, isNew: this.#event === DEFAULT_EVENT });
  }

  #submitHandler = (event) => {
    event.preventDefault();
    this.#event = EditEventView.parseStateToEvent(this._state);
    this.#handleSubmit(this.#event);
  };

  #clickCloseHandler = (event) => {
    event.preventDefault();
    this.#handleCloseClick();
  };

  static parseStateToEvent(state) {
    const newEvent = structuredClone(state);
    delete newEvent.allDestinations;
    delete newEvent.allOffers;
    delete newEvent.fullDestination;

    return newEvent;
  }

  reset = () => {
    this.updateElement(this.#sourcedState);
  };

  _restoreHandlers() {
    this.element.querySelector('form.event').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickCloseHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#changeOfferHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#changePriceHandler);
  }

  #changeTypeHandler = (evt) => {
    this.updateElement({ allOffers: this.#getAllOffers(evt.target.value), type: evt.target.value, offers: [] });

  };

  #changeOfferHandler = (evt) => {
    const isChecked = evt.target.checked;

    if (isChecked) {

      const updatedOffers = [...this._state.offers, evt.target.id];
      this._setState({ offers: updatedOffers });

    } else {

      const updatedOffers = this._state.offers.filter((id) => id !== evt.target.id);
      this._setState({ offers: updatedOffers });
    }
  };

  #changeDestinationHandler = (evt) => {
    const newDestination = this.#getDestination(evt.target.value) ?? this._state.fullDestination;
    this.updateElement({ fullDestination: newDestination, destination: newDestination.id });
  };

  #changePriceHandler = (evt) => {
    this._setState({ basePrice: evt.target.value });
  };

}
