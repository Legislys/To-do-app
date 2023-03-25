'use strict'
import { removeTasksGetTheirIds } from '../../Helpers/lib.js'
import { deleteTasks } from '../../main.js'

const bin = document.querySelector('.bin')
bin.addEventListener('click', async () => {
    if (bin.classList.contains('active')) {
        const selected = [...document.querySelectorAll('.task.selected')]
        const dbIds = await removeTasksGetTheirIds(selected)
        await deleteTasks(dbIds)
    } else {
        document.querySelector('.task-container').addEventListener('click', e => {
            const isTask = e.target.closest('.task.active')
            if (isTask != null) isTask.classList.toggle('selected')
        })
    }
    bin.classList.toggle('active')
})
