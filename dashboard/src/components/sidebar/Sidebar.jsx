
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar