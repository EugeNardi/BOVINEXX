import "./App.css"
import Home from "./pages/Home"
<<<<<<< HEAD
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import ListaMadre from "./pages/ListaMadre"
import ListaTernero  from "./pages/ListaTernero"
import {Route, Routes} from "react-router-dom"
import { UserContextProvider } from "./UserContex"
import Vacunacion from "./pages/Vacunacion"
import ListaToro from "./pages/ListaToro" 
import Destete from "./pages/Destete"
import Guias from "./pages/Guias"
import Servicio from "./pages/Servicio"
import Ternero from "./pages/Ternero"
import Madre from "./pages/Madre"
import Toro from "./pages/Toro"
import EditMadre from "./pages/EditMadre"
import EditTernero from "./pages/EditTernero"
import EditToro from "./pages/EditToro"

=======
import ProductList from "./pages/ListaLote"
import Register from "./pages/Register/Register"
import UserList from "./pages/ListaNovillo"
import Login from "./pages/Login/Login"
import {Route, Routes} from "react-router-dom"
import { UserContextProvider } from "./UserContex"
import Agregar from "./components/Agregar"
import AgregarLote from "./components/AgregarLote"
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8

const App = () => {
  
  
  return (
    
    <>     
     

<<<<<<< HEAD
      
=======
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
      <UserContextProvider>

      <Routes>    
          <Route exact path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
<<<<<<< HEAD
          <Route path="/terneros" element={<ListaTernero></ListaTernero>}></Route>
          <Route path="/ternero/:id" element={<Ternero/>}></Route>
          <Route path="/ternero/edit/:id" element={<EditTernero/>}></Route>
          <Route path="/madres" element={<ListaMadre></ListaMadre>}></Route>
          <Route path="/madre/:id" element={<Madre/>}></Route>
          <Route path="/madre/edit/:id" element={<EditMadre/>}></Route>
          <Route path="/vacunacion" element={<Vacunacion/>}></Route>
          <Route path="/toros" element={<ListaToro/>}></Route>
          <Route path="/toro/:id" element={<Toro/>}></Route>
          <Route path="/toro/edit/:id" element={<EditToro/>}></Route>
          <Route path="/destete" element={<Destete/>}></Route>
          <Route path="/servicio" element={<Servicio/>}></Route>
          <Route path="/guias" element={<Guias/>}></Route>
=======
          <Route path="/users" element={<UserList></UserList>}></Route>
          <Route path="/products" element={<ProductList></ProductList>}></Route>
          <Route path="/add" element={<Agregar/>}></Route>
          <Route path="/addlote" element={<AgregarLote/>}></Route>
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8

       
        </Routes>
       
      </UserContextProvider>
<<<<<<< HEAD
        
=======
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
      
      
    
      
    </>  
  )
}

export default App
