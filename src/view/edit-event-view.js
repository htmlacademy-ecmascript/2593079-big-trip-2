import AbstractView from '../framework/view/abstract-view.js';
import { getTimeFromTemplate, toUppercaseFirstLetter, toKebabCase, DateTemplates } from '../utils.js';

const EVENTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_EVENT = {
  basePrice: 0,
  type: 'flight'
};

let checkboxNameCount = 0;

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

function createEditEventOffersTemplate({ event, offers }) {
  checkboxNameCount++;
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${offers.map((offer) => {
    const isCheckedAttribute = event.offers.some((activeOffer) => activeOffer === offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${toKebabCase(offer.title)}-${checkboxNameCount}" type="checkbox" name="event-offer-${toKebabCase(offer.title)}" ${isCheckedAttribute}>
      <label class="event__offer-label" for="event-offer-${toKebabCase(offer.title)}-${checkboxNameCount}">
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

function createEditEventTemplate({ event, destination, offers, allDestinations }) {

  const { type, dateTo, dateFrom, basePrice } = event;
  const isNew = event === DEFAULT_EVENT;

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isNew ? '' : destination.name}" list="destination-list-1">
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
                  ${!isNew && offers.length ? createEditEventOffersTemplate({ event, offers }) : ''}

                  ${!isNew && destination.description ? createEditEventDestinationTemplate(destination) : ''}
                </section>
              </form>
            </li>`;
}

export default class EditEventView extends AbstractView {
  #event;
  #destination;
  #offers;
  #allDestinations;


  constructor({ event, destination, offers, allDestinations } = DEFAULT_EVENT) {
    super();
    this.#event = event || DEFAULT_EVENT;
    this.#destination = destination;
    this.#offers = offers;
    this.#allDestinations = allDestinations;

  }

  get template() {
    return createEditEventTemplate({ event: this.event, destination: this.destination, offers: this.offers, isNew: this.isNew, allDestinations: this.allDestinations });
  }

}
