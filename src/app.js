import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import './dbs/init.mongodb.js'
import router from './routes/index.js'
import { checkOverload } from './helpers/check.connect.js'
import { errorHandle, routeErrorHandle } from './utils/errorhandle.js'

// checkOverload()

// init app
const app = express()
// init extension
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// init middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// init router
app.use('/v1/api', router)

// handling error
app.use(routeErrorHandle)
app.use(errorHandle)

export default app