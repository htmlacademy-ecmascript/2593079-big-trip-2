import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';


const DateTemplates = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'YYYY-MM-DDTHH:MM',
  DATETIME_INPUT_FORMAT: 'YY/MM/DD HH:mm',
  ONLY_DATE_FORMAT: 'YYYY-MM-DD'
};

dayjs.extend(duration);

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const toUppercaseFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

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

export { getRandomArrayElement, humanizeEventDate, humanizeEventTime, toUppercaseFirstLetter, getDatetime, getDiffTime, getTimeFromTemplate, toKebabCase, DateTemplates, getOnlyDate };
