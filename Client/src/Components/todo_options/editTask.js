'use strict'
import { updateTasks } from '../../main.js'
import { enableInputs, disableInputingAndReadContent, isValid, defaultObject } from '../../Helpers/lib.js'
const edit = document.querySelector('.edit')
let updatesManager = {
    ids: [],
    edited: [],
    updates: []
}

edit.addEventListener('click', () => {
    const tasks = [...document.querySelectorAll('.task.active')]
    if (edit.classList.contains('active') && isValid()) {
        tasks.forEach(task => task.removeEventListener('pointermove', () => onClickTask(task)))
        if (isValid() && updatesManager['ids'].length > 0) {
            updatesManager['edited'].forEach(task => {
                const [time, title, description] = disableInputingAndReadContent(task)
                updatesManager['updates'].push({ time, title, description, _id: task.id })
            })
            updateTasks(updatesManager['updates'])
            updatesManager = defaultObject(updatesManager)
            edit.classList.remove('active')
        }
    } else {
        edit.classList.toggle('active')
        tasks.forEach(task => task.addEventListener('click', () => onClickTask(task)))
    }
})

const onClickTask = task => {
    const timer = task.querySelector('.time input')
    const titleTag = task.querySelector('.title input')
    const descriptionTag = task.querySelector('.description')
    const tags = [timer, titleTag, descriptionTag]

    tags.forEach(tag => tag.addEventListener('keydown', e => {
        const input = e.target
        if (!input.value || input.classList.contains('active')) {
            input.classList.add('incorrect')
        } else input.classList.remove('incorrect')
    }))

    if (task.classList.contains('valid')) {
        enableInputs(tags)
        task.classList.remove('valid')
    } else {
        task.classList.add('valid')
        if (isValid(task) && !updatesManager['ids'].includes(task.id)) {
            updatesManager['ids'].push(task.id)
            updatesManager['edited'].push(task)
        }
    }
}
