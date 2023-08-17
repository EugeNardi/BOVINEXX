import "./NewUser.css"

const NewUser = () => {
  return (
    <>
     <div className="newUser">
      <h1 className="newUserTitle">Nuevo Registro</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Caravana</label>
          <input type="text" placeholder="Caravana" />
        </div>
        <div className="newUserItem">
          <label>Raza</label>
          <input type="text" placeholder="Raza" />
        </div>
        <div className="newUserItem">
          <label>Fecha de Llegada</label>
          <input type="date" placeholder="Fecha de llegada" />
        </div>
        <div className="newUserItem">
          <label>Peso</label>
          <input type="number" placeholder="Peso" />
        </div>
        <div className="newUserItem">
          <label>Sector</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Feed Lot</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Tambo</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Otro</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Vacunación Completa</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Si</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Agregar</button>
      </form>
    </div>
    </>
  )
}

export default NewUser