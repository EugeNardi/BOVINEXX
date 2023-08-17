
import "./Sidebar.css"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h2 className="sidebarTitle">Menu</h2>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                        <NavLink  className="sideBarNav" to={"/"}>
                         Inicio
                        </NavLink>
                    </li>
                    <li className="sidebarListItem">
                    <NavLink className="sideBarNav" to={"/products"}>
                         Lotes
                     </NavLink>    
                    </li>
                   
                </ul>
                <h3 className="sidebarTitle">Feed Lot</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                         <NavLink className="sideBarNav"  to={"/users"}>
                         Animales
                         </NavLink>
                    </li>
                    <li className="sidebarListItem">
                         Pesos
                    </li>
                    <li className="sidebarListItem">
                         Vacunas
                    </li>
                    <li className="sidebarListItem">
                         Alimentacion
                    </li>
                </ul>
                <h3 className="sidebarTitle">Tambo</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                         Animales
                    </li>
                    <li className="sidebarListItem">
                         Destete
                    </li>
                    <li className="sidebarListItem">
                         Lactancia 
                    </li>
                </ul>
              

            </div>
        </div>
    </div>
  )
}

export default Sidebar