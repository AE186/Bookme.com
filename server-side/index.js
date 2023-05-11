const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const customerModel = require("./Model/Customer.js");
const busModel = require("./Model/buses.js");
const matchesModel = require("./Model/matches.js")
const enclosureModel = require("./Model/enclosure.js")
// const ticketModel = require("./Model/cricketTicket.js");



const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'k200177@nu.edu.pk',
        pass: 't2t1s342FFt2'
    }
})
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Ammar:t2t1s342FFt2@bookaro.xkiebui.mongodb.net/BooKaro?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/signup", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const Password = bcrypt.hashSync(req.body.Password, 8);
  const email = req.body.email;
  const token = jwt.sign({email : email},'ammar-secret-key')
  const customer = customerModel({
    fname: fname,
    lname: lname,
    Password: Password,
    email: email,
    confirmationCode : token
  });
  try {
    customer.save();

    transport.sendMail({
        from: 'k200177@nu.edu.pk',
        to : email,
        subject : 'Confirm your account',
        html : `<h1>Email Confirmation</h1>
        <h2>Hello ${fname}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5001/confirm/${token}> Click here</a>
        </div>`,
    }).catch(err => console.log(`Could not send email`))
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bus", async(req,res) => {
  try {
    busModel.find().then( (foundBuses) => {
      res.send(foundBuses)
    } , (error)=>{
      res.send(error)
    })
  }
  catch(err){
    console.log('Invalid request')
    res.sendStatus(404)

  }
})


app.get("/cricket" , async(req,res) => {
  try {
    matchesModel.find().then((foundMatches)=>{
      res.send(foundMatches)
    } , (error)=>{
      console.log(error)
      res.sendStatus(404);
    })
  }
  catch {
    res.sendStatus(404);
  }
})


app.get("/enclosure" , async(req,res) => {
  try {
    enclosureModel.find().then((foundEnclosures)=>{
      res.send(foundEnclosures)
    } , (error)=>{
      console.log(error)
      res.sendStatus(404);
    })
  }
  catch {
    res.sendStatus(404);
  }

})


app.post("/signin", async (req, res) => {
  customerModel
    .find({
      email: req.body.email,
      Password: bcrypt.hashSync(req.body.Password, 8)
    })
    .then(
      (response) => {
        res.send(response);
      },
      (err) => {
        res.sendStatus(404); //not found
      }
    );
});

app.post("/user", async (req, res) => {
  customerModel
    .find({
      // email: req.body.email,
      // Password: req.body.Password,
      _id: req.body._id,
    })
    .then(
      (response) => {
        res.send(response);
      },
      (err) => {
        res.sendStatus(404); //not found
      }
    );
});


app.get('/confirm/:confirmationCode', async(req,res) => {
    try{
        const token = req.params.confirmationCode
        customerModel.findOne({confirmationCode : token}).then((response) => {
            
            response.Status = 'Active'
            response.save()
            res.send(response)
            // console.log(response)
        } , (err) => {
            res.send(err)
        })
    }
    catch(err)
    {
        console.log(err)
    }
}
);

app.listen(5001, () => {
  console.log(`Listening to port 5001`);
});
