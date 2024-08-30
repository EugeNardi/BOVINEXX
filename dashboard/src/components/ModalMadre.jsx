import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900, // Increased width
  height: 580, // Increased height
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export default function ModalMadre() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [peso, setPeso] = useState("");
  const [pn, setPn] = useState("");
  const [estado, setEstado] = useState("");
  const [toro, setToro] = useState("");
  const [servicio, setServicio] = useState("");
  const [abma, setAbma] = useState("");
  const [tatu, setTatu] = useState("");
  const [image, setImage] = useState(null); // State for the image

  const handleImageChange = (ev) => {
    setImage(ev.target.files[0]); // Save the image in the state
  };

  async function createNewPost(ev) {
    ev.preventDefault();

    const formData = new FormData(); // Use FormData to send data and file
    formData.append("rp", rp);
    formData.append("nacimiento", nacimiento);
    formData.append("peso", peso);
    formData.append("pn", pn);
    formData.append("estado", estado);
    formData.append("toro", toro);
    formData.append("servicio", servicio);
    formData.append("abma", abma);
    formData.append("tatu", tatu);
    formData.append("image", image); // Add the image

    const response = await fetch("http://localhost:4000/postmadre", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      setOpen(false); // Close the modal
      window.location.reload(); // Reload the page
    } else {
      console.error("Error creating the post");
    }
  }

  return (
    <div>
      <button className='modal-button' onClick={handleOpen}>Agregar Madre</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h4" component="h6" fontFamily={'Poppins'} fontWeight={"600"}>
          </Typography>
          <h2 className='modal-title'>Agregar Madre</h2>
          <form onSubmit={createNewPost} encType="multipart/form-data">
            <div className="row">
              <div className="column">
                <h6>RP</h6>
                <input
                  placeholder="B999"
                  value={rp}
                  onChange={(ev) => setRp(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>NACIMIENTO</h6>
                <input
                  type='date'
                  placeholder="NACIMIENTO"
                  value={nacimiento}
                  onChange={(ev) => setNacimiento(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>PESO (KG)</h6>
                <input
                  type='number'
                  placeholder="340 KG"
                  value={peso}
                  onChange={(ev) => setPeso(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>PESO AL NACER (KG)</h6>
                <input
                  placeholder="28 KG"
                  value={pn}
                  onChange={(ev) => setPn(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>ESTADO</h6>
                <select
                  placeholder="VACÍO"
                  className="select"
                  value={estado}
                  onChange={(ev) => setEstado(ev.target.value)}
                >
                  <option>VACÍA</option>
                  <option>PREÑADA</option>
                </select>
              </div>

              <div className="column">
                <h6>TORO</h6>
                <input
                  placeholder="MITO"
                  className="select"
                  value={toro}
                  onChange={(ev) => setToro(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>SERVICIO</h6>
                <input
                  type='date'
                  placeholder="SERVICIO"
                  className="select"
                  value={servicio}
                  onChange={(ev) => setServicio(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>ABUELA MATERNA</h6>
                <input
                  placeholder="Chinuca 1103"
                  value={abma}
                  onChange={(ev) => setAbma(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>TATU</h6>
                <input
                  placeholder="2304"
                  className="select"
                  value={tatu}
                  onChange={(ev) => setTatu(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>SUBIR FOTO</h6>
                <label  className="image-upload" htmlFor="image-upload">
                
                  <PublishIcon />
                </label>
                <input
                  id="image-upload"
                  className="image-upload"
                  type="file"
                  style={{ display: "none" }} // Hide the file input
                  onChange={handleImageChange}
                />
                {image && <p className='image-name'>{image.name.split('_')[0]}</p>} {/* Show the selected image name */}
              </div>
            </div>
            <button className="button">Cargar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

/*
import { useState } from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css"

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export default function ModalLote() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [peso, setPeso] = useState("");
  const [pn, setPn] = useState("");
  const [estado, setEstado] = useState("");
  const [toro, setToro] = useState("");
  const [servicio, setServicio] = useState("");
  const [abma, setAbma] = useState("");
  const [tatu, setTatu] = useState("");

  async function createNewPost(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/postmadre", {
      method: "POST",
      body: JSON.stringify({ rp, nacimiento, peso, pn, estado, toro, servicio, abma, tatu }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      setOpen(false); // Cierra el modal
      window.location.reload(); // Recarga la página
    } else {
      console.error("Error al crear el post");
    }
  }

  return (
    <div>
      <button className='modal-button' onClick={handleOpen}>Agregar Madre</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h4" component="h6" fontFamily={'Poppins'} fontWeight={"600"}>
          </Typography>
          <h2 className='modal-title'>Agregar Madre</h2>
          <form
            action="/post"
            method="POST"
            onSubmit={createNewPost}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="column">
                <h6>RP</h6>
                <input
                  placeholder="B999"
                  value={rp}
                  onChange={(ev) => setRp(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>NACIMIENTO</h6>
                <input
                  type='date'
                  placeholder="NACIMIENTO"
                  value={nacimiento}
                  onChange={(ev) => setNacimiento(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>PESO (KG)</h6>
                <input
                  type='number'
                  placeholder="340 KG"
                  value={peso}
                  onChange={(ev) => setPeso(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>PESO AL NACER (KG)</h6>
                <input
                  placeholder="28 KG"
                  value={pn}
                  onChange={(ev) => setPn(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>ESTADO</h6>
                <select
                  placeholder="VACÍO"
                  className="input"
                  value={estado}
                  onChange={(ev) => setEstado(ev.target.value)}
                >
                  <option>VACÍA</option>
                  <option>PREÑADA</option>
                </select>
              </div>

              <div className="column">
                <h6>TORO</h6>
                <input
                  placeholder="MITO"
                  className="select"
                  value={toro}
                  onChange={(ev) => setToro(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>SERVICIO</h6>
                <input
                  type='date'
                  placeholder="SERVICIO"
                  className="select"
                  value={servicio}
                  onChange={(ev) => setServicio(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>ABUELA MATERNA</h6>
                <input
                  placeholder="Chinuca 1103"
                  value={abma}
                  onChange={(ev) => setAbma(ev.target.value)}
                />
              </div>
              <div className="column">
                <h6>TATU</h6>
                <input
                  placeholder="2304"
                  className="select"
                  value={tatu}
                  onChange={(ev) => setTatu(ev.target.value)}
                />
              </div>
            </div>
            <button className="button">Cargar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}


/*
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  height:450,
  bgcolor: 'background.paper',
  colors:"",
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalLote() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRP] = useState("");
  const [nacimineto, setNacimiento] = useState("");
  const [peso, setPeso] = useState("");
  const [pn, setPn] = useState("");
  const [estado, setEstado] = useState("");
  const [toro, setToro] = useState("");
  const [servicio, setServicio] = useState("");
  const [abma, setAbma] = useState("");
  const [tatu, setTatu] = useState("");

  async function createNewPost(ev) {
   ev.preventDefault()

    const response = await fetch("http://localhost:4000/postmadre", {
      method: "POST",
      body: JSON.stringify({rp, nacimineto, peso, pn, estado, toro, servicio, abma, tatu  }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);
  }



  return (
    <div>
      <Button onClick={handleOpen}>Agregar Madre</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Agregar Madre
          </Typography>
          <form
            action="/post"
            method="POST"
            onSubmit={createNewPost}
            encType="multipart/form-data"
          >

            <div className="row">

            
            <h5>RP</h5>
             
            <input
                placeholder="RP"
                value={rp}
                onChange={(ev) => setRP(ev.target.value)}
              >
              </input>

               
            <h5>NACIMIENTO</h5>
             
             <input
                 placeholder="NACIMIENTO"
                 value={nacimineto}
                 onChange={(ev) => setNacimiento(ev.target.value)}
               >
               </input>

 
               <h5>PESO</h5>
             
             <input
                 placeholder="PESO"
                 value={peso}
                 onChange={(ev) => setPeso(ev.target.value)}
               >
               </input>

                
            <h5>PESO AL NACIMIENTO</h5>
             
             <input
                 placeholder="PESO AL NACIMIENTO"
                 value={pn}
                 onChange={(ev) => setPn(ev.target.value)}
               >
               </input>

              <h5>ESTADO</h5>


              <input

                placeholder="ESTADO"
                className="input"
                value={estado}
                onChange={(ev) => setEstado (ev.target.value)}
              />

              <h5>TORO</h5>
              <input
                placeholder="TORO"
                className="select"
                value={toro}
                onChange={(ev) => setToro(ev.target.value)}
              >
              
              </input>


                <h5>SERVICIO</h5>
              <input 
                type='date'
                placeholder="SERVICIO"
                className="select"
                value={servicio}
                onChange={(ev) => setServicio(ev.target.value)}
              >
               
              </input>


               
            <h5>ABUELA MATERNA</h5>
             
             <input
                 placeholder="ABUELA MATERNA"
                 value={abma}
                 onChange={(ev) => setAbma(ev.target.value)}
               >
               </input>


            

         
              <h5>TATU</h5>

              <input
                placeholder="TATU"
                className="select"
                value={tatu}
                onChange={(ev) => setTatu(ev.target.value)}
              >
           
              </input>

              </div>
          
            
            <button className="button">Cargar</button>
          </form>
         
        </Box>
      </Modal>
    </div>
  );
}
*/