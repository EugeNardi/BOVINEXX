import { Link } from "react-router-dom";
import "./Product.css";
import PublishIcon from '@mui/icons-material/Publish';
import Chart from "../../components/chart/Chart"
import {productData} from "../../data/data"

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Lote</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Agregar</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Peso Kg" title="Rendimiento Promedio"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src="" alt="" className="productInfoImg" />
                  <span className="productName">Lote</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Numero</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Vacunación </span>
                      <span className="productInfoValue">  Completa</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Cantida</span>
                      <span className="productInfoValue">44nt</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Castración</span>
                      <span className="productInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Numero de Lote</label>
                  <input type="text" placeholder="N°" />
                  <label>Vacunación Completa</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Si</option>
                      <option value="no">No</option>
                  </select>
                  <label>Castrado</label>
                  <select name="active" id="active">
                      <option value="yes">Si</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="" alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <PublishIcon/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Cambiar</button>
              </div>
          </form>
      </div>
    </div>
  );
}