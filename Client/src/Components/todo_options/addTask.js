'use strict'
import { appendTask, isFormValid, disableInputingAndReadContent, getFullCurrentDate, dateFormatter, isDayInPast } from '../../Helpers/lib.js'
import { submitNewForm } from '../../main.js'

document.querySelector('.adding').addEventListener('click', () => {
    if (isDayInPast()) return
    const task = appendTask()
    const descriptionTag = task.querySelector('.description')
    const titleTag = task.querySelector('.title input')

    titleTag.addEventListener('keypress', e => {
        if (e.key === 'Enter') descriptionTag.focus()
    })
    descriptionTag.addEventListener('keypress', e => {
        if (isFormValid(descriptionTag, task) && e.key === 'Enter') {
            const [time, title, description] = disableInputingAndReadContent(task)
            const [day, month, year] = getFullCurrentDate()

            task.querySelector('.date').value = dateFormatter(day, month, year)
            task.classList.add('valid')
            // sortBy('time')
            submitNewForm({ time, title, description, day, month, year }, task)
        }
    })
})


function sorting(tasks, stringDivisor, reverse) {
    const taskContainer = document.querySelector('.task-container')
    tasks.sort((a, b) => {
        let aParam, bParam
        if (reverse) {
            aParam = Number(a.value.split(stringDivisor, '').reverse())
            bParam = Number(b.value.split(stringDivisor, '').reverse())
            aParam.some((val, i) => val > bParam[i]) ? 1 : -1
            return 0
        } else {
            aParam = Number(a.value.replace(stringDivisor, ''))
            bParam = Number(b.value.replace(stringDivisor, ''))
            if (aParam > bParam) return 1
            if (aParam < bParam) return -1
            return 0
        }
    })
    tasks.forEach(task => taskContainer.appendChild(task.closest('.task')))
}

function sortBy(parameter) {
    switch (parameter) {
        case 'time':
            sorting([...document.querySelectorAll('.time input')], ':')
            break
        case 'date':
            sorting([...document.querySelectorAll('.date')], '.', true)
            break
    }
}


