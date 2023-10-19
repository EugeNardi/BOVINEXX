import "./App.css"
import Home from "./pages/Home"
import ProductList from "./pages/ListaLote"
import Register from "./pages/Register/Register"
import UserList from "./pages/ListaNovillo"
import Login from "./pages/Login/Login"
import {Route, Routes} from "react-router-dom"
import { UserContextProvider } from "./UserContex"
import Agregar from "./components/Agregar"
import AgregarLote from "./components/AgregarLote"

const App = () => {
  
  
  return (
    
    <>     
     

      <UserContextProvider>

      <Routes>    
          <Route exact path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/users" element={<UserList></UserList>}></Route>
          <Route path="/products" element={<ProductList></ProductList>}></Route>
          <Route path="/add" element={<Agregar/>}></Route>
          <Route path="/addlote" element={<AgregarLote/>}></Route>

       
        </Routes>
       
      </UserContextProvider>
      
      
    
      
    </>  
  )
}

export default App
