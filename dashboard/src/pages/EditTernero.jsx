import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ternero, setTernero] = useState({
    rp: '',
    nacimiento: '',
    genero: '',
    madre: '',
    padre: '',
    pn: '',
    pd: '',
    peso: '',
    ce: '',
    tatu: '',
  });

  useEffect(() => {
    const fetchTernero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        setTernero(response.data);
      } catch (error) {
        console.error("Error fetching ternero data", error);
      }
    };

    fetchTernero();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTernero({
      ...ternero,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, ternero, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/terneros');
    } catch (error) {
      console.error("Error updating ternero", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Ternero</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
            }}
          >
            {['rp', 'nacimiento', 'madre', 'padre', 'pn', 'pd', 'peso', 'ce', 'tatu'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : (field === 'pn' || field === 'pd' || field === 'peso' || field === 'ce') ? 'number' : 'text'}
                  name={field}
                  value={ternero[field]}
                  onChange={handleInputChange}
                  style={{
                    padding: '6px',
                    width: '100%',
                    fontSize: '14px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            ))}
            <div className="form-group">
              <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>Genero</label>
              <select
                name="genero"
                value={ternero.genero}
                onChange={handleInputChange}
                style={{
                  padding: '6px',
                  width: '100%',
                  fontSize: '14px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                }}
              >
                <option value="" disabled>
                  Selecciona el género
                </option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 4',
                width: '250px',
                height: '60px',
                alignSelf: 'center',
                marginTop: '20px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;

/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ternero, setTernero] = useState({
    rp: '',
    nacimiento: '',
    genero: '',
    madre: '',
    padre: '',
    pn: '',
    pd: '',
    peso: '',
    ce: '',
    tatu: '',
  });

  useEffect(() => {
    const fetchTernero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        setTernero(response.data);
      } catch (error) {
        console.error("Error fetching ternero data", error);
      }
    };

    fetchTernero();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTernero({
      ...ternero,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, ternero, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/terneros');
    } catch (error) {
      console.error("Error updating ternero", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Ternero</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
            }}
          >
            {['rp', 'nacimiento', 'genero', 'madre', 'padre', 'pn', 'pd', 'peso', 'ce', 'tatu'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : (field === 'pn' || field === 'pd' || field === 'peso' || field === 'ce') ? 'number' : 'text'}
                  name={field}
                  value={ternero[field]}
                  onChange={handleInputChange}
                  style={{
                    padding: '6px',
                    width: '100%',
                    fontSize: '14px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 4',
                width: '250px',
                height: '60px',
                alignSelf: 'center',
                marginTop: '20px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;

/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ternero, setTernero] = useState({
    rp: '',
    nacimiento: '',
    genero: '',
    madre: '',
    padre: '',
    pn: '',
    pd: '',
    peso: '',
    ce: '',
    tatu: '',
  });

  useEffect(() => {
    const fetchTernero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        setTernero(response.data);
      } catch (error) {
        console.error("Error fetching ternero data", error);
      }
    };

    fetchTernero();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTernero({
      ...ternero,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, ternero, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/terneros');
    } catch (error) {
      console.error("Error updating ternero", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Ternero</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {['rp', 'nacimiento', 'genero', 'madre', 'padre', 'pn (kg)', 'pd (kg)', 'peso (kg)', 'ce (cm)', 'tatu'].map((field, index) => (
              <div className="form-group" key={index} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'nacimiento' ? 'date' : field === 'pn' || field === 'pd' || field === 'peso' ? 'number' : 'text'}
                  name={field}
                  value={ternero[field]}
                  onChange={handleInputChange}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 3',
                width: '200px',
                height: '50px',
                alignSelf: 'center',
                marginTop: '20px',
                border: 'none',
                borderRadius: '10px',
                backgroundColor: '#000',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;


/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";


const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ternero, setTernero] = useState({
    rp: '',
    nacimiento: '',
    genero: '',
    madre: '',
    padre: '',
    pn: '',
    pd: '',
    peso: '',
    ce: '',
    tatu: '',
    
  });



  useEffect(() => {
    const fetchTernero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        setTernero(response.data);
        
      } catch (error) {
        console.error("Error fetching ternero data", error);
      }
    };

    fetchTernero();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTernero({
      ...ternero,
      [name]: value
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, ternero, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/terneros'); // Redirect after editing
    } catch (error) {
      console.error("Error updating ternero", error);
    }
  };
  
  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Ternero</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label>RP</label>
              <input type="text" name="rp" value={ternero.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={ternero.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Género</label>
              <input type="text" name="genero" value={ternero.genero} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Madre</label>
              <input type="text" name="madre" value={ternero.madre} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Padre</label>
              <input type="text" name="padre" value={ternero.padre} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PN</label>
              <input type="number" name="pn" value={ternero.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PD</label>
              <input type="number" name="pd" value={ternero.pd} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input type="number" name="peso" value={ternero.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>CE</label>
              <input type="text" name="ce" value={ternero.ce} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tatu</label>
              <input type="text" name="tatu" value={ternero.tatu} onChange={handleInputChange} />
            </div>
          
            <button type="submit" className="button" style={{ gridColumn: 'span 3', width: '200px', height: '50px', alignSelf: 'center', marginTop: '20px' }}>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;


/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ternero, setTernero] = useState({
    rp: '',
    nacimiento: '',
    genero: '',
    madre: '',
    padre: '',
    pn: '',
    pd: '',
    peso: '',
    ce: '',
    tatu: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchTernero = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        setTernero(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching ternero data", error);
      }
    };

    fetchTernero();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTernero({
      ...ternero,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTernero({
      ...ternero,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(ternero).forEach(key => {
      formData.append(key, ternero[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/terneros');
    } catch (error) {
      console.error("Error updating ternero", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '400%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '20px', width: '90%' }}>
          <h2>Editar Ternero</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>RP</label>
              <input type="text" name="rp" value={ternero.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={ternero.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Género</label>
              <input type="text" name="genero" value={ternero.genero} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Madre</label>
              <input type="text" name="madre" value={ternero.madre} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Padre</label>
              <input type="text" name="padre" value={ternero.padre} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>PN</label>
              <input type="number" name="pn" value={ternero.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>PD</label>
              <input type="number" name="pd" value={ternero.pd} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Peso</label>
              <input type="number" name="peso" value={ternero.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>CE</label>
              <input type="text" name="ce" value={ternero.ce} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Tatu</label>
              <input type="text" name="tatu" value={ternero.tatu} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Imagen</label>
              <input type='file' name="image" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '500px', height: '300px' }} />}
            </div>
            <button type="submit" className="button" style={{ flex: '1', width: "150px", height: "50px", marginTop: '20px' }}>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;






/*
import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditTernero = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [madre, setMadre] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [peso, setPeso] = useState("");
  const [ce, setCe] = useState("");
  const [tatu, setTatu] = useState("");

  useEffect(() => {
    const fetchTerneroData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getternero/${id}`);
        const ternero = response.data;
        setRp(ternero.rp);
        setNacimiento(ternero.nacimiento);
        setGenero(ternero.genero);
        setMadre(ternero.madre);
        setPadre(ternero.padre);
        setPn(ternero.pn);
        setPd(ternero.pd);
        setPeso(ternero.peso);
        setCe(ternero.ce);
        setTatu(ternero.tatu);
      } catch (error) {
        console.error("Error fetching ternero data:", error);
      }
    };
    
    fetchTerneroData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      rp,
      nacimiento,
      genero,
      madre,
      padre,
      pn,
      pd,
      peso,
      ce,
      tatu,
    };

    try {
      await axios.put(`http://localhost:4000/editternero/${id}`, updatedData);
      // Handle success, maybe redirect or show a success message
      navigate('/terneros'); // Redirige a la página de listado de madres después de la edición
    } catch (error) {
      console.error("There was an error updating the ternero!", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="editForm">
          <form onSubmit={handleUpdate}>
            <div>
              <label>RP:</label>
              <input type="text" value={rp} onChange={(e) => setRp(e.target.value)} />
            </div>
            <div>
              <label>Nacimiento:</label>
              <input type="date" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} />
            </div>
            <div>
              <label>Género:</label>
              <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} />
            </div>
            <div>
              <label>Madre:</label>
              <input type="text" value={madre} onChange={(e) => setMadre(e.target.value)} />
            </div>
            <div>
              <label>Padre:</label>
              <input type="text" value={padre} onChange={(e) => setPadre(e.target.value)} />
            </div>
            <div>
              <label>PN:</label>
              <input type="text" value={pn} onChange={(e) => setPn(e.target.value)} />
            </div>
            <div>
              <label>PD:</label>
              <input type="text" value={pd} onChange={(e) => setPd(e.target.value)} />
            </div>
            <div>
              <label>Peso:</label>
              <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} />
            </div>
            <div>
              <label>CE:</label>
              <input type="text" value={ce} onChange={(e) => setCe(e.target.value)} />
            </div>
            <div>
              <label>Tatu:</label>
              <input type="text" value={tatu} onChange={(e) => setTatu(e.target.value)} />
            </div>
            <button type="submit">Actualizar Ternero</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTernero;
*/