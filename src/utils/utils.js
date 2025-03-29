import { nanoid } from 'nanoid';

const getNewEvent = () => ({
  basePrice: 0,
  id: nanoid(),
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

export { toUppercaseFirstLetter, toKebabCase, sortNameAdapter, updateItem, getDestinationByName, getOffersByType, getNewEvent };
