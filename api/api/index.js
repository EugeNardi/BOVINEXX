const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require('./models/User');
const Vaca = require('./models/Vaca');
const multer = require("multer");
const app = express();


const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json())

mongoose.connect("mongodb+srv://euge060406:ElonMusk0604@cluster0.rw5usdm.mongodb.net/?retryWrites=true&w=majority")



app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
      const saltRounds = 11
      const salt =  await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);


      const userDoc = await User.create({
        username,
        password: hashedPassword,
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('Usuario o contraseña incorrecta');
    }
  });
  
  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,  secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });
  
  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });


  app.post("/post", async (req,res) => {
    try{ 
    const {caravana, categoria, raza, peso, vacunacion, sector} = req.body;
    
    
    const vacaDoc = await Vaca.create({
         
         caravana,
         categoria,
         raza, 
         peso,
         vacunacion,
         sector,

    }); 
    res.json(vacaDoc)

    }catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  app.get("/get", async (req, res) => {
    res.json(await Vaca.find()
    .sort({createdAt: -1})
    .limit(10)
    );
})

  

app.listen(4000);
console.log("server runnig in port 4000");


