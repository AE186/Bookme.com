const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const customerModel = require("./Model/Customer.js");

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
  const customer = customerModel({
    fname: fname,
    lname: lname,
    Password: Password,
    email: email,
  });
  try {
    customer.save();
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

app.listen(5001, () => {
  console.log(`Listening to port 5001`);
});
