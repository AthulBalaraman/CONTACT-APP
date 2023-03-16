const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000
const bcrypt = require('bcrypt')
const Contacts = require('./model/Contacts')
const db = require('./config/db')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


db(() => {
  try {
    console.log("DataBase Successfully Connected");
  } catch (error) {
    console.log("Database Not Connected : ", error);
  }
});

app.post('/addContact',async(req,res)=>{
  try {
    console.log("reached backend")
    console.log(req.body)
    const {name, phoneNumber, email} = req.body
    const newContact = new Contacts({
      name:name,
      phoneNumber:phoneNumber,
      email:email
    })
    console.log("this is new contact", newContact)
    const contact = await newContact.save()
    console.log("This is contact", contact)
    res.status(200).json({message:"Contact added successfully"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Contact not added"})
  }
})


app.listen(PORT,()=>{
  console.log(`Server running at port ${PORT}`)
})