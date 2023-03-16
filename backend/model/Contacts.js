const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  phoneNumber:{
    type:String,
    required:true
  },
  email:{
    type:String
  },
  userID:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model("CONTACT", ContactSchema)