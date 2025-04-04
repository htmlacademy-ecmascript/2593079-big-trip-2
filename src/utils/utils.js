const getNewEvent = () => ({
  basePrice: 0,
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

const getDestinationByName = (destinations, destName) => destinations.find((dest) => dest.name === destName);

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

const getOffersSumm = (fullOffers) => {
  const offersPriceSumm = fullOffers.reduce((offersSumm, offer) => offersSumm + offer.price
    , 0);
  return offersPriceSumm;
};

export { toUppercaseFirstLetter, toKebabCase, sortNameAdapter, getDestinationByName, getOffersByType, getNewEvent, getOffersSumm };
