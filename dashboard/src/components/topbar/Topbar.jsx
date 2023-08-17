import "./Topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
//import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';

const Topbar = () => {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topbarLeft">
                <span className="logo">Bovinex</span>
            </div>
            <div className="topbarRight">
                <div className="topbarIconsContainer">
                <NotificationsNoneIcon/>
                <span className="topIconBadge">3</span>
                </div>
                <div className="topbarIconsContainer">
                <SettingsIcon/>
                </div>
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar