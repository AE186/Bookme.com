const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


const customerModel = require('./Model/Customer.js')

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Ammar:t2t1s342FFt2@bookaro.xkiebui.mongodb.net/BooKaro?retryWrites=true&w=majority",{
    useNewUrlParser: true,
});

app.post("/create", async(req,res)=>{
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const nic = req.body.nic
    const customer = customerModel({firstname : firstName,lastname : lastName, nic : nic})

    try{
    customer.save();
    }
    catch(err){
        console.log(err)
    }
    
});

app.get('/read', async(req,res)=>{
    customerModel.find().then((err,result)=>{
        if (err){
            res.send(err);
        }
        res.send(result);
    })
    // customerModel.find({},(err,result)=>{
    //     if (err){
    //         res.send(err);
    //     }
    //     console.log(result);    
    //     res.send(result);
    // })
});

app.listen(5001, () => {
    console.log(`Listening to port 5001`)
})