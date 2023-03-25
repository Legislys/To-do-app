'use strict'
import { lengthDaysMonths, months, days } from '../data/constants.js'

function endingDaysMonthly(year) {
    const difference = year - 2023
    const firstWeekDayInGivenYear = (6 + difference + parseInt(difference / 4)) % 7
    const endingDaysIndexes = [firstWeekDayInGivenYear]
    for (let i = 0; i < 12; i++) {
        const last = endingDaysIndexes.at(-1)
        const followingDay = (last + 1 + (lengthDaysMonths[i] - 1) % 7) % 7
        endingDaysIndexes.push(followingDay)
    }
    return endingDaysIndexes
}

function monthDays(length, indexDay) {
    return Array(length).fill().map((a, i) => i++).reduce((acc, curr) => {
        acc[curr + 1] = {
            day: days[(curr + indexDay) % 7],
            done: [],
            pending: []
        }
        return acc
    }, {})
}

function calendar(year) {
    const endings = endingDaysMonthly(year)
    return months.reduce((acc, month, i) => {
        acc[month] = monthDays(lengthDaysMonths[i], endings[i])
        return acc
    }, {})
}

export {
    calendar
}