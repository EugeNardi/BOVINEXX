
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then((response) => {
      response.json().then((toros) => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/toros");
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-qr-container">
            <div className="image-container">
              {toros.image && (
                <img
                  src={`http://localhost:4000/${toros.image}`}
                  alt="Toro"
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
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>
          Lista de Toros
        </button>
      </div>
    </>
  );
};

export default Toro;


/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <div className="image-container">
            {toros.image && (
              <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
            )}
          </div>
          <div className="details-container">
            <div className="detail">
              <span className="label">RP:</span>
              <span className="value">{toros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{toros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{toros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacimiento (Kg):</span>
              <span className="value">{toros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{toros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 12 meses (Kg):</span>
              <span className="value">{toros.p12}</span>
            </div>
            <div className="detail">
              <span className="label">Peso 18 meses (Kg):</span>
              <span className="value">{toros.p18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 12 Meses (Cm):</span>
              <span className="value">{toros.ce12}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia 18 Meses (Cm):</span>
              <span className="value">{toros.ce18}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{toros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Inmunizado:</span>
              <span className="value">{toros.inmunizado}</span>
            </div>
          </div>
        </div>
          <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
          <h4>Toro Detalles</h4>
          <div className="info-container">
            <div className="image-container">
              {toros.image && (
                <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
              )}
            </div>
            <div className="details-container">
              <div className="detail">
                <span className="label">RP:</span>
                <span className="value">{toros.rp}</span>
              </div>
              <div className="detail">
                <span className="label">Nacimiento:</span>
                <span className="value">{toros.nacimiento.split('T')[0]}</span>
              </div>
              <div className="detail">
                <span className="label">Padre:</span>
                <span className="value">{toros.padre}</span>
              </div>
              <div className="detail">
                <span className="label">Peso al Nacimiento (Kg):</span>
                <span className="value">{toros.pn}</span>
              </div>
              <div className="detail">
                <span className="label">Peso al Destete (Kg):</span>
                <span className="value">{toros.pd}</span>
              </div>
              <div className="detail">
                <span className="label">Peso 12 meses (Kg):</span>
                <span className="value">{toros.p12}</span>
              </div>
              <div className="detail">
                <span className="label">Peso 18 meses (Kg):</span>
                <span className="value">{toros.p18}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia 12 Meses (Cm):</span>
                <span className="value">{toros.ce12}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia 18 Meses (Cm):</span>
                <span className="value">{toros.ce18}</span>
              </div>
              <div className="detail">
                <span className="label">Circunferencia Escrotal (Cm):</span>
                <span className="value">{toros.ce}</span>
              </div>
              <div className="detail">
                <span className="label">Inmunizado:</span>
                <span className="value">{toros.inmunizado}</span>
              </div>
            </div>
          </div>
          <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
        </div>
      </div>
    </>
  );
}

export default Toro;


/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);
      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>TORO DATOS</h4>
            <div className="content-wrapper">
              <table className="info-table">
                <tbody>
                  <tr>
                    <th>RP</th>
                    <td>{toros.rp}</td>
                  </tr>

                  <tr>
                    <th>Nacimiento</th>
                    <td>{toros.nacimiento.split('T')[0]}</td>
                  </tr>

                  <tr>
                    <th>Padre</th>
                    <td>{toros.padre}</td>
                  </tr>

                  <tr>
                    <th>Peso al Nacimiento (Kg)</th>
                    <td>{toros.pn}</td>
                  </tr>

                  <tr>
                    <th>Peso al Destete (Kg)</th>
                    <td>{toros.pd}</td>
                  </tr>

                  <tr>
                    <th>Peso 12 meses (Kg)</th>
                    <td>{toros.p12}</td>
                  </tr>
                  
                  <tr>
                    <th>Peso 18 meses (Kg)</th>
                    <td>{toros.p18}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia 12 Meses (Cm)</th>
                    <td>{toros.ce12}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia 18 Meses (Cm)</th>
                    <td>{toros.ce18}</td>
                  </tr>

                  <tr>
                    <th>Circunferencia Escrotal (Cm)</th>
                    <td>{toros.ce}</td>
                  </tr>

                  <tr>
                    <th>Inmunizado</th>
                    <td>{toros.inmunizado}</td>
                  </tr>
                </tbody>
              </table>

             
              <div className="image-container">
                {toros.image && (
                  <img src={`http://localhost:4000/${toros.image}`} alt="Toro" className="toro-image" />
                )}
              </div>
            </div>
          </div>
          
          <div className="button-container"></div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;



/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Toro = () => {
  
  const [toros, setToros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/gettoro/${id}`).then(response => {
      response.json().then(toros => {
        setToros(toros);

      });
    });
  }, [id]);

  if (!toros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/toros');
  }

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>TORO DATOS</h4>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>RP</th>
                  <td>{toros.rp}</td>
                </tr>

                <tr>
                  <th>Nacimiento</th>
                  <td>{toros.nacimiento.split('T')[0]}</td>
                </tr>

                <tr>
                  <th>Padre</th>
                  <td>{toros.padre}</td>
                </tr>


                <tr>
                  <th>Peso al Nacimiento (Kg)</th>
                  <td>{toros.pn}</td>
                </tr>

                <tr>
                  <th>Peso al Destete (Kg)</th>
                  <td>{toros.pd}</td>
                </tr>

                <tr>
                  <th>Peso 12 meses (Kg)</th>
                  <td>{toros.p12}</td>
                </tr>

                
                <tr>
                  <th>Peso 18 meses (Kg)</th>
                  <td>{toros.p18}</td>
                </tr>
               
               
                <tr>
                  <th>Circunferencia 12 Meses (Cm)</th>
                  <td>{toros.ce12}</td>
                </tr>

                
                <tr>
                  <th>Circunferencia 18 Meses (Cm)</th>
                  <td>{toros.ce18}</td>
                </tr>

                
                <tr>
                  <th>Circunferencia Escrotal (Cm)</th>
                  <td>{toros.ce}</td>
                </tr>

                
                <tr>
                  <th>Inmunizado</th>
                  <td>{toros.inmunizado}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-container">
          </div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Toros</button>
      </div>
    </>
  );
}

export default Toro;
*/
