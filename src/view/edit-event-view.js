import { createElement } from '../render.js';
import { getTimeFromTemplate, toUppercaseFirstLetter, toKebabCase } from '../utils.js';

const EVENTS_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DEFAULT_EVENT = {
  isNew: true,
  event: {

    id: '5e52eb63-20bf-48e3-824c-d5d4538101c7',
    basePrice: 2511,
    dateFrom: '2025-02-10T00:00:00.957Z',
    dateTo: '2025-02-10T12:00:00.957Z',
    destination: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    isFavorite: true,
    offers: [
      'cba06821-0983-48e1-a3e0-af055ab42e69',
      '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      'a2026208-7504-446b-ae62-f71e89879210',
      'f3a8c33b-3019-4bc8-9881-fdcf296b9027'
    ],
    type: 'ship'

  },
  destination: {
    id: 'b8f91f69-45f7-4c31-b59a-eda9d22ba341',
    description: 'Munich - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Munich',
    pictures: [
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/15.jpg',
        description: 'Munich with crowded streets'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/10.jpg',
        description: 'Munich famous for its crowded street markets with the best street food in Asia'
      },
      {
        src: 'https://22.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Munich middle-eastern paradise'
      }]
  },
  offers: [
    {
      id: 'be02a8b1-e2ba-48f3-82a3-79f690f9638a',
      title: 'Choose meal',
      price: 112
    },
    {
      id: '6f99087f-2b81-4654-9c2b-efe1d4ef615c',
      title: 'Choose seats',
      price: 115
    },
    {
      id: 'cba06821-0983-48e1-a3e0-af055ab42e69',
      title: 'Upgrade to comfort class',
      price: 79
    },
    {
      id: '601f1aa7-01b5-4c99-9c64-8270b76ee1ed',
      title: 'Upgrade to business class',
      price: 75
    },
    {
      id: 'a2026208-7504-446b-ae62-f71e89879210',
      title: 'Add luggage',
      price: 135
    },
    {
      id: 'f3a8c33b-3019-4bc8-9881-fdcf296b9027',
      title: 'Business lounge',
      price: 165
    }
  ],
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

function createEditEventTypeListTemplate() {

  return `
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${EVENTS_TYPES.map((type) => `
        <div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
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

function createEditEventTemplate({ event, destination, offers, isNew }) {

  const { type, dateTo, dateFrom, basePrice } = event;


  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                  </div>
                  ${createEditEventTypeListTemplate()}

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getTimeFromTemplate('YY/MM/DD HH:mm', dateFrom)}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getTimeFromTemplate('YY/MM/DD HH:mm', dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">${basePrice}</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  ${!isNew ? createEditEventRollupBtnTemplate() : ''}
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  ${offers.length ? createEditEventOffersTemplate({ event, offers }) : ''}

                  ${destination.description ? createEditEventDestinationTemplate(destination) : ''}
              </form>
            </li>`;
}

export default class EditEventView {

  constructor({ event, destination, offers, isNew } = DEFAULT_EVENT) {

    this.event = event;
    this.destination = destination;
    this.offers = offers;
    this.isNew = isNew;

  }

  getTemplate() {
    return createEditEventTemplate({ event: this.event, destination: this.destination, offers: this.offers, isNew: this.isNew });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
