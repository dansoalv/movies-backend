const express = require('express')
const app = express()
const { config } = require('./config/index')
const moviesApi = require('./routes/movies.js')
const {logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

app.use(express.json())
moviesApi(app)
app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, ()=>{
    console.log(`Listenig http://localhost: ${config.port}`) 
})