import express from 'express'
import { Task } from '../models/task.js'
const router = express.Router()

const showError = (err, req, res) => {
    res.status(500).json(`Internal error ${err.message}`)
    console.log(err.message)
}

router.get('/:day/:month/:year', async (req, res) => {
    try {
        const tasks = await Task.find(req.params)
        res.status(200).json(tasks)
    } catch (err) {
        showError(err, req, res)
    }
})

router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        await task.save()
        res.status(201).json(task._id)
    } catch (err) {
        showError(err, req, res)
    }
})

router.put('/', async (req, res) => {
    try {
        for (let update of req.body) {
            let task = await Task.findById(update._id)
            if (!task) {
                res.status(404).json('Not found.')
            } else {
                task.set(update)
                await task.save()
                res.status(204).json('Task has been updated.')
            }
        }
    } catch (err) {
        showError(err, req, res)
    }
})

router.delete('/', async (req, res) => {
    try {
        const tasks = await Task.deleteMany({ $or: req.body })
        if (!tasks) res.status(404).json('Not found.')
        else res.status(204).json('Task has been deleted.')
    } catch (err) {
        showError(err, req, res)
    }

})

export { router }