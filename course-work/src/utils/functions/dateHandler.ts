import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(utc)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1
})

export const getUTCDateTimeFromDateAndTime_ISO = (date: Dayjs, time: Dayjs) => {
    let dateTimeForm = dayjs()
                       .set('year', date.year())
                       .set('month', date.month())
                       .set('date', date.date())
                       .set('hour', time.hour())
                       .set('minute', time.minute())
                       .set('second', 0)
    let dateTimeFormWithUTC = dateTimeForm.utc().toISOString()
    return dateTimeFormWithUTC
}

export const convertShortDate = (date: string) => {
    return date.split('-').reverse().join('.')
}

export const convertISODateToLocal = (dateTime: string) => {
    let localTimeFromUTC = dayjs(dateTime).utc().local().format()
    
    let splitSymbol = localTimeFromUTC[19]
    let [dateAndTime, offset] = localTimeFromUTC.split(splitSymbol)

    let timeMs = dayjs(dateAndTime).valueOf()
    let time_parts = offset.split(":");
    let offsetMs = (Number(time_parts[0]) * 60 * 60 * 1000) + (Number(time_parts[1]) * 60 * 1000)

    let localeMsNumber = splitSymbol === '+'? timeMs + offsetMs : timeMs - offsetMs

    let localTime = dayjs(localeMsNumber).utc().local().format()

    let [date, time] = localTime.split('T')
    return `${date.split('-').reverse().join('.')} ${time.substr(0, 5)}` 
}