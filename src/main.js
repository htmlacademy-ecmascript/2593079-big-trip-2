import EventsApiService from './API/events-api-service.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsInfoPresenter from './presenter/events-info-presenter.js';

const AUTHORIZATION_TOKEN = 'Basic e4ih32wfi823hsf';
const SERVER_URL = 'https://23.objects.htmlacademy.pro/big-trip/';

const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newEventBtnContainer = document.querySelector('.trip-main');
const eventsModel = new EventsModel({ eventsApiService: new EventsApiService(SERVER_URL, AUTHORIZATION_TOKEN) });
const filterModel = new FilterModel();
const eventsInfoPresenter = new EventsInfoPresenter({ eventsModel, eventsInfoContainer: newEventBtnContainer });
const eventsPresenter = new EventsPresenter({ eventsContainer, eventsModel, filterModel, newEventBtnContainer, eventsInfoPresenter });
const filterPresenter = new FilterPresenter({ filterModel, eventsModel, filterContainer });


eventsPresenter.init();
eventsModel.init();
filterPresenter.init();

