import "./home.css"
import { userData } from "../../data/data"
import Chart from "../../components/chart/Chart"
import Featuredinfo from "../../components/featuredinfo/Featuredinfo"
import WidgetSm from "../../components/widgetSm/WidgetSm"
import WidgetLg from "../../components/WidgetLg/WidgetLg"

const Home = () => {
  return (
    <>
      <div className="home"><Featuredinfo/>
       <Chart data={userData} title={"Aumento del peso Promedio"} grid dataKey={"Peso (Kg)"} />
       <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
       </div>
      </div>
    </>
    
    )
}

export default Home