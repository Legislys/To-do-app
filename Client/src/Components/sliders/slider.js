'use strict'
import { lengthDaysMonths, days } from '../../data/constants.js'
import { publishCurrentDate, debounce } from '../../Helpers/lib.js'
import { getTasks } from '../../main.js'

let currentDate = new Date().getDate()
let currentDay = new Date().getDay() - 1
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

getTasks(currentDate, currentMonth, currentYear)

const dates = [...document.querySelectorAll('.dates-slider-container div')]
document.querySelector('.slider-left').addEventListener('click', () => slide(false))
document.querySelector('.slider-right').addEventListener('click', () => slide(true))

const debounceGetTasks = debounce(() => getTasks(currentDate, currentMonth, currentYear))

function slide(leftOrRight) {
    leftOrRight ? showDates(1) : showDates(-1)
    const outdatedTasks = [...document.querySelectorAll('.task.active')]
    outdatedTasks.forEach(tag => tag.remove())
    debounceGetTasks()
}

showDates()

function showDates(constant = 0) {
    currentDate += constant
    if (currentDate < 1) {
        currentDate = lengthDaysMonths[currentMonth]
        if (currentMonth < 1) {
            --currentYear
            currentMonth = 11
        }
    }

    let dateNum = currentDate - 2
    let yesterday = currentDay + 6
    dates.forEach(date => {
        dateNum = isDateLongerThanMonth(dateNum)
        date.innerHTML = `<span>${dateNum}</span>${days[(yesterday++) % 7].slice(0, 3)}`
    })
    if (currentDate > lengthDaysMonths[currentMonth]) {
        currentDate = 1
        ++currentMonth
        currentMonth %= 12
        if (currentMonth > 12) {
            currentYear += 1
            currentMonth = 1
        }
    }
    publishCurrentDate(currentDate, currentMonth, currentYear)
}

function isDateLongerThanMonth(dateNum) {
    currentDay++
    dateNum++
    if (dateNum > lengthDaysMonths[currentMonth]) {
        dateNum = 1
    } else if (dateNum == 0) {
        --currentMonth
        currentMonth %= 12
        dateNum = lengthDaysMonths[currentMonth]
    }
    return dateNum
}