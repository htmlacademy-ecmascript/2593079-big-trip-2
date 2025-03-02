import { FilterTypes } from '../consts.js';
import { toUppercaseFirstLetter } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';



function createFiltersTemplate() {
  return `<form class="trip-filters" action="#" method="get">
                ${Object.values(FilterTypes).map((filterName) => {
    const filterNameInLowerCase = filterName.toLocaleLowerCase();
    return `<div class="trip-filters__filter">
              <input id="filter-${filterNameInLowerCase}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterNameInLowerCase}" ${filterNameInLowerCase === 'everything' ? 'checked' : ''}>
              <label class="trip-filters__filter-label" for="filter-${filterNameInLowerCase}">${toUppercaseFirstLetter(filterName)}</label>
            </div>`;
  }).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form > `;
}

export default class FiltersView extends AbstractView {
  #onClick;
  constructor({ onClick }) {
    super();
    this.#onClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createFiltersTemplate();
  }

  #clickHandler = (event) => {
    const currentTarget = event.target.closest('.trip-filters__filter-input');
    console.log(event)
    if (currentTarget) {
      this.#onClick(currentTarget.value);
    }
  }
}
