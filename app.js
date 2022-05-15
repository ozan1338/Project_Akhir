const express = require("express")
const morgan = require('morgan')

const app = express()

//Dev Log
app.use(morgan('dev'))

//Body Parser
app.use(express.json())

//Serving Static File
app.use(express.static(`${__dirname}/public`))

// app.use((req,res,next)=>{
//     req.requesTime = new Date().toISOString();

//     next()
// })

const AppError = require('./utils/AppErrors')
const globalErrorHandler = require('./controller/errorController')
const userRouter = require('./routes/userRoutes')
const produkRouter = require('./routes/produkRoutes')

app.use("/api/v1/users", userRouter)
app.use("/api/v1/produks", produkRouter)

app.all('*', (req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

app.use(globalErrorHandler)

module.exports = app