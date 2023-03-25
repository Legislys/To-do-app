import express from 'express'
import { Task, createQueryRegex } from '../models/task.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const { search_query, sort_query } = req.query
    const regexQuery = createQueryRegex(new RegExp(`${search_query}`, 'gim'), ['title', 'time', 'description'])
    try {
        const tasks = await Task.find({ $or: regexQuery })
        if (!tasks) {
            res.status(404).json('Not found')
        } else {
            res.status(200).json(tasks)
        }
        console.log(tasks)
    } catch (err) {

    }
})

export { router }