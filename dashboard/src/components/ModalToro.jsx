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
  width: 800,
  height: 590,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export default function ModalToro() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [p12, setP12] = useState("");
  const [p18, setP18] = useState("");
  const [ce12, setCe12] = useState("");
  const [ce18, setCe18] = useState("");
  const [ce, setCe] = useState("");
  const [inmunizado, setInmunizado] = useState("");
  const [image, setImage] = useState(null); // Estado para la imagen

  const handleImageChange = (ev) => {
    setImage(ev.target.files[0]); // Guardar la imagen en el estado
  };

  async function createNewPost(ev) {
    ev.preventDefault();

    const formData = new FormData(); // Usar FormData para enviar datos y archivo
    formData.append("rp", rp);
    formData.append("nacimiento", nacimiento);
    formData.append("padre", padre);
    formData.append("pn", pn);
    formData.append("pd", pd);
    formData.append("p12", p12);
    formData.append("p18", p18);
    formData.append("ce12", ce12);
    formData.append("ce18", ce18);
    formData.append("ce", ce);
    formData.append("inmunizado", inmunizado);
    formData.append("image", image); // Añadir la imagen

    const response = await fetch("http://localhost:4000/posttoro", {
      method: "POST",
      body: formData,
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
      <button className='modal-button' onClick={handleOpen}>Agregar Toro</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h4" component="h6" fontFamily={'Poppins'} fontWeight={"600"}></Typography>
          <h2 className='modal-title'>Agregar Toro</h2>
          <form onSubmit={createNewPost} encType="multipart/form-data">
            <div className="row">
            
              <div className="column">
                <h6>RP</h6>
                <input
                  placeholder="2034"
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
                <h6>PESO AL NACER (KG)</h6>
                <input
                  placeholder="34 KG"
                  className="input"
                  value={pn}
                  onChange={(ev) => setPn(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO DESTETE (KG)</h6>
                <input
                  placeholder="180 KG"
                  className="select"
                  value={pd}
                  onChange={(ev) => setPd(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO 12 MESES (KG)</h6>
                <input
                  placeholder="340 KG"
                  className="select"
                  value={p12}
                  onChange={(ev) => setP12(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO 18 MESES (KG)</h6>
                <input
                  placeholder="420 KG"
                  value={p18}
                  onChange={(ev) => setP18(ev.target.value)}
                />
              </div>
            
             
              <div className="column">
                <h6>CIRCUNFERENCIA 12MESES (CM)</h6>
                <input
                  placeholder="22 CM"
                  className="select"
                  value={ce12}
                  onChange={(ev) => setCe12(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>CIRCUNFERENCIA 18MESES (CM)</h6>
                <input
                  placeholder="28 CM"
                  className="select"
                  value={ce18}
                  onChange={(ev) => setCe18(ev.target.value)}
                />
              </div>




              <div className="column">
                <h6>CIRCUNFERENCIA ESCROTAL (CM)</h6>
                <input
                  placeholder="34 CM"
                  value={ce}
                  onChange={(ev) => setCe(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PADRE</h6>
                <input
                  placeholder="MITO"
                  value={padre}  
                  onChange={(ev) => setPadre(ev.target.value)}
                />
              </div>


              <div className="column">
                <h6>INMUNIZADO</h6>
                <select
                  placeholder="INMUNIZADO"
                  value={inmunizado}
                  onChange={(ev) => setInmunizado(ev.target.value)}
                  
                >
                  <option value="SI">SI</option>
                  <option value="NO">NO</option>

                </select>
              </div>

             

              <div className="column">
                <h6>SUBIR FOTO</h6>
                <label  className='image-upload' htmlFor="image-upload">
                  <PublishIcon />
                  
                </label>
                <input
                  className='image-upload'
                  id="image-upload"
                  type="file"
                  style={{ display: "none" }} // Oculta el input de archivo
                  onChange={handleImageChange}
                />
                {image && <p className='image-name'>{image.name.split('_')[0]}</p>} {/* Mostrar el nombre de la imagen seleccionada */}

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
import PublishIcon from '@mui/icons-material/Publish';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 580,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};




export default function ModalToro() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [p12, setP12] = useState("");
  const [p18, setP18] = useState("");
  const [ce12, setCe12] = useState("");
  const [ce18, setCe18] = useState("");
  const [ce, setCe] = useState("");
  const [inmunizado, setInmunizado] = useState("");



  async function createNewPost(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/posttoro", {
      method: "POST",
      body: JSON.stringify({rp, nacimiento, padre, pn, pd, p12, p18, ce12, ce18, ce, inmunizado  }),
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
      <button className='modal-button'  onClick={handleOpen} >Agregar Toro</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style} className="modal-box">
          <Typography   id="modal-modal-title" variant="h4" component="h6" fontFamily={'Poppins'} fontWeight={"600"} >
          
          </Typography>
          <h2 className='modal-title-toro'>Agregar Toro</h2>
          <form
            action="/post"
            method="POST"
            onSubmit={createNewPost}
            encType="multipart/form-data"
          >
            <div className="row" >
              <div className="column">
                <h6>RP</h6>
                <input
                  placeholder="2034"
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
                <h6>PESO AL NACER (KG)</h6>
                <input
                  placeholder="34 KG"
                  className="input"
                  value={pn}
                  onChange={(ev) => setPn(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO DESTETE (KG)</h6>
                <input
                  placeholder="180 KG"
                  className="select"
                  value={pd}
                  onChange={(ev) => setPd(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO 12 MESES (KG)</h6>
                <input
                  placeholder="340 KG"
                  className="select"
                  value={p12}
                  onChange={(ev) => setP12(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PESO 18 MESES (KG)</h6>
                <input
                  placeholder="420 KG"
                  value={p18}
                  onChange={(ev) => setP18(ev.target.value)}
                />
              </div>
            
             
              <div className="column">
                <h6>CIRCUNFERENCIA 12MESES (CM)</h6>
                <input
                  placeholder="22 CM"
                  className="select"
                  value={ce12}
                  onChange={(ev) => setCe12(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>CIRCUNFERENCIA 18MESES (CM)</h6>
                <input
                  placeholder="28 CM"
                  className="select"
                  value={ce18}
                  onChange={(ev) => setCe18(ev.target.value)}
                />
              </div>




              <div className="column">
                <h6>CIRCUNFERENCIA ESCROTAL (CM)</h6>
                <input
                  placeholder="34 CM"
                  value={ce}
                  onChange={(ev) => setCe(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>PADRE</h6>
                <input
                  placeholder="MITO"
                  value={padre}  
                  onChange={(ev) => setPadre(ev.target.value)}
                />
              </div>


              <div className="column">
                <h6>INMUNIZADO</h6>
                <input
                  placeholder="INMUNIZADO"
                  value={inmunizado}
                  onChange={(ev) => setInmunizado(ev.target.value)}
                />
              </div>

              <div className="column">
                <span>
                Subir Foto
                <PublishIcon
                  
                  onChange={(ev) => setInmunizado(ev.target.value)}
                />
                </span>
              </div>

            </div>
            <button className="button">Cargar</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}



/*import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  height:450,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalToro() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [p12, setP12] = useState("");
  const [p18, setP18] = useState("");
  const [ce12, setCe12] = useState("");
  const [ce18, setCe18] = useState("");
  const [ce, setCe] = useState("");
  const [inmunizado, setInmunizado] = useState("");


  async function createNewPost(ev) {
   ev.preventDefault()

    const response = await fetch("http://localhost:4000/posttoro", {
      method: "POST",
      body: JSON.stringify({rp, nacimiento, padre, pn, pd, p12, p18, ce12, ce18, ce, inmunizado  }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);
  }



  return (
    <div>
      <Button onClick={handleOpen}>Agregar Toro</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Agregar Toro
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
                className="select"
                value={rp}
                onChange={(ev) => setRp(ev.target.value)}
              >
              </input>



             <h5>PADRE</h5>
              <input
                type="text"
                placeholder='PADRE'
                className="input"
                value={padre}
                onChange={(ev) => setPadre (ev.target.value)}
              />
              <h5>NACIMIENTO</h5>
              <input
                type='date'
                placeholder="FECHA DE NACIMINETO"
                className="date"
                value={nacimiento}
                onChange={(ev) => setNacimiento(ev.target.value)}
              >
                
              </input>

                <h5>PESO AL NACIMIENTO</h5>
              <input
                placeholder="PESO AL NACIMINETO"
                className="select"
                value={pn}
                onChange={(ev) => setPn(ev.target.value)}
              >
               
              </input>

              <h5>PESO AL DESTETE</h5>
              <input
                placeholder="PESO AL DESTETE"
                className="select"
                value={pd}
                onChange={(ev) => setPd(ev.target.value)}
              >
               
              </input>


              <h5>PESO AL DESTETE</h5>
              <input
                placeholder="PESO AL DESTETE"
                className="select"
                value={pd}
                onChange={(ev) => setPd(ev.target.value)}
              >
               
              </input>

              <h5>PESO 12 MESES</h5>
              <input
                placeholder="PESO 12 MESES"
                className="select"
                value={p12}
                onChange={(ev) => setP12(ev.target.value)}
              >
               
              </input>


              <h5>PESO 18 MESES</h5>
              <input
                placeholder="PESO 18 MESES"
                className="select"
                value={p18}
                onChange={(ev) => setP18(ev.target.value)}
              >
               
              </input>

              <h5>CIRCUNFERENCIA ESCROTAL 12 MESES</h5>
              <input
                placeholder="CIRCUNFERENCIA ESCROTAL 12 MESES"
                className="select"
                value={ce12}
                onChange={(ev) => setCe12(ev.target.value)}
              >
               
              </input>

              <h5>CIRCUNFERENCIA ESCROTAL 18 MESES</h5>
              <input
                placeholder="CIRCUNFERENCIA ESCROTAL 18 MESES"
                className="select"
                value={ce18}
                onChange={(ev) => setCe18(ev.target.value)}
              >
               
              </input>



            
             <h5>CIRCUNFERENCIA ESCROTAL</h5>
              <input
                placeholder="CIRCUNFERENCIA ESCROTAL"
                className="select"
                value={ce}
                onChange={(ev) => setCe(ev.target.value)}
              >
               
              </input>


              <h5>INMUNIZADO</h5>
              <input
                placeholder="INMUNIZADO"
                className="check"
                value={inmunizado}
                onChange={(ev) => setInmunizado(ev.target.value)}
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