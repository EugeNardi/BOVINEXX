import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
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
                <NotificationsNoneIcon/>
                <span className="topIconBadge">3</span>
                </div>
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