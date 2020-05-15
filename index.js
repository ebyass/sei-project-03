const express = require('express')
const app = express()
const { port, dbURI } = require('./config/environment')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./config/routes')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })

app.use(bodyParser.json())



app.use(router)








app.listen(port, () => console.log(`Up and running on port ${port}`))