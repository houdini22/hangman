import * as moment from 'moment'
import config from '../config'

const formatDateTimeAPI = (date) => {
    return moment(date).format(config['api']['apiDateTimeFormat'])
}

const formatDateAPI = (date) => {
    return moment(date).format(config['api']['apiDateFormat'])
}

const formatDateTime = (date) => {
    return moment(date).format(config['dateTimeFormat'])
}

const formatDate = (date) => {
    return moment(date).format(config['dateFormat'])
}

const pad = (num) => {
    return ('0' + num).slice(-2)
}

const secondsToWords = (secs) => {
    secs = Number(secs) || 0
    let minutes = Math.floor(secs / 60)
    secs = secs % 60
    const hours = Math.floor(minutes / 60)
    minutes = minutes % 60
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
}

export {
    formatDateTimeAPI,
    formatDateAPI,
    formatDateTime,
    formatDate,
    secondsToWords,
}
export default {
    formatDateTimeAPI,
    formatDateAPI,
    formatDateTime,
    formatDate,
    secondsToWords,
}
