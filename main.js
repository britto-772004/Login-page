// import the express package for routing,database operations
const express = require ("express")

// import the mongoose package for database connectivity with mongodb
const moongoose = require("mongoose")

// import the cors package for frontend and backend port communication purposes
const cors = require("cors")

// parse the incoming requests in json format 
const bodyparser =  require("body-parser")

// to store the sensitive information in .env file 
require("dotenv").config();


const app = express();

app.use(cors())
app.use(bodyparser.json())


// mongodb connection 

moongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{console.log("Mongodb connected..")})
.catch((err)=>{"error in mongodb connection ",err});

// create schema 

const userschema = new moongoose.Schema({
    username : String,
    password : String
});

const User = moongoose.model("user",userschema);

// api for login page 
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error });
    }
});

app.listen(5000,()=>{console.log("Server is running in http://localhost:5000 port ",process.env.MONGODB_URI)});