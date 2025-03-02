import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FilterTypes } from './consts';


const DateTemplates = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'YYYY-MM-DDTHH:MM',
  DATETIME_INPUT_FORMAT: 'YY/MM/DD HH:mm',
  ONLY_DATE_FORMAT: 'YYYY-MM-DD'
};

const FilterFunctions = {
  [FilterTypes.EVERYTHING]: (events) => events,
  [FilterTypes.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.dateTo))),
  [FilterTypes.PRESENT]: (events) => events.filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(event.dateTo)),
  [FilterTypes.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.dateFrom)))
};

const SortFunctions = {
  SORT_DAY: (events) => events.sort((eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom)),
  SORT_PRICE: (events) => events.sort((eventA, eventB) => eventB.basePrice - eventA.basePrice),
  SORT_TIME: (events) => events.sort((eventA, eventB) => dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)) - dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom))),
};

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const toUppercaseFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
const sortNameAdapter = (sortName) => sortName.toUpperCase().replace('-', '_');


const getTimeFromTemplate = (template, date) => date ? dayjs(date).format(template) : '';

const humanizeEventDate = (date) => getTimeFromTemplate(DateTemplates.DATE_FORMAT, date);
const humanizeEventTime = (date) => getTimeFromTemplate(DateTemplates.TIME_FORMAT, date);
const getDatetime = (date) => getTimeFromTemplate(DateTemplates.DATETIME_FORMAT, date);
const getOnlyDate = (date) => getTimeFromTemplate(DateTemplates.ONLY_DATE_FORMAT, date);

const toKebabCase = (word) => word.toLowerCase().split(' ').join('-');

const getDiffTime = (dateFrom, dateTo) => {
  dateTo = dayjs(dateTo);

  const diffDuration = dayjs.duration(dateTo.diff(dateFrom));
  const template = `${diffDuration.days() ? 'DD[D] ' : ''}${diffDuration.hours() ? 'HH[H]' : ''} mm[M]`;
  return diffDuration.format(template);
};

const removeChildren = (element, from = 0) => {
  const children = Array.from(element.children).slice(from);
  children.forEach((child) => {
    child.remove();
  });
};


export { getRandomArrayElement, humanizeEventDate, humanizeEventTime, toUppercaseFirstLetter, getDatetime, getDiffTime, getTimeFromTemplate, toKebabCase, DateTemplates, getOnlyDate, FilterFunctions, removeChildren, SortFunctions, sortNameAdapter };
