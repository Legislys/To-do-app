'use strict'
function timeMechanics(e) {
    e.target.parentElement.parentElement.classList.remove('active')
    const isValidTimeRegex = new RegExp('([0-9]|[0-1][0-9]|2[0-4]):[0-5][0-9]', 'g')
    if (!/[0-9:]+/g.test(e.key)) {
        e.preventDefault()
    }
    if (e.key === 'Enter') {
        if (!e.target.value.replace(/\d+:\d/g, '')) {
            e.target.value = e.target.value.replace(':', ':0')
        }

        if (!isValidTimeRegex.test(e.target.value)) {
            e.target.parentElement.parentElement.classList.add('active')
        } else {
            e.target.value = e.target.value.replace('24:', '0:')
            const title = document.querySelector('.title input')
            document.querySelector('.title input').focus()
        }

    }
}

function appendTask() {
    let task = document.querySelector('template#task').content.cloneNode(true)
    document.querySelector('.task-container').prepend(task)
    task = document.querySelector('.task')
    task.classList.add('active')
    task.querySelector('.time').addEventListener('keypress', timeMechanics)
    task.querySelector('.time input').focus()
    return task
}

function publishCurrentDate(currentDate, currentMonth, currentYear) {
    document.querySelector('template#today').textContent = [currentDate, currentMonth, currentYear]
}

function getFullCurrentDate() {
    return document.querySelector('template#today').textContent.split(',').map(el => Number(el))
}

function removeTasksGetTheirIds(selected) {
    return new Promise((resolve) => {
        const dbIds = []
        selected.forEach(task => {
            dbIds.push({ _id: task.id })
            task.remove()
        })
        resolve(dbIds)
    })
}

function isFormValid(description, task) {
    return description.value != '' && !task.querySelector('.time').classList.contains('active')
}

function disableInputingAndReadContent(task) {
    const content = []
    const timer = task.querySelector('.time input')
    const titleTag = task.querySelector('.title input')
    const descriptionTag = task.querySelector('.description')
    const tags = [timer, titleTag, descriptionTag]
    tags.forEach(tag => {
        tag.setAttribute('readonly', '')
        content.push(tag.value)
    })
    return content
}

function enableInputs(tags) {
    tags.forEach(tag => tag.removeAttribute('readonly'))
}

function defaultObject(obj) {
    return Object.keys(obj).reduce((acc, curr) => {
        acc[curr] = []
        return acc
    }, obj)
}

function dateFormatter(date, month, year) {
    return `${date}.${month}.${year}`
        .split('.')
        .map(num => num.length == 1 ? `0${num}` : num)
        .join('.')
}

function paramDeformatter(element, queryParam, divisor, reverse = false) {
    if (reverse) return Number(element
        .querySelector(queryParam)
        .value
        .split(divisor)
        .reverse()
        .join(''))

    else return Number(element
        .querySelector(queryParam)
        .value
        .split(divisor)
        .join(''))
}

function compareParams(a, b, queryParam, divsor, reverse = false) {
    const aParam = paramDeformatter(a, queryParam, divsor, reverse)
    const bParam = paramDeformatter(b, queryParam, divsor, reverse)
    if (aParam < bParam) return -1
    else if (aParam > bParam) return 1
    else return 0
}

function sortByLatest(allTasksInSameDay = false, reverse = false) {
    const tasks = [...document.querySelectorAll('.task.active')]
    const taskContainer = document.querySelector('.task-container')
    tasks.sort((a, b) => {
        if (allTasksInSameDay) return compareParams(a, b, '.time input', ':')
        else {
            if (areTasksInSameDay(a, b)) return compareParams(a, b, '.time input', ':')
            else return compareParams(a, b, '.date', '.', true)
        }
    })
    if (reverse) tasks.reverse()
    tasks.forEach(task => taskContainer.appendChild(task.closest('.task')))
}

function isDayInPast() {
    const current = Number(getFullCurrentDate().reverse().join(''))
    const today = Number(`${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`)
    return current < today
}

function areTasksInSameDay(a, b) {
    return a.querySelector('.date').value == b.querySelector('.date').value
}

function debounce(func, delay = 1000) {
    let debounceTimer
    return function (...args) {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(this, args), delay)
    }
}

function removeOutdatedTasks() {
    const outdatedTasks = [...document.querySelectorAll('.task.active')]
    outdatedTasks.forEach(tag => tag.remove())
}

function isValid(container = document) {
    return container.querySelectorAll('.incorrect').length == 0
}

export {
    appendTask,
    publishCurrentDate,
    getFullCurrentDate,
    removeTasksGetTheirIds,
    isFormValid,
    dateFormatter,
    paramDeformatter,
    isDayInPast,
    debounce,
    disableInputingAndReadContent,
    enableInputs,
    isValid,
    areTasksInSameDay,
    defaultObject,
    compareParams,
    sortByLatest,
    removeOutdatedTasks
}