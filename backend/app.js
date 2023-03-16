const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const bcrypt = require("bcrypt");
const Contacts = require("./model/Contacts");
const Users = require("./model/User");
const db = require("./config/db");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db(() => {
  try {
    console.log("DataBase Successfully Connected");
  } catch (error) {
    console.log("Database Not Connected : ", error);
  }
});

app.post("/addContact", async (req, res) => {
  try {
    console.log("reached backend");
    console.log(req.body);
    const { name, phoneNumber, email, userID } = req.body;
    const newContact = new Contacts({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      userID:userID
    });
    console.log("this is new contact", newContact);
    const contact = await newContact.save();
    console.log("This is contact", contact);
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Contact not added" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new Users({
      username: username,
      password: hashedPassword,
    });
    const user = newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "User registration unsuccessfull" });
  }
});

app.post('/login',async(req,res)=>{
try {
  const {username, password} = req.body
  const user = await Users.findOne({username:username})
  console.log("this is user for id from backend",user)
  !user && res.status(404).json({warning:"User not found"})
  const verifyPassword =  bcrypt.compare(password,user.password)
  !verifyPassword && res.status(404).json({warning:"Password incorrect"})
  res.status(200).json({message:"login successfull", value:true, userID:user._id})
} catch (error) {
  res.status(500).json({message:"User login unsuccessfull", value:false})
}

})

app.get('/getMyContacts',async(req,res)=>{
try {
  console.log("Reached backend of getmycontacts")
  const userID = req.body
  console.log("this is req.body.userID",req.body)
  const myContacts = await Contacts.find({userID:userID})
  console.log("This is my contsats form backend" , myContacts)
  res.status(200).json({contacts:myContacts})
} catch (error) {
  res.status(500).json({error:error})
}
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
