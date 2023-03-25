import express from 'express'
const app = express()
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
import path from 'path'
import { router } from './routes/index.js'
import { router as dateRouter } from './routes/dates.js'
import { router as serachRouter } from './routes/search.js'
import bodyParser from 'body-parser'

app.use(express.static(path.join(__dirname, '../Client')))
app.use(express.json())
app.use(bodyParser.json())

app.use('/', router)
app.use('/tasks/', dateRouter)
app.use('/results/', serachRouter)


app.listen(process.env.PORT || 3000, () => console.log(`Server is listening to port`))