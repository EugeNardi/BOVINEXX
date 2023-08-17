import "./NewProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Lote</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label className="addProductFile">Subir Guía</label>
          <input type="file" id="file" style={{display:"none"}} />
        </div>
        <div className="addProductItem">
          <label>Nuemero de lote</label>
          <input type="text" placeholder="Numero de lote" />
        </div>
        <div className="addProductItem">
          <label>Cantidad de cabezas</label>
          <input type="text" placeholder="Cantidad de Cabezas" />
        </div>
        <div className="addProductItem">
          <label>Vacunación Completa</label>
          <select name="active" id="active">
            <option value="yes">Si</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Crear</button>
      </form>
    </div>
  );
}