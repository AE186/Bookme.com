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
const cricketTicketModel = require("./Model/cricketTicket.js")
// const ticketModel = require("./Model/cricketTicket.js");



const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "k200177@nu.edu.pk",
    pass: "t2t1s342FFt2",
  },
});
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
  const token = jwt.sign({ email: email }, "ammar-secret-key");
  const customer = customerModel({
    fname: fname,
    lname: lname,
    Password: Password,
    email: email,
    confirmationCode: token,
  });
  try {
    customer.save();

    transport
      .sendMail({
        from: "k200177@nu.edu.pk",
        to: email,
        subject: "Confirm your account",
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${fname}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5001/confirm/${token}> Click here</a>
        </div>`,
      })
      .catch((err) => console.log(`Could not send email`));
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
    .findOne({
      email: req.body.email,
      // Password: bcrypt.hashSync(req.body.Password, 8)
    })
    .then(
      (response) => {
        console.log(response);
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


app.post("/payment" , async(req,res) => {

  console.log(req.body.ticket)
  if (req.body.ticket.type === "bus") {
    busModel.findOne({ _id: req.body.ticket.key }).then((foundBus) => {
      console.log(foundBus)
      foundBus.left = foundBus.left - req.body.ticket.tickets;
      // foundBus.save();
      customerModel.findOne({_id : req.body.ticket._id}).then((foundCustomer) => {
        console.log(foundCustomer)
        foundCustomer.busTicket.push(foundBus._id)
        Promise.all([foundBus.save() , foundCustomer.save()]).then((saved) => {
        res.sendStatus(200);

        })
        // foundCustomer.save()
      } , (err) => {
        res.sendStatus(404)
      })
      // res.sendStatus(200);
    } , (err) => {
      res.sendStatus(404)
    })
  }
  else if (req.body.ticket.type === "cricket") 
  {
    receivedTicket = req.body.ticket
    console.log(receivedTicket._id)
    enclosureModel.findOne({_id : receivedTicket.enclosure.key}).then((foundEnclosure) => {
      foundEnclosure.left = foundEnclosure.left - receivedTicket.tickets
      foundEnclosure.save()
      const ticket = new cricketTicketModel({
        team1 : receivedTicket.team1,
        team2 : receivedTicket.team2,
        date : receivedTicket.date,
        venue : receivedTicket.venue,
        city : receivedTicket.city,
        enclosure : foundEnclosure._id,
      })
      Promise.all([ticket.save()]).then((savedTicket) => {
        customerModel.findOne({_id : receivedTicket._id}).then((foundCustomer) => {
          if (foundCustomer)
          {
            // console.log(foundCustomer)
            console.log(savedTicket._id)
            foundCustomer.cricketTicket.push(savedTicket[0]._id)
            console.log(foundCustomer)
            foundCustomer.save()
            // Promise.one(foundCustomer.save()) 
            res.sendStatus(200)
          }
          else {
            return null
          }
          
        } , (err) => {
          res.sendStatus(404)
        } , (err) => {
          res.sendStatus(404)
        })
      } , (err)=> {
        res.sendStatus(404)
      })
      // res.sendStatus(200)
    } , (err) => {
      res.sendStatus(404)
    } , (err) => {
      console.log('Enclosure not found')
      res.sendStatus(404)
    })
  }
})

app.get("/user/ticket/:id" , async(request,response) => {
  try {
    customerModel.findOne({_id : request.params.id}).then((foundCustomer) => {
      const busTickets = [];
      const cricketTickets = [];
    
      const busPromises = foundCustomer.busTicket.map((busId) => {
        return busModel.findOne({_id: busId}).then((foundBus) => {
          console.log(`Found Bus ticket is\n`);
          console.log(foundBus);
          busTickets.push(foundBus);
        });
      });
    
      const cricketPromises = foundCustomer.cricketTicket.map((cricketId) => {
        return cricketTicketModel.findOne({_id: cricketId}).then((foundCricket) => {
          console.log(`Found Cricket ticket is\n`);
          console.log(foundCricket);
          cricketTickets.push(foundCricket);
        });
      });
    
      Promise.all([...busPromises, ...cricketPromises]).then(() => {
        response.send({busTickets: busTickets, cricketTickets: cricketTickets});
      }).catch((err) => {
        console.log(err);
        response.sendStatus(404);
      });
    
    }).catch((err) => {
      console.log('Error in finding the customer');
      console.log(request.params.id);
      response.sendStatus(404);
    });
    
    // customerModel.findOne({_id : request.params.id}).then((foundCustomer) => {
    //   const busTickets = [];
    //   const cricketTickets = [];
    //   for (let i =0 ; i<foundCustomer.busTicket.length ; i++){
    //     busModel.findOne({_id : foundCustomer.busTicket[i]}).then((foundBus) => {
    //       console.log(`Found Bus ticket is\n`)
    //       console.log(foundBus)
    //       busTickets.push(foundBus)
    //     } , (err) => {
    //       console.log(err)
    //     })
    //   }
    //   for (let i = 0 ; i<foundCustomer.cricketTicket.length ; i++){
    //     cricketTicketModel.findOne({_id : foundCustomer.cricketTicket[i]}).then((foundCricket) => {
    //       console.log(`Found Cricket ticket is\n`)
    //       console.log(foundCricket)
    //       cricketTickets.push(foundCricket)
    //     } , (err) => {
    //       console.log(err)
    //     });
    //   }
    //   // console.log(busTickets)
    //   // console.log(cricketTickets)
    //   response.send({busTickets : [busTickets] , cricketTickets : [cricketTickets]})
    // } , (err) => {
    //   console.log('Error in finding the customer')
    //   console.log(request.params.id)
    //   response.sendStatus(404)
    // })
  }
  catch(err) {
    console.log(err)
    response.sendStatus(404)
  }
})


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
