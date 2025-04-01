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

    const mappedEvents = events.reduce((names, event, index) => {
      const destinationName = this.#eventsModel.getDestinationById(event.destination).name;
      if (names.length === 0) {
        names.push(destinationName);
      } else if (!(names[index - 1] === destinationName)) {
        names.push(destinationName);
      }
      return names;
    }, []);

    if (mappedEvents.length > 3) {
      return `${mappedEvents[0]} — ... — ${mappedEvents[mappedEvents.length - 1]}`;
    } else if (mappedEvents.length === 3) {
      return `${mappedEvents[0]} — ${mappedEvents[1]} — ${mappedEvents[2]}`;
    } else if (mappedEvents.length === 2) {
      return `${mappedEvents[0]} — ${mappedEvents[1]}`;
    } else {
      return `${mappedEvents[0]}`;
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
