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
	
app.use(express.static(`${__dirname}/frontend/build`))

app.use(bodyParser.json())

app.use('/api', router)

app.use('/*', (req, res) => res.sendFile(`${__dirname}/frontend/build/index.html`)) //* any other route that deosn't deliver to /api will direct them to the index.html frontend page which has been made available from line 14 

app.listen(port, () => console.log(`Up and running on port ${port}`))