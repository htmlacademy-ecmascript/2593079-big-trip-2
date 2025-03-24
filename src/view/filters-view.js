import { toUppercaseFirstLetter } from '../utils/utils.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFiltersTemplate(filters, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
                ${Object.entries(filters).map(([filterName, count]) => {
    const filterNameInLowerCase = filterName.toLocaleLowerCase();
    return `<div class="trip-filters__filter">
              <input id="filter-${filterNameInLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterNameInLowerCase}" ${filterName === currentFilter ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filterNameInLowerCase}">${toUppercaseFirstLetter(filterName)}</label>
            </div>`;
  }).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form > `;
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #handleFilterChange = null;
  #currentFilter = null;
  constructor({ filters, onFilterChange, currentFilter }) {
    super();
    this.#filters = filters;
    this.#handleFilterChange = onFilterChange;
    this.#currentFilter = currentFilter;
    this.element.addEventListener('change', this.#filterChangeHandler);

  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {
    this.#handleFilterChange(evt.target.value.toLocaleUpperCase());
  };


}
