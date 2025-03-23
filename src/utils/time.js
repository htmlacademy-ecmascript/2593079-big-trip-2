import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FilterTypes } from '../consts';


dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DateTemplates = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'YYYY-MM-DDTHH:MM',
  DATETIME_INPUT_FORMAT: 'YY/MM/DD HH:mm',
  ONLY_DATE_FORMAT: 'YYYY-MM-DD'
};


const SortFunctions = {
  SORT_DAY: (events) => events.slice().sort((eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom)),
  SORT_PRICE: (events) => events.slice().sort((eventA, eventB) => eventB.basePrice - eventA.basePrice),
  SORT_TIME: (events) => events.slice().sort((eventA, eventB) => dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)) - dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom))),
};

const FilterFunctions = {
  [FilterTypes.EVERYTHING]: (events) => events.slice(),
  [FilterTypes.PAST]: (events) => events.slice().filter((event) => dayjs().isAfter(dayjs(event.dateTo), 'd')),
  [FilterTypes.PRESENT]: (events) => events.slice().filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(event.dateTo), 'd'),
  [FilterTypes.FUTURE]: (events) => events.slice().filter((event) => dayjs().isBefore(dayjs(event.dateFrom), 'd'))
};

const getFilters = (events) => ({
  [FilterTypes.EVERYTHING]: FilterFunctions[FilterTypes.EVERYTHING](events).length,
  [FilterTypes.PAST]: FilterFunctions[FilterTypes.PAST](events).length,
  [FilterTypes.PRESENT]: FilterFunctions[FilterTypes.PRESENT](events).length,
  [FilterTypes.FUTURE]: FilterFunctions[FilterTypes.FUTURE](events).length
});

const getTimeFromTemplate = (template, date) => date ? dayjs(date).format(template) : '';

const humanizeEventDate = (date) => getTimeFromTemplate(DateTemplates.DATE_FORMAT, date);
const humanizeEventTime = (date) => getTimeFromTemplate(DateTemplates.TIME_FORMAT, date);
const getDatetime = (date) => getTimeFromTemplate(DateTemplates.DATETIME_FORMAT, date);
const getOnlyDate = (date) => getTimeFromTemplate(DateTemplates.ONLY_DATE_FORMAT, date);

const getDiffTime = (dateFrom, dateTo) => {
  dateTo = dayjs(dateTo);

  const diffDuration = dayjs.duration(dateTo.diff(dateFrom));
  const template = `${diffDuration.days() ? 'DD[D] ' : ''}${diffDuration.hours() ? 'HH[H]' : ''} mm[M]`;
  return diffDuration.format(template);
};

function defaultSort(elements) {
  return SortFunctions.SORT_DAY(elements);
}

export { humanizeEventDate, humanizeEventTime, getDatetime, getOnlyDate, getDiffTime, DateTemplates, SortFunctions, FilterFunctions, getFilters, defaultSort, getTimeFromTemplate };
