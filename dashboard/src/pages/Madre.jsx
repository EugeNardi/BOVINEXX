import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import QRCode from "qrcode.react";
import "./TTabla.css";

const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then((allTerneros) => {
          const filteredTerneros = allTerneros.filter(ternero => ternero.madre === madreInfo.rp);
          setTerneros(filteredTerneros);
        });
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-qr-container">
            <div className="image-container">
              {madreInfo.image && (
                <img
                  src={`http://localhost:4000/${madreInfo.image}`}
                  alt="Madre"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP de la Madre:</span>
              <span className="value">{madreInfo.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{madreInfo.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (kg):</span>
              <span className="value">{madreInfo.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer:</span>
              <span className="value">{madreInfo.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Estado:</span>
              <span className="value">{madreInfo.estado}</span>
            </div>
            <div className="detail">
              <span className="label">Toro:</span>
              <span className="value">{madreInfo.toro}</span>
            </div>
            <div className="detail">
              <span className="label">Servicio:</span>
              <span className="value">{madreInfo.servicio.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Abuela Materna:</span>
              <span className="value">{madreInfo.abma}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{madreInfo.tatu}</span>
            </div>
            {terneros.map(ternero => (
              <div className="detail" key={ternero._id}>
                <span className="label">RP del ternero:</span>
                <Link to={`/ternero/${ternero._id}`} className="value">
                  {ternero.rp}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>
          Lista de Madres
        </button>
      </div>
    </>
  );
}

export default Madre;

/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import QRCode from "qrcode.react";
import "./TTabla.css";

const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-qr-container">
            <div className="image-container">
              {madreInfo.image && (
                <img
                  src={`http://localhost:4000/${madreInfo.image}`}
                  alt="Madre"
                  className="toro-image"
                />
              )}
            </div>
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP de la Madre:</span>
              <span className="value">{madreInfo.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{madreInfo.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (kg):</span>
              <span className="value">{madreInfo.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer:</span>
              <span className="value">{madreInfo.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Estado:</span>
              <span className="value">{madreInfo.estado}</span>
            </div>
            <div className="detail">
              <span className="label">Toro:</span>
              <span className="value">{madreInfo.toro}</span>
            </div>
            <div className="detail">
              <span className="label">Servicio:</span>
              <span className="value">{madreInfo.servicio.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Abuela Materna:</span>
              <span className="value">{madreInfo.abma}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{madreInfo.tatu}</span>
            </div>
            {terneros.map(ternero => (
              <div className="detail" key={ternero._id}>
                <span className="label">RP del Ternero:</span>
                <span className="value">{ternero.rp}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>
          Lista de Madres
        </button>
      </div>
    </>
  );
}

export default Madre;



/*

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import "./TTabla.css";
import QRCode from "qrcode.react";

const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-container">
            <img 
              src={madreInfo.image ? `http://localhost:4000/${madreInfo.image}` : 'path/to/placeholder.jpg'} 
              alt="Madre" 
              className="toro-image" 
              onError={(e) => e.target.src = 'path/to/placeholder.jpg'} // Fallback for broken images
            />
            <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP de la Madre:</span>
              <span className="value">{madreInfo.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{madreInfo.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (kg):</span>
              <span className="value">{madreInfo.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer:</span>
              <span className="value">{madreInfo.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Estado:</span>
              <span className="value">{madreInfo.estado}</span>
            </div>
            <div className="detail">
              <span className="label">Toro:</span>
              <span className="value">{madreInfo.toro}</span>
            </div>
            <div className="detail">
              <span className="label">Servicio:</span>
              <span className="value">{madreInfo.servicio.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Abuela Materna:</span>
              <span className="value">{madreInfo.abma}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{madreInfo.tatu}</span>
            </div>
            {terneros.map(ternero => (
              <div className="detail" key={ternero._id}>
                <span className="label">RP del Ternero:</span>
                <span className="value">{ternero.rp}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Madres</button>
      </div>
    </>
  );
}

export default Madre;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import "./TTabla.css";
import QRCode from "qrcode.react";


const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-container">
            <img 
              src={madreInfo.image ? `http://localhost:4000/${madreInfo.image}` : 'path/to/placeholder.jpg'} 
              alt="Madre" 
              className="toro-image" 
              onError={(e) => e.target.src = 'path/to/placeholder.jpg'} // Fallback for broken images
            />
              <div className="qr-code-container">
              <QRCode
                value={window.location.href}
                size={190}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP de la Madre:</span>
              <span className="value">{madreInfo.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{madreInfo.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (kg):</span>
              <span className="value">{madreInfo.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer:</span>
              <span className="value">{madreInfo.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Estado:</span>
              <span className="value">{madreInfo.estado}</span>
            </div>
            <div className="detail">
              <span className="label">Toro:</span>
              <span className="value">{madreInfo.toro}</span>
            </div>
            <div className="detail">
              <span className="label">Servicio:</span>
              <span className="value">{madreInfo.servicio.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Abuela Materna:</span>
              <span className="value">{madreInfo.abma}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{madreInfo.tatu}</span>
            </div>
            {terneros.map(ternero => (
              <div className="detail" key={ternero._id}>
                <span className="label">RP del Ternero:</span>
                <span className="value">{ternero.rp}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Madres</button>
      </div>
    </>
  );
}

export default Madre;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import "./TTabla.css";

const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-container">
            
             <img src={`http://localhost:4000/${madreInfo.image}`} alt="Madre" className="madre-image" /> 
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP de la Madre:</span>
              <span className="value">{madreInfo.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{madreInfo.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (kg):</span>
              <span className="value">{madreInfo.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer:</span>
              <span className="value">{madreInfo.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Estado:</span>
              <span className="value">{madreInfo.estado}</span>
            </div>
            <div className="detail">
              <span className="label">Toro:</span>
              <span className="value">{madreInfo.toro}</span>
            </div>
            <div className="detail">
              <span className="label">Servicio:</span>
              <span className="value">{madreInfo.servicio.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Abuela Materna:</span>
              <span className="value">{madreInfo.abma}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{madreInfo.tatu}</span>
            </div>
            {terneros.map(ternero => (
              <div className="detail" key={ternero._id}>
                <span className="label">RP del Ternero:</span>
                <span className="value">{ternero.rp}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Madres</button>
      </div>
    </>
  );
}

export default Madre;




/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';
import "./TTabla.css";

const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>MADRE DATOS</h4>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>RP de la Madre</th>
                  <td>{madreInfo.rp}</td>
                </tr>

                <tr>
                  <th>Nacimiento</th>
                  <td>{madreInfo.nacimiento.split('T')[0]}</td>
                </tr>

                <tr>
                  <th>Peso (kg)</th>
                  <td>{madreInfo.peso}</td>
                </tr>

                <tr>
                  <th>Peso al Nacer</th>
                  <td>{madreInfo.pn}</td>
                </tr>

                <tr>
                  <th>Estado</th>
                  <td>{madreInfo.estado}</td>
                </tr>


                <tr>
                  <th>Toro</th>
                  <td>{madreInfo.toro}</td>
                </tr>

                <tr>
                  <th>Servicio</th>
                  <td>{madreInfo.servicio.split('T')[0]}</td>
                </tr>

                <tr>
                  <th>Abuela Materna </th>
                  <td>{madreInfo.abma}</td>
                </tr>
                

                <tr>
                  <th>Tatu</th>
                  <td>{madreInfo.tatu}</td>
                </tr>

                {terneros.map(ternero => (
                  <tr key={ternero._id}>
                    <th>RP del Ternero</th>
                    <td>{ternero.rp}</td>
                  </tr>


                ))}
              </tbody>
            </table>
          </div>
          <div className="button-container">
          </div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Madres</button>
      </div>
    </>
  );
}

export default Madre;






/*import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../components/services/DataServices';


const Madre = () => {
  const [madreInfo, setMadreInfo] = useState(null);
  const [terneros, setTerneros] = useState([]);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getmadre/${id}`).then(response => {
      response.json().then(madreInfo => {
        setMadreInfo(madreInfo);
        fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
      });
    });
  }, [id]);

  if (!madreInfo) return "";

  function historypush(e) {
    e.preventDefault();
    history('/madres');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

        <div className="info-container">
          <h4>Información del animal</h4>
          <table className="info-table">
            <thead>
              <tr>
                <th>RP de la Madre</th>
                <th>Estado</th>
                <th>Toro</th>
                <th>Servicio</th>
                <th>Tatu</th>
                <th>RP del Ternero</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{madreInfo.rp}</td>
                <td>{madreInfo.estado}</td>
                <td>{madreInfo.toro}</td>
                <td>{madreInfo.servicio.split('T')[0]}</td>
                <td>{madreInfo.tatu}</td>
                
              </tr>
              {terneros.map(ternero => (
                <tr key={ternero._id}>
                  <td colSpan={5}></td> {}
                  <td>{ternero.rp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <button className="historypush" onClick={historypush}>Lista de Madres</button>
      </div>

    </>
  );
}

export default Madre;


*/
/*
import Sidebar from "../components/Sidebar/Sidebar"
import Topbar from "../components/Topbar"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTernerosByMadreRP } from '../';

const Madre = () => {
    const [madreInfo, setMadreInfo] = useState(null);
    const history = useNavigate();
    const [terneros, setTerneros] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        fetch(`http://localhost:4000/getlote/${id}`).then(response => {
            response.json().then(madreInfo => {
                setMadreInfo(madreInfo);      
                fetchTernerosByMadreRP(madreInfo.rp).then(setTerneros);
            })
        })

    },[id])

    if(!madreInfo) return "";


    function historypush(e) {
        e.preventDefault();

        history('/madres')}

        ;

  return (
    <>
    <Topbar/>
    <div className="container">
        <Sidebar/>
        <div className="novillo-info">
            <h4>RP: {madreInfo.rp}</h4>
            <h4>Estado: {madreInfo.estado}</h4>
            <h4>Toro: {madreInfo.toro}</h4>
            <h4>Servicio: {madreInfo.servicio}</h4>
            <h4>Tatu: {madreInfo.tatu}</h4>
         
            
        </div>
        <button className="historypush" onClick={historypush}>Lista de Madres</button>
    </div>
    </>
  )
}

export default Madre
*/