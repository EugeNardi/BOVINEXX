
import "./Sidebar.css"
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h2 className="sidebarTitle">Menu</h2>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link  className="sideBarNav" to={"/home"}>
                         Inicio
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                    <Link className="sideBarNav" to={"/madres"}>
                         Madres
                     </Link>    
                    </li>
                 
                    <li className="sidebarListItem">
                         <Link className="sideBarNav"  to={"/terneros"}>
                         Terneros
                         </Link>
                    </li>
                  
                   
               
                    <li className="sidebarListItem">
                    <Link className="sideBarNav"  to={"/toros"}>
                         Toros
                         </Link>
                    </li>

                  
                    <li className="sidebarListItem">
                    <Link className="sideBarNav"  to={"/servicio"}>
                         Servicio
                         </Link>
                    </li>
                    <li className="sidebarListItem">
                    <Link className="sideBarNav"  to={"/destete"}>
                         Destete
                         </Link>
                    </li>
                    <li className="sidebarListItem active">
                         <Link className="sideBarNav"  to={"/guias"}>
                         Guías 
                         </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar