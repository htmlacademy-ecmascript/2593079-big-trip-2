import dayjs from 'dayjs';
import { SortTypes } from '../consts.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { SortFunctions } from '../utils/time.js';
import EventsInfoView from '../view/events-info-view.js';
import { getOffersSumm } from '../utils/utils.js';


export default class EventsInfoPresenter {
  #eventsModel = null;
  #eventsInfoContainer = null;
  #eventsInfoComponent = null;

  constructor({ eventsModel, eventsInfoContainer }) {
    this.#eventsModel = eventsModel;
    this.#eventsInfoContainer = eventsInfoContainer;
  }

  init(events) {

    if (events.length === 0) {
      remove(this.#eventsInfoComponent);
      this.#eventsInfoComponent = null;
      return;
    }
    const infoData = this.#getInfo(events);


    const prevEventsInfoComponent = this.#eventsInfoComponent;
    this.#eventsInfoComponent = new EventsInfoView({ infoData });


    if (prevEventsInfoComponent === null) {
      render(this.#eventsInfoComponent, this.#eventsInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }


    replace(this.#eventsInfoComponent, prevEventsInfoComponent);
    remove(prevEventsInfoComponent);

  }

  #getInfo(events) {
    const infoData = {};
    const sortedEvents = SortFunctions[SortTypes.SORT_DAY](events.slice());

    infoData.destinationsInfo = this.#getDestinationsInfo(sortedEvents);
    infoData.datesInfo = this.#getDatesInfo(sortedEvents);
    infoData.priceInfo = this.#getPriceInfo(sortedEvents);

    return infoData;

  }

  #getDestinationsInfo(events) {

    if (!events || events.length === 0) {
      return '';
    }

    const uniqueDestinations = events.reduce((names, event) => {
      const destinationName = this.#eventsModel.getDestinationById(event.destination)?.name;
      if (destinationName && !names.includes(destinationName)) {
        names.push(destinationName);
      }
      return names;
    }, []);

    if (!uniqueDestinations.length) {
      return '';
    }

    switch (uniqueDestinations.length) {
      case 1:
        return uniqueDestinations[0];
      case 2:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]}`;
      case 3:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]} — ${uniqueDestinations[2]}`;
      default:
        return `${uniqueDestinations[0]} — ... — ${uniqueDestinations[uniqueDestinations.length - 1]}`;
        if (!uniqueDestinations.length) {
          return '';
        }

        switch (uniqueDestinations.length) {
          case 1:
            return uniqueDestinations[0];
          case 2:
            return `${uniqueDestinations[0]} — ${uniqueDestinations[1]}`;
          case 3:
            return `${uniqueDestinations[0]} — ${uniqueDestinations[1]} — ${uniqueDestinations[2]}`;
          default:
            return `${uniqueDestinations[0]} — ... — ${uniqueDestinations[uniqueDestinations.length - 1]}`;
        }
    }
    switch (uniqueDestinations.length) {
      case 1:
        return uniqueDestinations[0];
      case 2:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]}`;
      case 3:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]} — ${uniqueDestinations[2]}`;
      default:
        return `${uniqueDestinations[0]} — ... — ${uniqueDestinations[uniqueDestinations.length - 1]}`;

    }
  }

  #getDatesInfo(events) {
    const dateFrom = dayjs(events[0].dateFrom);
    const dateTo = dayjs(events[events.length - 1].dateTo);
    return `${dateFrom.date()} ${dateFrom.format('MMM')} — ${dateTo.date()} ${dateTo.format('MMM')}`;
  }

  #getPriceInfo(events) {
    const finallOffersSumm = events.reduce((offersSumm, event) => {
      const fullOffers = this.#eventsModel.getOffersById(event.offers, event.type);
      return offersSumm + getOffersSumm(fullOffers);

    }, 0);

    const finalEventsPrice = events.reduce((basePriceSumm, event) => basePriceSumm + event.basePrice, 0);
    return finallOffersSumm + finalEventsPrice;

  }


}
}

