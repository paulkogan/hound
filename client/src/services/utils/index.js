import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { flatten } from 'lodash';

const moment = extendMoment(Moment);

const slotLength = 20;

export const createSlots = availability => {
  return Object.keys(availability).reduce((accum, availabilityDate) => {
    const entries = availability[availabilityDate] || [];
    return {
      ...accum,
      [availabilityDate]: flatten(
        entries.map(entry => {
          const slotStart = moment(entry.start);
          const slotEnd = moment(entry.end);
          const slotRange = moment.range(slotStart, slotEnd);
          return Array.from(
            slotRange.by('minute', { excludeEnd: true, step: slotLength })
          ).map(slot => ({
            ...entry,
            start: slot,
            end: moment(slot).add(slotLength, 'minutes'),
          }));
        })
      ).slice(0, 5),
    };
  }, {});
};

export const formatPhoneNumber = phoneNumberString => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ')' + match[2] + '-' + match[3];
  }
  return null;
};
