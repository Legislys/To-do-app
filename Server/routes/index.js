import express from 'express'
import path from 'path'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../Client/public') })
})

export { router }