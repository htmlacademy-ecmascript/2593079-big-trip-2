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
    console.log(this._endPoint)

    return this._load({ url: UrlTemplates.GET }).
      then(ApiService.parseResponse);
  }

  async updateEvent(update) {
    const response = await this._load({
      url: `${UrlTemplates.PUT}/${update.id}`,
      method: Methods.PUT,
      body: JSON.stringify(update),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
