import "./App.css"
import Sidebar from "./components/sidebar/Sidebar"
import Topbar from "./components/topbar/Topbar"
import Home from "./pages/home/Home"
import NewProduct from "./pages/newproduct/NewProduct"
import NewUser from "./pages/newuser/NewUser"
import Product from "./pages/product/Product"
import ProductList from "./pages/productlist/ProductList"
import User from "./pages/user/user"
import UserList from "./pages/userlist/UserList"
import {Route, Routes} from "react-router-dom"


const App = () => {
  

  return (
    <>
    <Topbar/>
      <div className="container">
        <Sidebar className="containerSidebar"/>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/users" element={<UserList></UserList>}></Route>
          <Route path="/user/:userId" element={<User></User>}></Route>
          <Route path="/newUser" element={<NewUser></NewUser>}></Route>
          <Route path="/products" element={<ProductList></ProductList>}></Route>
          <Route path="/product/:productsId" element={<Product></Product>}></Route>
          <Route path="/newproduct" element={<NewProduct></NewProduct>}></Route>
        </Routes>
        
      
      </div>
    </>
      
  )
}

export default App
