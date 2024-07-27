import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import routes from './src/routes/routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

app.listen(3000)
console.log('Server on port 3000')