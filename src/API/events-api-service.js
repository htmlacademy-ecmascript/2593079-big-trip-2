import ApiService from '../framework/api-service.js';

const Methods = {
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST'
};

const UrlTemplates = {
  GET_POINTS: 'points',
  PUT_POINT: 'points',
  POST_POINT: 'points',
  DELETE_POINT: 'points',
  GET_DESTINATIONS: 'destinations',
  GET_OFFERS: 'offers'
};

export default class EventsApiService extends ApiService {

  get events() {
    return this._load({ url: UrlTemplates.GET_POINTS }).
      then(ApiService.parseResponse);
  }

  async updateEvent(update) {
    const response = await this._load({
      url: `${UrlTemplates.PUT_POINT}/${update.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptToServer(update)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(update) {
    const response = await this._load({
      url: `${UrlTemplates.POST_POINT}`,
      method: Methods.POST,
      body: JSON.stringify(this.#adaptToServer(update)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(update) {
    await this._load({
      url: `${UrlTemplates.DELETE_POINT}/${update.id}`,
      method: Methods.DELETE,
    });

  }

  get destinations() {
    return this._load({ url: UrlTemplates.GET_DESTINATIONS }).
      then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: UrlTemplates.GET_OFFERS }).
      then(ApiService.parseResponse);
  }

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': Number(event.basePrice),
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      'is_favorite': event.isFavorite
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
