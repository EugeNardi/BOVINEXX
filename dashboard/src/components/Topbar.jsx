import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContex';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import "./ModalLogout.css"

const Topbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir después del logout

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
      method: "GET",
    })
    .then((response) => response.json())
    .then((userInfo) => {
      setUserInfo(userInfo);
    })
    .catch((error) => {
      console.error("Error al obtener el perfil:", error);
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    .then((response) => {
      if (response.ok) {
        setUserInfo(null);
        navigate("/"); // Redirige a la página de inicio de sesión
      } else {
        console.error("Error al cerrar sesión");
      }
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  }
  console.log(userInfo);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <a href="/home" className="logo">Bovinex</a>
        </div>
        <div className="topbarRight">
          <div className="topbarIconsContainer">
            <SettingsIcon />
          </div>
          <div className="topbarIconsContainer">
            <LogoutIcon onClick={handleClickOpen} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <h3>Confirmar Cierre de Sesión</h3>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea salir de la sesión?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="button-cancel">
            Cancelar
          </button>
          <button onClick={handleConfirmLogout} className="button-out" >
            Salir
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Topbar;








/*import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { UserContext } from '../UserContex';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Topbar = () => {
  const { userInfo , setUserInfo} = useContext(UserContext);
 

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
      method: "GET",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        
      });
    });
  }, []);

  console.log(userInfo);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }



  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topbarLeft">
                <a  href="/home" className="logo">Bovinex</a>
            </div>
            <div className="topbarRight">
              
                <div className="topbarIconsContainer">
                <SettingsIcon/>
                </div>
                <div className="topbarIconsContainer">
                <Link to={"/"} onClick={logout}>
                <LogoutIcon/>
                </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Topbar
*/


