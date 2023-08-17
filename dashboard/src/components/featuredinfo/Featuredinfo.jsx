import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./Featuredinfo.css"

const Featuredinfo = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <span className="featuredTitle">Novillos</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">44</span>
                <span className="featuredMoneyRate">nt<ArrowDownwardIcon className='featuredIconNegative'/></span>

            </div>
            <span className="featuredSub">En este establecimiento</span> 

        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Calendario</span>
        </div>
    </div>
  )
}

export default Featuredinfo