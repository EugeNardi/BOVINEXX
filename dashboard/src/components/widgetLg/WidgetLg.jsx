import "./WidgetLg.css"

const WidgetLg = () => {

  
 // const Button = ({type}) =>{
 // return <button className={"widgetLgButton" + type}>{type}</button>
 //}

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Ultimas Cargas</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Tropa</th>
          <th className="widgetLgTh">Fecha</th>
          <th className="widgetLgTh">Cantidad</th>
          <th className="widgetLgTh">Guía</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">3425</span>
          </td>
          <td className="widgetLgDate">12/06/23</td>
          <td className="widgetLgAmount">12nt</td>
          <td className="widgetLgStatus">
           <button className="widgetLgButton" type="Approved">Ver Guía</button>
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">3426</span>
          </td>
          <td className="widgetLgDate">14/06/23</td>
          <td className="widgetLgAmount">6nt</td>
          <td className="widgetLgStatus">
             <button className="widgetLgButton">Ver Guía</button>
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">3427</span>
          </td>
          <td className="widgetLgDate">16/06/23</td>
          <td className="widgetLgAmount">8nt</td>
          <td className="widgetLgStatus">
           <button className="widgetLgButton" type="Approved">Ver Guía</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default WidgetLg