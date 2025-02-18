import { MOCK_EVENTS_COUNT } from '../consts';
import { getMockDestinations, getMockOffers, getRandomEvent } from '../Mocks/events-mocks';

export default class EventsModel {
  events = Array.from({ length: MOCK_EVENTS_COUNT }, getRandomEvent);
  destinations = getMockDestinations();
  offers = getMockOffers();

  getEvents() {
    return this.events;
  }

  getDestinations() {
    return getMockDestinations();
  }

  getOffers() {
    return getMockOffers();
  }
}

