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
    console.log(req.body);
    const { name, phoneNumber, email, userID } = req.body;
    const newContact = new Contacts({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      userID: userID,
    });
    console.log("this is new contact", newContact);
    const contact = await newContact.save();
    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Contact not added" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
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

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username: username });
    !user && res.status(404).json({ warning: "User not found" });
    const verifyPassword = bcrypt.compare(password, user.password);
    !verifyPassword && res.status(404).json({ warning: "Password incorrect" });
    res.status(200).json({
      message: " WELCOME TO MY CONTACT APP",
      value: true,
      userID: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "User login unsuccessfull", value: false });
  }
});

app.get("/getMyContacts", async (req, res) => {
  try {
    const userID = req.query.id;
    const contactsArray = await Contacts.find({ userID: userID });
    console.log("This is contacts array from the backend", contactsArray);
    res.status(200).json(contactsArray);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/deleteContact", async (req, res) => {
  try {
    const contactID = req.query.id;
    console.log("CONTACT_ID", contactID);
    await Contacts.findByIdAndDelete(contactID);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/search", async (req, res) => {
  try {
    const search = req.query.searchId;
    const userID = req.query.userID;
    const phoneResults = await Contacts.aggregate([
      { $match: { userID: userID } },
      { $match: { phoneNumber: search } },
    ]);

    console.log("This is user contacts ", phoneResults);
    const emailResults = await Contacts.aggregate([
      { $match: { userID: userID } },
      { $match: { email: search } },
    ]);
    res
      .status(200)
      .json({ phoneResults: phoneResults, emailResults: emailResults });
  } catch (error) {
    res.status(500).json({ message: "search error" });
  }
});

app.get("/editContact", async (req, res) => {
  try {
    const contactID = req.query.id;
    console.log("This is edit contact id ===>>>", contactID);
    const contactDetails = await Contacts.findById(contactID);
    console.log("This is contact details ===>>>", contactDetails);
    res.status(200).json(contactDetails);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

app.put("/editContact", async (req, res) => {
  try {
    const name = req.query.name;
    const email = req.query.email;
    const phone = req.query.phone;
    const contactID = req.query.id;
    console.log("NAME", name);
    console.log("PHONE", phone);
    console.log("EMAIL", email);
    console.log("CONTACT ID", contactID);
    const response = await Contacts.findByIdAndUpdate(contactID, {
      name: name,
      phone: phone,
      email: email,
    });
    // const response = await Contacts.updateOne({_id:contactID},{
    //   $set:{
    //     name:name,
    //     phone:phone,
    //     email:email
    //   }
    // })
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
