const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const UserModel = require('./module/Users')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Contact_Book')



app.delete("/deleteUser/:id", (req , res) =>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.put("/updateUser/:id", (req , res)=>{
     const id = req.params.id;
     UserModel.findByIdAndUpdate({_id:id},{
        name: req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        tags: req.body.tags
     })
     .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get("/getUser/:id", (req , res) =>{
    const id = req.params.id;
    UserModel.findById({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
    
})

app.get("/", (req, res) => {
    const { filterTag } = req.query;
  
    const query = filterTag ? { tags: { $in: [filterTag] } } : {};
  
    UserModel.find(query)
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: "Failed to fetch users", details: err }));
  });
  


app.post("/createContact", (req , res)=>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.listen(3001 , () =>{
    console.log("Server is Running")
})