import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1/tasksdb').then(() => console.log('Success')).catch((err) => console.log(err))

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