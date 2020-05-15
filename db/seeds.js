const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const User = require('../models/user')
const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)
    
    try {
      await db.dropDatabase()

      const users = await User.create(userData)

      console.log(`${users.length} users created...`)

      await mongoose.connection.close()

      console.log('Seeding finished')

    } catch (err) {
      console.log(err)
    }

  })