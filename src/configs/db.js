const mongoose = require('mongoose')
const mongoDB = "mongodb://localhost:27017/galaxyEnnterprises"
// const mongoDB = "mongodb+srv://newapi:newapi@cluster0.oasau.mongodb.net/?retryWrites=true&w=majority";

module.exports = ()=>mongoose.connect(mongoDB)