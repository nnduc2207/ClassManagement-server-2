/* eslint-disable no-console */
import express from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import logger from "morgan"
import mongoose from "mongoose"

import { default as ClassRoute } from "./components/class/router"
import { default as UserRoute } from "./components/user/router"

const app = express()
// database setup
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost/hcmusclassmanager"
const mongooseConfigs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
mongoose.connect(mongoUri, mongooseConfigs)

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(compression())

app.use("/api/user", UserRoute)
app.use("/api/class", ClassRoute)

module.exports = app
