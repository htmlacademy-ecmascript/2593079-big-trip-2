const FilterTypes = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortTypes = {
  SORT_DAY: 'SORT_DAY',
  SORT_PRICE: 'SORT_PRICE',
  SORT_TIME: 'SORT_TIME'
};

const UserActions = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT'
};

const UpdateTypes = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export {
  FilterTypes, SortTypes,
  UserActions, UpdateTypes, Mode
};
