import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Chart.css"

export default function Chart ({title, data, dataKey, grid}) {

    
  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width={"100%"}  aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='#E71D1D'/>
                <YAxis stroke='#E71D1D'/>
                <Line type="monotone" dataKey={dataKey} stroke='#E71D1D'/>
                <Legend/>
                <Tooltip/>
                {grid && <CartesianGrid strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

