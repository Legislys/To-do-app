'use strict'
import { renderTasks } from './Components/tasks/task.js'
import { removeOutdatedTasks } from './Helpers/lib.js'

const url = '/tasks/'

async function getTasks(day, month, year) {
    const res = await fetch(`${url}/${day}/${month}/${year}`, { method: 'GET' })
    const tasks = await res.json()
    renderTasks(tasks)
}

async function submitNewForm(dataForm, task) {
    const res = await sendRequest(url, 'POST', dataForm)
    task.id = await res.json()
    if (!res.ok) {
        //displayErrorMessage
    }
}

async function updateTasks(updates) {
    const res = await sendRequest(url, 'PUT', updates)
    if (!res.ok) {
        //displayErrorMessage
    }
}

async function deleteTasks(ids) {
    const res = await sendRequest(url, 'DELETE', ids)
    if (!res.ok) {
        //displayErrorMessage
    }
}

async function searchRequest(searchkey = '', sort = '') {
    const res = await fetch(`/results?search_query=${searchkey}&sort_query=${sort}`, { method: 'GET' })
    const tasks = await res.json()
    removeOutdatedTasks()
    renderTasks(tasks)
    if (!res.ok) {
        //displayErrorMessage
    }
}

function sendRequest(url, method, data) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    return new Promise((resolve) => resolve(fetch(url, options)))
}

export {
    getTasks,
    updateTasks,
    deleteTasks,
    submitNewForm,
    searchRequest
}