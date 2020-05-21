const mongoose = require('mongoose')
const faker = require('faker')
const { dbURI } = require('../config/environment')
const User = require('../models/user')
// const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {
    if (err) return console.log(err)
    
    try {
      await db.dropDatabase()

      const users = []

      for (let index = 0; index < 500; index++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const phoneNumber = faker.phone.phoneNumber()
        const image = faker.image.avatar()
        users.push({
          firstName: firstName,
          lastName: lastName,
          email: `${firstName.split(' ').join('')}@email.com`,
          password: 'pass',
          passwordConfirmation: 'pass',
          phoneNumber: phoneNumber,
          image: image
        })
      }
			
			
      const createdUsers = await User.create(users)

      console.log(`❇️ Created ${createdUsers.length} ❇️`)

    } catch (err) {
      console.log(err)
    }

    mongoose.connection.close()

  })