import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContex";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true);
      });
    } else {
      alert('Usuario o contraseña incorrecto');
    }
  }

  if (redirect) {
    return <Navigate to={'/home'} />
  }



  return (
    <>
      
      <div className="background-image">

<div className="navbar">
<a  href="#" className="logo">Bovinex</a>
</div>


<div className="background">
  <form className="register" onSubmit={login} >
  <h1>Ingresa</h1>
  <input 
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
  <button>Ingresar</button>
  <p>Aún no tengo cuenta <a href="/register">Registrarse</a></p>
  
  </form>

  </div>
  </div>


    </>
  )
}

export default Login