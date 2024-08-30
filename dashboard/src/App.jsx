import "./App.css"
import Home from "./pages/Home"
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


const App = () => {
  
  
  return (
    
    <>     
     

      
      <UserContextProvider>

      <Routes>    
          <Route exact path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
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

       
        </Routes>
       
      </UserContextProvider>
        
      
      
    
      
    </>  
  )
}

export default App
