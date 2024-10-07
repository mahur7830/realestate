const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")
const authController =require("./controllers/authController")
const propertyController = require("./controllers/propertyController")
const jwt = require("jsonwebtoken");
const uploadController = require("./controllers/uploadController");

const app = express()

//connect mongodb
//mongoose.connect(process.env.MONGO_URL, ()=> console.log("db connected"));
//we can not use call back in mongo new version so we are using promises
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MONGODB CONNECTED"))
  .catch(err => console.error("MONGODB CONNECTION ERROR:", err));
app.use('/images', express.static('public/images'))

  //===========Routes and middlewares===========//
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))

  app.use("/auth",authController)
  app.use("/property",propertyController)
  app.use("/upload",uploadController)
//===========Starting server
app.listen(process.env.PORT,()=> console.log("SERVER START"));