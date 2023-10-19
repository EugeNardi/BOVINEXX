
import { userData } from "../data/data"
import Sidebar from "../components/Sidebar/Sidebar"
import Featuredinfo from "../components/Featuredinfo"
import Chart from "../components/Chart"
import WidgetLg from "../components/WidgetLg"
import WidgetSm from "../components/WidgetSm"
import Topbar from "../components/Topbar"


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
        <WidgetSm/>
        <WidgetLg/>
       </div>
      </div>
  
      </div>
      </div>
    </>
    
    )
}

export default Home

