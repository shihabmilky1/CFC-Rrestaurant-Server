const express = require('express')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4czm1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000




client.connect(err => {
  const collection = client.db("red-onion").collection("product");
  const BreakFast = client.db("red-onion").collection("breakfast");
  const Lunch = client.db("red-onion").collection("lunch");
  const Dinner = client.db("red-onion").collection("dinner");
  const Cart = client.db("red-onion").collection("cart");
  //Load BreakFast Data
   app.get('/breakFast',(req,res)=> {
    BreakFast.find({})
    .toArray((err,documents)=> {
        res.send(documents)
        // console.log(documents)
    })
   })
   app.get('/breakFast/:id',(req,res)=> {
    BreakFast.find({_id: ObjectId(req.params.id)})
    .toArray((err,documents)=> {
        res.send(documents[0])
    })
   })
 
     //Load Lunch Data
     app.get('/lunch',(req,res)=> {
      Lunch.find({})
      .toArray((err,documents)=> {
          res.send(documents)
      })
     })
     app.get('/lunch/:id',(req,res)=> {
      Lunch.find({_id: ObjectId(req.params.id)})
      .toArray((err,documents)=> {
          res.send(documents[0])
      })
     })
  //Load Dinner Data
  app.get('/dinner',(req,res)=> {
    Dinner.find({})
    .toArray((err,documents)=> {
        res.send(documents)
    })
   })
   app.get('/dinner/:id',(req,res)=> {
    Dinner.find({_id: ObjectId(req.params.id)})
    .toArray((err,documents)=> {
        res.send(documents[0])
    })
   })
//Add Cart
app.post('/addCart',(req,res)=> {
    Cart.insertOne(req.body)
    .then(result => {
        res.send(result.insertedCount > 0)
    })
   })
   //Load Cart
   app.get('/loadCart',(req,res)=>{
       Cart.find({email:req.query.email})
       .toArray((err,documents)=>{
           res.send(documents)
       })
   })

//Cart Modify
   app.patch('/quantityIncrease/:id',(req,res)=>{
    //    console.log(req.body.q);
    Cart.updateOne({_id: ObjectId(req.params.id)},{
        $set : {quantity: req.body.quantityIncrease}
    })
    .then(result=>{
        console.log(result)
    })
}) 
   app.patch('/quantityDecrease/:id',(req,res)=>{
    //    console.log(req.body.q);
    Cart.updateOne({_id: ObjectId(req.params.id)},{
        $set : {quantity: req.body.quantityDecrease}
    })
    .then(result=>{
        console.log(result)
    })
  //Load Cart
});
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})