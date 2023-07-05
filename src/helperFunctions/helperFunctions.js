import getTime from 'date-fns/getTime';

export const convertDateToMs = date => {
  const dotsReplaced = date.replaceAll('.', ' ');
  const semicolonReplaced = dotsReplaced.replace(':', ' ');
  const array = semicolonReplaced.split(' ');
  const year = Number(array[2]);
  const month = Number(array[1]) - 1;
  const day = Number(array[0]);
  const hour = Number(array[3]);
  const minutes = Number(array[4]);
  return getTime(new Date(year, month, day, hour, minutes));
};
export const converMsToString = timestamp => {
  return new Date(timestamp).toLocaleString('pl').slice(0, -3).replace(',', '');
};
export const choosePage = (page, data) => {
  const multiplier = page - 1;
  return data.slice(0 + 5 * multiplier, 5 + 5 * multiplier);
};
