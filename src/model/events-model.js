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

  getDestinationById(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getOffersById(idArray, type) {
    const typedOffers = this.offers.find((offer) => offer.type === type).offers;
    return typedOffers.filter((offer) => idArray.some((id) => offer.id === id));
  }
}

