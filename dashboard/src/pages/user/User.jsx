import "./User.css"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
//import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
//import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ScaleIcon from '@mui/icons-material/Scale';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PublishIcon from '@mui/icons-material/Publish';
import { NavLink } from "react-router-dom";

const User = () => {
  return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Modificar</h1>
            <NavLink to={"/newUser"}>
            <button className="userAddButton">Agregar</button>    
            </NavLink>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" className="userShowImg" />
                
                <div className="userShowTopTitle">
                    <span className="userShowUsername">xxx-999</span>
                    <span className="userShowUserTitle">Angus</span>
                </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Detalles</span>´
                    <div className="userShowInfo">
                     <PermIdentityIcon className="userShowIcon"/>
                     <span className="userShowInfoTitle">xxx-999</span>
                    </div>
                    <div className="userShowInfo">
                     <CalendarTodayIcon className="userShowIcon"/>
                     <span className="userShowInfoTitle">06/06/20023</span>
                    </div>
                    <div className="userShowInfo">
                     <ScaleIcon className="userShowIcon"/>
                     <span className="userShowInfoTitle">87kg</span>
                    </div>
                    <div className="userShowInfo">
                     <LocationSearchingIcon className="userShowIcon"/>
                     <span className="userShowInfoTitle">Monte Buey | Cordoba</span>
                    </div>
                    
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Editar</span>
                <form action="" className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label htmlFor="">Peso</label>
                            <input 
                            type="text" 
                            placeholder="Modificar Peso"
                            className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label htmlFor="">Descripcion</label>
                            <input 
                            type="text" 
                            placeholder="Descripción"
                            className="userUpdateInput" />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                         <img  className="userUpdateImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt=""  />
                         <label htmlFor="file" className="userUpdateButtonIcon"> <PublishIcon/></label>
                         <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default User