
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
  height: 570,
  bgcolor: 'background.paper',
  border: '1px solid #ddd',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  p: 4,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};




export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [madre, setMadre] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [peso, setPeso] = useState("");
  const [ce, setCe] = useState("");
  const [tatu, setTatu] = useState("");



  async function createNewPost(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/postternero", {
      method: "POST",
      body: JSON.stringify({rp, nacimiento, genero, madre, padre, pn, pd, peso, ce, tatu}),
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
      <button className='modal-button' onClick={handleOpen} >Agregar Ternero</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={style} className="modal-box">
          <Typography   id="modal-modal-title" variant="h4" component="h6" fontFamily={'Poppins'} fontWeight={"600"} >
          
          </Typography>
          <h2 className='modal-title'>Agregar Ternero</h2>
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
                  placeholder='B999'
                  value={rp}
                  onChange={(ev) => setRp(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>NACIMIENTO</h6>
                <input
                  type='date'
                  value={nacimiento}
                  onChange={(ev) => setNacimiento(ev.target.value)}
                />
              </div>

              <div className="column">
                <h6>GENERO</h6>
                <select
                  placeholder="MACHO"
                  className="input"
                  value={genero}
                  onChange={(ev) => setGenero(ev.target.value)}
                >
                  <option>MACHO</option>
                  <option>HEMBRA</option>
                </select>
              </div>

              <div className="column">
                <h6>MADRE</h6>
                <input
                  placeholder="B988"
                  value={madre}
                  onChange={(ev) => setMadre(ev.target.value)}
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
                <h6>PESO AL NACER (KG)</h6>
                <input
                  placeholder="32 KG"
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
                <h6>PESO (KG)</h6>
                <input
                  placeholder="220 KG"
                  className="select"
                  value={peso}
                  onChange={(ev) => setPeso(ev.target.value)}
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
                <h6>CIRCUNFERENCIA ESCROTAL (CM)</h6>
                <input
                  placeholder="23 CM"
                  value={ce}
                  onChange={(ev) => setCe(ev.target.value)}
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





/*import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [madre, setMadre] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [p12, setP12] = useState("");
  const [ce, setCe] = useState("");
  const [tatu, setTatu] = useState("");


  async function createNewPost(ev) {
   ev.preventDefault()

    const response = await fetch("http://localhost:4000/postternero", {
      method: "POST",
      body: JSON.stringify({rp, nacimiento, madre, padre, pn, pd, p12, ce, tatu}),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);
  }



  return (
    <div >
      <Button onClick={handleOpen}>Agregar Ternero</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <Typography id="modal-modal-title" variant="h4" component="h6">
          </Typography>
          <h2>Agregar Ternero</h2>
          <form 
            className='modalform'
            action="/post"
            method="POST"
            onSubmit={createNewPost}
            encType="multipart/form-data"
          >
            <div className="row">
              <h6>RP</h6>
              <input
                placeholder="RP"
                className="input"
                value={rp}
                onChange={(ev) => setRp(ev.target.value)}
              />

               <h6>NACIMIENTO</h6>
               <input
                type="date"
                placeholder="Nacimiento"
                className="input"
                value={nacimiento}
                onChange={(ev) => setNacimiento(ev.target.value)}
              />

              <h6>MADRE</h6>
              <input
                placeholder="MADRE"
                className="select"
                value={madre}
                onChange={(ev) => setMadre(ev.target.value)}
              >
                
              </input>

              <h6>PADRE</h6>
              <input
                placeholder="PADRE"
                className="select"
                value={padre}
                onChange={(ev) => setPadre(ev.target.value)}
              >
                
              </input>

              <h6>PESO NACIMIENTO </h6>
              <input
                placeholder="PESO NACIMIENTO"
                className="select"
                value={pn}
                onChange={(ev) => setPn(ev.target.value)}
              >
              
              </input>


              <h6>PESO AL DESTETE</h6>
              <input
                placeholder="PESO AL DESTETE"
                className="select"
                value={pd}
                onChange={(ev) => setPd(ev.target.value)}
              >
                
              </input>


              <h6>PESO 12 MESES</h6>
              <input
                placeholder="PESO 12 MESES "
                className="select"
                value={p12}
                onChange={(ev) => setP12(ev.target.value)}
              >
        
              </input>

              <h6>CIRCUNFERENCIA ESCROTAL</h6>
              <input
                placeholder="CIRCUNFERENCIA ESCROTAL"
                className="select"
                value={ce}
                onChange={(ev) => setCe(ev.target.value)}
              >
        
              </input>



              <h6>TATU</h6>
              <input
                placeholder="TATU"
                className="select"
                value={tatu}
                onChange={(ev) => setTatu(ev.target.value)}
              >
            
              </input>

            </div>
            <button className="buttonmodal">Cargar</button>
          </form>
         
        </Box>
      </Modal>
    </div>
  );
}
  */