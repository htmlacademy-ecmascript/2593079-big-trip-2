import { nanoid } from 'nanoid';

const getUniqueIdCounter = (from, to) => {
  const nums = [];
  return function () {
    let num;
    do {
      num = Math.floor(Math.random() * (to - from + 1)) + from;

    } while (nums.indexOf(num) !== -1);
    nums.push(num);
    return num;
  };
};


const getRandomArrayElements = (elements, count) => {
  const counter = getUniqueIdCounter(0, elements.length - 1);
  const selectedItems = [];
  for (let i = 0; i <= count; i++) {
    selectedItems.push(elements[counter()]);
  }
  return selectedItems;

};

const getNewEvent = () => ({
  basePrice: 0,
  id: nanoid(),
  name: null,
  type: 'flight',
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  isNew: true
});

const toUppercaseFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
const sortNameAdapter = (sortName) => sortName.toUpperCase().replace('-', '_');

const toKebabCase = (word) => word.toLowerCase().split(' ').join('-');
const updateItem = (items, newItem) => items.map((currentItem) => currentItem.id === newItem.id ? newItem : currentItem);

const getDestinationByName = (destinations, destName) => destinations.find((dest) => dest.name === destName);

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

export { toUppercaseFirstLetter, toKebabCase, sortNameAdapter, updateItem, getRandomArrayElements, getDestinationByName, getOffersByType, getNewEvent };
