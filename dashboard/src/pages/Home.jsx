<<<<<<< HEAD
import {userData} from "../data/data.js"
import Sidebar from "../components/Sidebar/Sidebar"
import Topbar from "../components/Topbar"
import Featuredinfo from "../components/Featuredinfo"
import Chart from "../components/Chart"
=======

import { userData } from "../data/data"
import Sidebar from "../components/Sidebar/Sidebar"
import Featuredinfo from "../components/Featuredinfo"
import Chart from "../components/Chart"
import WidgetLg from "../components/WidgetLg"
import WidgetSm from "../components/WidgetSm"
import Topbar from "../components/Topbar"

>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8

const Home = () => {
  return (
    <>
   
    <Topbar/>
    <div className="container">
     <Sidebar/>
     <div className="container-home"> 
      
  
      <div className="home"><Featuredinfo/>
<<<<<<< HEAD
      <Chart data={userData} title={"Aumento del peso Promedio"} grid dataKey={"Peso (Kg)"} />
       <div className="homeWidgets">
       
=======
       <Chart data={userData} title={"Aumento del peso Promedio"} grid dataKey={"Peso (Kg)"} />
       <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8
       </div>
      </div>
  
      </div>
      </div>
    </>
    
    )
}

export default Home

