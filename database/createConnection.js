const Mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/koay'
Mongoose.connect(URL)

const DB = Mongoose.connection
DB.on('open', () => {
    console.log('Data base OK');
})
module.exports = DB