require('dotenv').config({ path: "./config.env" })
const express = require('express') 
const mongooose = require('mongoose')
const cors = require('cors');

const routes = require('./routes/index')


// express app
const app = express()

const corsOptions = {
    origin: ['http://localhost:3000'],
  };
  

// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors(corsOptions));


  
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api', routes)

// connect to db
const url=process.env.MONGO_URI
mongooose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })