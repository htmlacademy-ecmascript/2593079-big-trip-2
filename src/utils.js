import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:MM';

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const toUppercaseFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

const addLeadingZero = (number) => number < 10 ? `0${number}` : number.toString();

const getTimeFromTemplate = (template, date) => date ? dayjs(date).format(template) : '';

const humanizeEventDate = (date) => getTimeFromTemplate(DATE_FORMAT, date);
const humanizeEventTime = (date) => getTimeFromTemplate(TIME_FORMAT, date);
const getDatetime = (date) => getTimeFromTemplate(DATETIME_FORMAT, date);

const toKebabCase = (word) => word.toLowerCase().split(' ').join('-');
const counterWrapper = () => {
  let count = 0;

  return function () {
    return count++;
  }
};

const getDiffTime = (dateFrom, dateTo) => {
  dateFrom = dayjs(dateFrom);
  dateTo = dayjs(dateTo);
  const days = dateTo.diff(dateFrom, 'day');
  const hours = dateTo.diff(dateFrom, 'hour');
  const mins = dateTo.diff(dateFrom, 'minute');
  return `${days ? addLeadingZero(days) : ''}${days ? 'D ' : ''}${hours ? addLeadingZero(hours - days * 24) : ''}${hours ? 'H ' : ''}${mins ? addLeadingZero(mins - hours * 60) : ''}M`;
};

export { getRandomArrayElement, humanizeEventDate, humanizeEventTime, toUppercaseFirstLetter, getDatetime, getDiffTime, getTimeFromTemplate, toKebabCase, counterWrapper };
