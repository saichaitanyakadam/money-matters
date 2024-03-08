import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import transactionRouter from './routes/transaction.route.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/user', userRouter)
app.use('/api/transactions', transactionRouter)

export {app}
