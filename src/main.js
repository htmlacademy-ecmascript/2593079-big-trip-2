import EventsApiService from './API/events-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const AUTHORIZATION_TOKEN = 'Basic e4ih32wfi823hsf3';
const SERVER_URL = 'https://22.objects.htmlacademy.pro/big-trip';

const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newEventBtnContainer = document.querySelector('.trip-main');
const eventsModel = new EventsModel({ eventsApiService: new EventsApiService(SERVER_URL, AUTHORIZATION_TOKEN) });
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter({ eventsContainer, eventsModel, filterModel, newEventBtnContainer });
const filterPresenter = new FilterPresenter({ filterModel, eventsModel, filterContainer });

eventsModel.init();
filterPresenter.init();
// eventsPresenter.init();

