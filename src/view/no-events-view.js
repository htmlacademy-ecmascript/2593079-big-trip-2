import { FilterTypes } from '../consts';
import AbstractView from '../framework/view/abstract-view';

const emptyListMessages = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.FUTURE]: 'There are no future events now'
};

const createNoViewTemplate = (type) => `<p class="trip-events__msg">${emptyListMessages[type.toUpperCase()]}</p>`;

export default class NoEventsView extends AbstractView {
  #type;

  constructor(type) {
    super();
    this.#type = type;
  }

  get template() {
    return createNoViewTemplate(this.#type);
  }
}
