import { MOCK_EVENTS_COUNT } from '../consts';
import { getMockDestinations, getMockOffers, getRandomEvents } from '../Mocks/events-mocks';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = getRandomEvents(MOCK_EVENTS_COUNT);
  destinations = getMockDestinations();
  offers = getMockOffers();
  #eventsApiService = null;

  constructor({ eventsApiService }) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.events.then((events) => {
      console.log(events);

    })
  }

  get events() {
    return this.#events;
  }

  updateEvent(updateType, update) {
    const index = this.events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {

    const index = this.events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events.splice(index, 1);
    this._notify(updateType);

  }

  getDestinations() {
    return getMockDestinations();
  }

  getOffers() {
    return getMockOffers();
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

}

