const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");
const customerModel = require("./Model/Customer.js");
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
  const Password = req.body.Password;
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

// app.post("/create", async(req,res)=>{
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName
//     const nic = req.body.nic
//     const customer = customerModel({firstname : firstName,lastname : lastName, nic : nic})

//     try{
//     customer.save();
//     }
//     catch(err){
//         console.log(err)
//     }

// });

app.post("/signin", async (req, res) => {
  customerModel
    .find({
      email: req.body.email,
      Password: req.body.Password,
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
            response.status = 'Active'
            response.save()
            res.send('User verified')
        } , (err) => {
            res.send('User not found')
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
