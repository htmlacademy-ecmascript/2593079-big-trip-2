import { UpdateTypes } from '../consts.js';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = [];
  #destinations = [];
  #offers = [];
  #eventsApiService = null;

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async updateEvent(updateType, update) {
    const index = this.events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const adaptedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        adaptedEvent,
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType, adaptedEvent);
    } catch (err) {

      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {

    try {
      const response = await this.#eventsApiService.addEvent(update);
      const adaptedEvent = this.#adaptToClient(response);
      this.#events = [
        adaptedEvent,
        ...this.#events
      ];

      this._notify(updateType, update);
    } catch {
      throw new Error('Can\'t update event');
    }

  }

  async init() {
    try {

      await Promise.all([this.#eventsApiService.events, this.#eventsApiService.destinations, this.#eventsApiService.offers]).then(([events, destinations, offers]) => {
        this.#events = events.map(this.#adaptToClient);
        this.#destinations = destinations;
        this.#offers = offers;
      });
      this._notify(UpdateTypes.INIT);
    } catch (err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateTypes.FAILED);

    }
  }

  getDestinationById(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  getOffersById(idArray, type) {
    const typedOffers = this.offers.find((offer) => offer.type === type).offers;
    return typedOffers.filter((offer) => idArray.some((id) => offer.id === id));
  }

  getAllDestinationsNames() {

    return this.destinations.reduce((destinations, destElement) => {
      destinations.push(destElement.name);
      return destinations;
    }, []);
  }

  async deleteEvent(updateType, update) {

    const index = this.events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);

      this.#events.splice(index, 1);
      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete event');
    }

  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      isFavorite: event['is_favorite'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }


}

