<<<<<<< HEAD
import Partos from "../pages/Partos";
=======
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
>>>>>>> 6ed720162ad08a400a54cffea54f0764e68f48a8


export default function Chart () {

    
  return (
    <div className="chart">
      <Partos/>
    </div>
  )
}


/*
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  <h3 className="chartTitle">Peso Promedio</h3>
        <ResponsiveContainer width={"100%"}  aspect={4 / 1}>
            <LineChart data={data}>
                <XAxis dataKey="name" stroke='black'/>
                <YAxis stroke='black'/>
                <Line type="monotone" dataKey={dataKey} stroke='black'/>
                <Legend/>
                <Tooltip/>
                {grid && <CartesianGrid strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
*/ 
