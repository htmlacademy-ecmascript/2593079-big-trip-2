import EventsPresenter from './presenter/events-presenter.js';
import { render } from './render.js';
import FiltersView from './view/filters-view.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsListContainer = document.querySelector('.trip-events');
const eventsPresenter = new EventsPresenter({ eventsContainer: eventsListContainer });

render(new FiltersView(), filtersContainer);

eventsPresenter.init();

