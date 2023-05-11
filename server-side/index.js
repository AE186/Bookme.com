const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


const customerModel = require('./Model/Customer.js')
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');


const nodemailer = require('nodemailer')
// const e = require('express')


const transport = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'k200177@nu.edu.pk',
        pass: 't2t1s342FFt2'
    }
})
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Ammar:t2t1s342FFt2@bookaro.xkiebui.mongodb.net/BooKaro?retryWrites=true&w=majority",{
    useNewUrlParser: true,
});


app.post("/signup" , async(req,res) =>{

    const fname = req.body.fname
    const lname = req.body.lname
    const Password = req.body.Password
    const email = req.body.email
    const token = jwt.sign({
        email : req.body.email,
    } , 'ammar-secret-key')
    const customer = customerModel(
        {
            fname : fname,
            lname : lname,
            Password : Password,
            email : email,
            confirmationCode : token
        }
    )
    try {
        customer.save();
        transport.sendMail({
            from: 'k200177@nu.edu.pk',
            to: email,
            subject: 'Verify your email',
            html: `<h1>Email confirmation</h1>
                    <h2> Hello ${fname} </h2>
                    <p>Thank you for registering to our application. Kindly confirm your mail by clicking on the following link </br> <a href = http://localhost:5001/confirm/${token}>Click here</a></p>
                    </div>`,
        }).catch((err)=>{console.log(`Error in sending mail`)})
        res.status(200)
        
       
        
    }
    catch(err){
        console.log(err)
    }
})


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


app.post('/signin' ,async(req,res) =>
{
    customerModel.find({
        email : req.body.email,
        Password : req.body.Password
    }).then((response) =>
    {
        if (response.Status == 'Pending'){
            res.status(401).send({message : 'Pending account, Please verify through email'})
        }
        else {
            res.send(response)
        }
    }
    , (err) => 
    {
        res.sendStatus(404) //not found
    }
    )
})

app.get('/confirm/:token' , async(req,res) =>
{
    customerModel.findOne({
        confirmationCode : req.params.token
    }).then((response) => {
        if (response){
            response.Status = 'Active'
            response.save()
            res.send({message : 'Email confirmed'})
        }
        else {
            res.send({message : 'Invalid token'})
        }
    })
    
    
})

app.listen(5001, () => {
    console.log(`Listening to port 5001`)
})