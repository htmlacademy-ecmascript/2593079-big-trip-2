import { FilterTypes, UpdateTypes } from '../consts';
import { remove, render, replace } from '../framework/render';
import { FilterFunctions } from '../utils/time';
import FiltersView from '../view/filters-view';

export default class FilterPresenter {

  #filterModel = null;
  #eventsModel = null;
  #filterContainer = null;
  #filterComponent = null;

  constructor({ eventsModel, filterModel, filterContainer }) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#filterContainer = filterContainer;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get currentFilter() {
    return this.#filterModel.filter;
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({ filters, onFilterChange: this.#handleFilterChange, currentFilter: this.currentFilter });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  get filters() {
    const events = this.#eventsModel.events;
    return ({
      [FilterTypes.EVERYTHING]: FilterFunctions[FilterTypes.EVERYTHING](events).length,
      [FilterTypes.PAST]: FilterFunctions[FilterTypes.PAST](events).length,
      [FilterTypes.PRESENT]: FilterFunctions[FilterTypes.PRESENT](events).length,
      [FilterTypes.FUTURE]: FilterFunctions[FilterTypes.FUTURE](events).length
    });
  }

  #handleFilterChange = (type) => {
    this.#filterModel.setFilter(UpdateTypes.MAJOR, type);
  };

  #handleModelEvent = () => {
    this.init();
  };


}
