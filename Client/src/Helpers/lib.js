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

function isDayInPast() {
    const current = Number(getFullCurrentDate().reverse().join(''))
    const today = Number(`${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`)
    return current < today
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
    isDayInPast,
    debounce,
    disableInputingAndReadContent,
    enableInputs,
    isValid,
    defaultObject,
    removeOutdatedTasks
}