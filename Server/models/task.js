import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(() => console.log('Success')).catch((err) => console.log(err))

const taskSchema = mongoose.Schema({
    day: String,
    month: String,
    year: String,
    time: String,
    title: String,
    description: String
})

const Task = mongoose.model('Task', taskSchema)

function createQueryRegex(regex, array) {
    return array.reduce((acc, curr) => {
        const obj = {}
        obj[curr] = regex
        acc.push(obj)
        return acc
    }, [])
}

export { Task, createQueryRegex }