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
  }
})

module.exports = mongoose.model("CONTACT", ContactSchema)