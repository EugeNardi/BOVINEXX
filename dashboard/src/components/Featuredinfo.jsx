import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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

                <span className="featuredMoney">44</span>
                <span className="featuredMoneyRate">nt<ArrowUpwardIcon className='featuredIcon'/></span>
              
                </div>

               <div> 
 
                <span className="featuredMoney">12</span>
                <span className="featuredMoneyRate">vq<ArrowDownwardIcon className='featuredIconNegative'/></span>
                
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