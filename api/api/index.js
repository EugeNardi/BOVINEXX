const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require('./models/User');
<<<<<<< HEAD
const Ternero = require('./models/Ternero');
const Madre = require('./models/Madre');
const Toro = require('./models/Toro');
const Guia = require('./models/Guias');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
=======
const Vaca = require('./models/Vaca');
const multer = require("multer");
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
const app = express();


const secret = "asdfe45we45w345wegw345werjktjwertkj";
<<<<<<< HEAD
=======

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

  
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json())

mongoose.connect("mongodb+srv://euge060406:ElonMusk0604@cluster0.rw5usdm.mongodb.net/?retryWrites=true&w=majority")



app.get("/",  (req, res) => {
  res.json("el servidor funciona")
})




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

/** LOGIN --------------- */

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const userDoc = await User.findOne({ username });
  
      if (!userDoc) {
        return res.status(400).json('Usuario o contraseña incorrecta');
      }
  
      const passOk = bcrypt.compareSync(password, userDoc.password);
  
      if (passOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id: userDoc._id,
            username,
          });
        });
      } else {
        res.status(400).json('Usuario o contraseña incorrecta');
      }
    } catch (err) {
      res.status(500).json('Error del servidor');
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

//MULTER ----------*********************************/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // choose your directory
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });





const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const madreImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/images/madres/';
    fs.mkdirSync(dir, { recursive: true }); // Create the directory if it doesn't exist
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add the file extension
  }
});

const uploadImage = multer({ storage: imageStorage });

const uploadMadreImage = multer({ storage: madreImageStorage });

// Image upload middleware
//** POST--------------------- */


app.post('/postmadre', uploadMadreImage.single('image'), async (req, res) => {
  try {
    const { rp, nacimiento, peso, pn, estado, toro, servicio, abma, tatu } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded image path

    const madreDoc = await Madre.create({
      rp,
      nacimiento,
      peso,
      pn,
      estado,
      toro,
      servicio,
      abma,
      tatu,
      image, // Save the image path in the database
    });

    res.json(madreDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});



  app.post("/postternero", async (req,res) => {
    try{ 
    const {rp,nacimiento,genero, madre, padre, pn, pd, peso, ce, tatu,} = req.body;
    
    
    const terneroDoc = await Ternero.create({
         
      rp,
      nacimiento,
      genero,
      madre,
      padre,
      pn,
      pd,
      peso,
      ce, 
      tatu,
    

    }); 
    res.json(terneroDoc) 

    }catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

  
 

  app.post('/posttoro', uploadImage.single('image'), async (req, res) => {
    try {
        const { rp, nacimiento, padre, pn, pd, p12, p18, ce12, ce18, ce, inmunizado } = req.body;
        const image = req.file ? req.file.path : null;

        const toroDoc = await Toro.create({
            rp,
            nacimiento,
            padre,
            pn,
            pd,
            p12,
            p18,
            ce12,
            ce18,
            ce,
            inmunizado,
            image,
        });

        res.json(toroDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

  app.post('/postguia', upload.single('guia'), async (req, res) => {
    try {
        const { file } = req;
        const { user } = req.body; // assume user ID is sent in the request body

        if (!file) {
            return res.status(400).json({ error: "Please upload a file" });
        }

        const guiaDoc = await Guia.create({
            guia: file.path, // store the file path in the database
            user
        });

        res.status(200).json(guiaDoc);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
});

  //** GET--------------- */

  app.get("/getternero", async (req, res) => {
    let terneros_ = await Ternero.find().sort({createdAt: -1})
    

    res.json(terneros_);
})


app.get("/gethijos/:madre_rp", async (req, res) => {
  const madre_rp = req.params.madre_rp; // Obtén madre_rp de los parámetros de la solicitud

  try {
    // Filtra los terneros que tienen el campo Madre igual al madre_rp recibido
    let terneros_ = await Ternero.find({ Madre: madre_rp }).sort({ createdAt: -1 });
    res.json(terneros_);
  } catch (error) {
    console.error('Error fetching terneros:', error);
    res.status(500).send('Error fetching terneros');
  }
});



app.get("/getmadre", async (req, res) => {
  res.json(await Madre.find()
  .sort({createdAt: -1})


  );
})


app.get("/gettoro", async (req, res) => {
  res.json(await Toro.find()
  .sort({createdAt: -1})
  

  );
})


app.get("/getguia", async (req, res) => {
  try {
      const guias = await Guia.find().sort({ createdAt: -1 });
      res.json(guias);
  } catch (e) {
      res.status(400).json(e);
  }
});

  //** DELETE--------------- */


app.delete('/deleteternero/:id', async (req, res) => {
  const vacaId = req.params.id;
  try {
      const deletedVaca = await Ternero.findByIdAndDelete(vacaId);

      if (!deletedVaca) {
          res.status(404).json({ message: 'Ternero no encontrada' });
      } else {
          res.json({ message: 'Ternero eliminado exitosamente' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/deletemadre/:id', async (req, res) => {
  const LoteId = req.params.id;
  try {
      const deletedLote = await Madre.findByIdAndDelete(LoteId);

      if (!deletedLote) {
          res.status(404).json({ message: 'Madre no encontrado' });
      } else {
          res.json({ message: 'Madre eliminada exitosamente' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.delete('/deletetoro/:id', async (req, res) => {
  const LoteId = req.params.id;
  try {
      const deletedLote = await Toro.findByIdAndDelete(LoteId);

      if (!deletedLote) {
          res.status(404).json({ message: 'Toro no encontrado' });
      } else {
          res.json({ message: 'Toro eliminado exitosamente' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
});



app.delete('/deleteguia/:id', async (req, res) => {
  try {
      const GuiaId = req.params.id;
      // Assuming you have a model `Guia` to interact with your database
      await Guia.findByIdAndDelete(GuiaId);
      res.status(200).send({ message: 'Guía deleted successfully' });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting guía', error });
  }
});



  //** GET-EDIT  --------------- */

app.get('/getternero/:id', async (req, res) => {
  const {id} = req.params;
  const terneroDoc = await Ternero.findById(id);
  res.json(terneroDoc);
})

app.get('/getmadre/:id', async (req, res) => {
  const {id} = req.params;
  const loteDoc = await Madre.findById(id);
  res.json(loteDoc);
})

app.get('/gettoro/:id', async (req, res) => {
  const {id} = req.params;
  const toroDoc = await Toro.findById(id);
  res.json(toroDoc);
})

/**---- EDIT  */



app.put('/editmadre/:id', uploadMadreImage.single('image'), async (req, res) => {
  const {id} = req.params;
  const { rp, nacimiento, peso, pn, estado, toro, servicio, abma, tatu } = req.body;
  const image = req.file ? req.file.path : null;

  try {
      const updatedMadre = await Madre.findByIdAndUpdate(
          id,
          { rp, nacimiento, peso, pn, estado, toro, servicio, abma, tatu, ...(image && {image}) },
          { new: true } // Devuelve el documento actualizado
      );

      if (!updatedMadre) {
          return res.status(404).json({ message: 'Madre no encontrada' });
      }

      res.json(updatedMadre);
  } catch (e) {
      console.log(e);
      res.status(400).json(e);
  }
});




app.put('/editternero/:id', async (req, res) => {
  const {id} = req.params;
  const { rp, nacimiento, genero, madre, padre, pn, pd, peso, ce, tatu } = req.body;

  try {
      const updatedTernero = await Ternero.findByIdAndUpdate(
          id,
          { rp, nacimiento, genero, madre, padre, pn, pd, peso, ce, tatu },
          { new: true } // Devuelve el documento actualizado
      );

      if (!updatedTernero) {
          return res.status(404).json({ message: 'Ternero no encontrado' });
      }

      res.json(updatedTernero);
  } catch (e) {
      console.log(e);
      res.status(400).json(e);
  }
});



app.put('/edittoro/:id', uploadImage.single('image'), async (req, res) => {
  const {id} = req.params;
  const { rp, nacimiento, padre, pn, pd, p12, p18, ce12, ce18, ce, inmunizado } = req.body;
  const image = req.file ? req.file.path : null;

  try {
      const updatedToro = await Toro.findByIdAndUpdate(
          id,
          { rp, nacimiento, padre, pn, pd, p12, p18, ce12, ce18, ce, inmunizado, ...(image && {image}) },
          { new: true } // Devuelve el documento actualizado
      );

      if (!updatedToro) {
          return res.status(404).json({ message: 'Toro no encontrado' });
      }

      res.json(updatedToro);
  } catch (e) {
      console.log(e);
      res.status(400).json(e);
  }
});

/**-----------------USE APP*/

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("uploads/images", express.static(path.join(__dirname, 'uploads/images')));



app.listen(4000);