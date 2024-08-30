import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";
import QRCode from "qrcode.react";


const Ternero = () => {
  const [terneros, setTerneros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getternero/${id}`).then(response => {
      response.json().then(terneros => {
        setTerneros(terneros);
      });
    });
  }, [id]);

  if (!terneros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/terneros');
  }

  return (
    <> 
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">
        <div className="image-qr-container">
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
              <span className="value">{terneros.rp}</span>
            </div>
            <div className="detail">
              <span className="label">Nacimiento:</span>
              <span className="value">{terneros.nacimiento.split('T')[0]}</span>
            </div>
            <div className="detail">
              <span className="label">Madre:</span>
              <span className="value">{terneros.madre}</span>
            </div>
            <div className="detail">
              <span className="label">Padre:</span>
              <span className="value">{terneros.padre}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Nacer (Kg):</span>
              <span className="value">{terneros.pn}</span>
            </div>
            <div className="detail">
              <span className="label">Peso al Destete (Kg):</span>
              <span className="value">{terneros.pd}</span>
            </div>
            <div className="detail">
              <span className="label">Peso (Kg):</span>
              <span className="value">{terneros.peso}</span>
            </div>
            <div className="detail">
              <span className="label">Circunferencia Escrotal (Cm):</span>
              <span className="value">{terneros.ce}</span>
            </div>
            <div className="detail">
              <span className="label">Tatu:</span>
              <span className="value">{terneros.tatu}</span>
            </div>
          </div>
        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Terneros</button>
      </div>
    </>
  );
}

export default Ternero;




/*
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TTabla.css";

const Ternero = () => {
  
  const [terneros, setTerneros] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/getternero/${id}`).then(response => {
      response.json().then(terneros => {
        setTerneros(terneros);

      });
    });
  }, [id]);

  if (!terneros) return "";

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/terneros');
  }

  return (
    <> 
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="box">

          <div className="info-container">
            <h4>TERNERO DATOS</h4>
            <table className="info-table">
              <tbody>
                <tr>
                  <th>RP </th>
                  <td>{terneros.rp}</td>
                </tr>

                <tr>
                  <th>Nacimiento</th>
                  <td>{terneros.nacimiento.split('T')[0]}</td>
                </tr>

                <tr>
                  <th>Madre</th>
                  <td>{terneros.madre}</td>
                </tr>

                <tr>
                  <th>Padre</th>
                  <td>{terneros.padre}</td>
                </tr>

                <tr>
                  <th>Peso al Nacer (Kg)</th>
                  <td>{terneros.pn}</td>
                </tr>

                <tr>
                  <th>Peso al Destete (Kg)</th>
                  <td>{terneros.pd}</td>
                </tr>

                
                <tr>
                  <th>Peso (Kg)</th>
                  <td>{terneros.peso}</td>
                </tr>

                
                <tr>
                  <th>Peso al Destete (Kg)</th>
                  <td>{terneros.pd}</td>
                </tr>


                <tr>
                  <th>Circunferencia Escrotal (Kg)</th>
                  <td>{terneros.ce}</td>
                </tr>

                
                <tr>
                  <th>Tatu</th>
                  <td>{terneros.tatu}</td>
                </tr>
               
              </tbody>
            </table>
          </div>
          <div className="button-container">
          </div>

        </div>
        <button className="historypush" onClick={handleNavigate}>Lista de Terneros</button>
      </div>
    </>
  );
}

export default Ternero;
*/
