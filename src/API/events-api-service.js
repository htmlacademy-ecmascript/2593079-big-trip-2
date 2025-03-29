import ApiService from '../framework/api-service.js';

const Methods = {
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST'
};

const UrlTemplates = {
  GET: 'points',
  PUT: 'points/'
};

export default class EventsApiService extends ApiService {

  get events() {
    return this._load({ url: UrlTemplates.GET }).
      then(ApiService.parseResponse);
  }

  async updateEvent(update) {
    const response = await this._load({
      url: `${UrlTemplates.PUT}/${update.id}`,
      method: Methods.PUT,
      body: JSON.stringify(this.#adaptToServer(update)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(event) {
    const adaptedEvent = {
      ...event,
      'base_price': event.basePrice,
      'date_from': event.dateFrom,
      'date_to': event.dateTo,
      'is_favorite': event.isFavorite
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    console.log('adapr', event, adaptedEvent)


    return adaptedEvent;
  }
}
