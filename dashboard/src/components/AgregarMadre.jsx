import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar";

import { useState } from "react";

const AgregarLote = () => {

  const [caravana, setCaravana] = useState("");
  const [categoria, setCategoria] = useState("");
  const [raza, setRaza] = useState("");
  const [peso, setPeso] = useState("");
  const [vacunacion, setVacunacion] = useState("");


  async function createNewPost(ev) {
   ev.preventDefault()

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: JSON.stringify({caravana, categoria, raza, peso, vacunacion }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    console.log(response);
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="select-container">
          <h2>Agregar Madre</h2>

          <form
            action="/post"
            method="POST"
            onSubmit={createNewPost}
            encType="multipart/form-data"
          >
            <div className="row">
              <input
                type="text"
                placeholder="N° Caravana"
                className="input"
                value={caravana}
                onChange={(ev) => setCaravana(ev.target.value)}
              />

              <select
                placeholder="Categoria"
                className="select"
                value={categoria}
                onChange={(ev) => setCategoria(ev.target.value)}
              >
                <option value="">Seleccionar</option>
                <option>Vaquillona</option>
                <option>Ternero</option>
                <option>Novillo (-180kg)</option>
                <option>Novillo (+180kg)</option>
                <option>Vaca Reserva</option>
                <option>Vaca Regular</option>
                <option>Toro</option>
              </select>

              <select
                placeholder="Raza"
                className="select"
                value={raza}
                onChange={(ev) => setRaza(ev.target.value)}
              >
                <option value="">Seleccionar</option>
                <option>Angus</option>
                <option>Hereford</option>
                <option>Brangus</option>
                <option>Braford</option>
                <option>Holando</option>
                <option>Bramhan</option>
                <option>Shorton</option>
                <option>Otra</option>
              </select>


            </div>

            <div className="row">
              
              
              
              <input
                type="number"
                placeholder="Peso (kg)"
                className="input"
                value={peso}
                onChange={(ev) => setPeso(ev.target.value)}
              />

              <select
                placeholder="Vacunación"
                className="select"
                value={vacunacion}
                onChange={(ev) => setVacunacion(ev.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Completa">Completa</option>
              </select>

             
            </div>
            <button className="button">Cargar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgregarLote;


