import AbstractView from '../framework/view/abstract-view';

const getNewEventBtnTemplate = () => ' <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';


export default class NewEventBtnView extends AbstractView {

  constructor({ onClick }) {
    super();
    this.element.addEventListener('click', onClick);
  }

  disable() {
    this.element.disabled = true;
  }

  activate() {
    this.element.disabled = false;
  }

  get template() {
    return getNewEventBtnTemplate();
  }
}
