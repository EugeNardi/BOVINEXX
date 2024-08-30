import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Fuaturedinfo.css'; // Import your custom CSS

const Featuredinfo = () => {
  const [ternerosCount, setTernerosCount] = useState(0);
  const [torosCount, setTorosCount] = useState(0);
  const [madresCount, setMadresCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [ternerosResponse, torosResponse, madresResponse] = await Promise.all([
          fetch('http://localhost:4000/getternero'),
          fetch('http://localhost:4000/gettoro'),
          fetch('http://localhost:4000/getmadre')
        ]);

        const [ternerosData, torosData, madresData] = await Promise.all([
          ternerosResponse.json(),
          torosResponse.json(),
          madresResponse.json()
        ]);

        setTernerosCount(ternerosData.length);
        setTorosCount(torosData.length);
        setMadresCount(madresData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Cantidad de Ganado</span>
        <div className="featuredMoneyContainer">
          <div>
            <span className="featuredMoney">{ternerosCount}</span>
            <span className="featuredMoneyRate">TERNEROS</span>
          </div>

          <div>
            <span className="featuredMoney">{madresCount}</span>
            <span className="featuredMoneyRate">VACAS</span>
          </div>

          <div>
            <span className="featuredMoney">{torosCount}</span>
            <span className="featuredMoneyRate">TOROS</span>
          </div>
        </div>
        <span className="featuredSub">En este establecimiento</span>
      </div>
      <div className="featuredItem">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="scaledCalendar" />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Featuredinfo;

/*
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



const Featuredinfo = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Cantidad de Ganado</span>
            <div className="featuredMoneyContainer">
                <div>

                <span className="featuredMoney">10</span>
                <span className="featuredMoneyRate">VA</span>
              
                </div>

                <div>

                <span className="featuredMoney">44</span>
                <span className="featuredMoneyRate">TO</span>

                </div>

               <div> 
 
                <span className="featuredMoney">12</span>
                <span className="featuredMoneyRate">TE</span>
                
                
               </div>


            </div>
            <span className="featuredSub">En este establecimiento</span> 

        </div>
        <div className="featuredItem">
      
           
            <div className="calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
            </LocalizationProvider>
            </div>
        </div>
    </div>
  )
}

export default Featuredinfo
*/