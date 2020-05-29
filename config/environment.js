const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/accountable-db-2'
const secret = process.env.SECRET || 'accountable' 

module.exports = {
  port,
  dbURI,
  secret
}