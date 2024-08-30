import { useState } from "react";
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      alert("Registro fallido. Intentalo de Nuevo");
    } else {
      alert("Registro Exitoso");
      window.location.href = "http://localhost:5173/";
    }
  }

  return (
    <>
       <div className="background-image">

        <div className="navbar">
        <a  href="#" className="logo">Bovinex</a>
        </div>
 
    
        <div className="background">
          <form className="register" onSubmit={register} >
          <h1>Registrate</h1>
          <input 
<<<<<<< HEAD
          className="input"
=======
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
          type="text" 
          placeholder="Nombre de usuario" 
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          />
          <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          />
          <button>Registrarse</button>
          <p>Ya tienes una cuenta? <a href="/">Ingresar</a></p>
          </form>
        
          </div>
          </div>
     
    </>
  );
};

export default Register;

