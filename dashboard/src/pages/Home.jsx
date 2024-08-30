import {userData} from "../data/data.js"
import Sidebar from "../components/Sidebar/Sidebar"
import Topbar from "../components/Topbar"
import Featuredinfo from "../components/Featuredinfo"
import Chart from "../components/Chart"

const Home = () => {
  return (
    <>
   
    <Topbar/>
    <div className="container">
     <Sidebar/>
     <div className="container-home"> 
      
  
      <div className="home"><Featuredinfo/>
      <Chart data={userData} title={"Aumento del peso Promedio"} grid dataKey={"Peso (Kg)"} />
       <div className="homeWidgets">
       
       </div>
      </div>
  
      </div>
      </div>
    </>
    
    )
}

export default Home

