import "./WidgetSm.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
 
const WidgetSm = () => {
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">Tareas Pendientes</span>
        <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Vacunación contra aftosa</span>
            <span className="widgetSmUserTitle">16/06</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            VER
          </button>
        </li>
       <li className="widgetSmListItem">   
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Llenar comederos</span>
            <span className="widgetSmUserTitle">18/06</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Ver
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Pesaje pendiente</span>
            <span className="widgetSmUserTitle">19/06</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Ver
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Sincronización de Celo</span>
            <span className="widgetSmUserTitle">21/06</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Ver
          </button>
        </li>
        </ul>
   </div>
  )
}

export default WidgetSm