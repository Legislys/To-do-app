'use strict'
import { appendTask, disableInputingAndReadContent, dateFormatter } from '../../Helpers/lib.js'

function renderTasks(tasks) {
    if (tasks.length == 0) return
    tasks.forEach(({ time, title, description, day, month, year, _id }) => {
        const task = appendTask()
        task.querySelector('.date').value = dateFormatter(day, month, year)
        const descriptionTag = task.querySelector('.description')
        const titleTag = task.querySelector('.title input')
        const timeTag = task.querySelector('.time input')
        task.id = _id
        timeTag.value = time
        titleTag.value = title
        descriptionTag.value = description
        task.classList.add('valid')
        disableInputingAndReadContent(task)
    })
}

export {
    renderTasks
}
