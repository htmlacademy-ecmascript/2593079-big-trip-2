import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const eventsContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newEventBtnContainer = document.querySelector('.trip-main');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter({ eventsContainer, eventsModel, filterModel, newEventBtnContainer });
const filterPresenter = new FilterPresenter({ filterModel, eventsModel, filterContainer });

filterPresenter.init();
eventsPresenter.init();

