'use strict'
import { appendTask, isFormValid, disableInputingAndReadContent, getFullCurrentDate, dateFormatter, isDayInPast, paramDeformatter, compareParams, areTasksInSameDay } from '../../Helpers/lib.js'
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
            submitNewForm({ time, title, description, day, month, year }, task)
            // sortBy('time')
        }
    })
})


function sorting(tasks, AreInSameDay = areTasksInSameDay(a, b)) {
    const taskContainer = document.querySelector('.task-container')
    tasks.sort((a, b) => {
        if (areTasksInSameDay(a, b)) return compareParams(a, b, '.time input', ':')
        else return compareParams(a, b, '.date', '.', true)
    })
    tasks.forEach(task => taskContainer.appendChild(task.closest('.task')))
}



