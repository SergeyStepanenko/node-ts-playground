import * as express from 'express'
import * as cors from 'cors'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

import useRoutes from './routes/todoListRoutes'
import TaskSchema from './models/todoListModel'

const port = process.env.PORT || 3002
const app = express()

mongoose.model('Tasks', TaskSchema)

mongoose.connect('mongodb://localhost/Tododb', { useMongoClient: true })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

useRoutes(app)

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)
