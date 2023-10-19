
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
                    <Link className="sideBarNav" to={"/products"}>
                         Lotes
                     </Link>    
                    </li>
                    <li className="sidebarListItem">
                    <Link className="sideBarNav" to={"/addlote"}>
                         Agregar Lote
                     </Link> 
                    </li>

                   
                </ul>
                <h3 className="sidebarTitle">Cambios</h3>
                
                <li className="sidebarListItem">
                    <Link className="sideBarNav"  to={"/add"}>
                         Nuevo Animal
                         </Link>
                    </li>
            
                <h3 className="sidebarTitle">Feed Lot</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                         <Link className="sideBarNav"  to={"/users"}>
                         Animales
                         </Link>
                    </li>
                  
                    <li className="sidebarListItem">
                         Alimentacion
                    </li>
                </ul>
                <h3 className="sidebarTitle">Tambo</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                         Animales
                    </li>
                    <li className="sidebarListItem">
                         Lactancia 
                    </li>
                    <li className="sidebarListItem">
                        Destete
                    </li>
                </ul>
                <h3 className="sidebarTitle">Otros</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                         Guías
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar