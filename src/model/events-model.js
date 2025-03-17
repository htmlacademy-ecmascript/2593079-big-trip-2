import { MOCK_EVENTS_COUNT } from '../consts';
import { getMockDestinations, getMockOffers, getRandomEvents } from '../Mocks/events-mocks';

export default class EventsModel {
  events = getRandomEvents(MOCK_EVENTS_COUNT);
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

