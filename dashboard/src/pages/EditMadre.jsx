
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import PublishIcon from '@mui/icons-material/Publish';

const EditMadre = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [madre, setMadre] = useState({
    rp: '',
    nacimiento: '',
    peso: '',
    pn: '',
    estado: '',
    toro: '',
    servicio: '',
    abma: '',
    tatu: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMadre = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getmadre/${id}`);
        setMadre(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching madre data", error);
      }
    };

    fetchMadre();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMadre({
      ...madre,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMadre({
      ...madre,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(madre).forEach(key => {
      formData.append(key, madre[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editmadre/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/madres'); // Redirect to the madres list page after editing
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft:"80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Madre</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label >RP</label>
              <input type="text" name="rp" value={madre.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={madre.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input type="number" name="peso" value={madre.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PN</label>
              <input type="number" name="pn" value={madre.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input type="text" name="estado" value={madre.estado} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Toro</label>
              <input type="text" name="toro" value={madre.toro} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Servicio</label>
              <input type="date" name="servicio" value={madre.servicio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>ABMA</label>
              <input type="text" name="abma" value={madre.abma} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tatu</label>
              <input type="text" name="tatu" value={madre.tatu} onChange={handleInputChange} />
            </div>
            <div className="form-group image-upload">
              <label htmlFor="image-upload">Imagen</label>
              <div className="image-upload-wrapper">
                <label htmlFor="image" className="upload-label">
                  <PublishIcon style={{ color: 'gray', cursor: 'pointer' }} />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                  />
                )}
              </div>
            </div>
            <button type="submit" className="button" style={{ gridColumn: 'span 3', width: '200px', height: '50px', alignSelf: 'center', marginTop: '20px' }}>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMadre;


/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditMadre = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [madre, setMadre] = useState({
    rp: '',
    nacimiento: '',
    peso: '',
    pn: '',
    estado: '',
    toro: '',
    servicio: '',
    abma: '',
    tatu: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMadre = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getmadre/${id}`);
        setMadre(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching madre data", error);
      }
    };

    fetchMadre();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMadre({
      ...madre,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMadre({
      ...madre,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(madre).forEach(key => {
      formData.append(key, madre[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editmadre/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/madres'); // Redirect to the madres list page after editing
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '40px', width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Madre</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label>RP</label>
              <input type="text" name="rp" value={madre.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={madre.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input type="number" name="peso" value={madre.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PN</label>
              <input type="number" name="pn" value={madre.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input type="text" name="estado" value={madre.estado} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Toro</label>
              <input type="text" name="toro" value={madre.toro} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Servicio</label>
              <input type="date" name="servicio" value={madre.servicio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>ABMA</label>
              <input type="text" name="abma" value={madre.abma} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tatu</label>
              <input type="text" name="tatu" value={madre.tatu} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input type="file" name="image" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />}
            </div>
            <button type="submit" className="button" style={{ gridColumn: 'span 3', width: '200px', height: '50px', alignSelf: 'center', marginTop: '20px' }}>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMadre;






/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditMadre = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [madre, setMadre] = useState({
    rp: '',
    nacimiento: '',
    peso: '',
    pn: '',
    estado: '',
    toro: '',
    servicio: '',
    abma: '',
    tatu: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMadre = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getmadre/${id}`);
        setMadre(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching madre data", error);
      }
    };

    fetchMadre();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMadre({
      ...madre,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMadre({
      ...madre,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(madre).forEach(key => {
      formData.append(key, madre[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editmadre/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/madres'); // Redirige a la página de listado de madres después de la edición
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '400%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '20px', width: '90%' }}>
          <h2>Editar Madre</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>RP</label>
              <input type="text" name="rp" value={madre.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={madre.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Peso</label>
              <input type="number" name="peso" value={madre.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>PN</label>
              <input type="number" name="pn" value={madre.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Estado</label>
              <input type="text" name="estado" value={madre.estado} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Toro</label>
              <input type="text" name="toro" value={madre.toro} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Servicio</label>
              <input type="date" name="servicio" value={madre.servicio} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>ABMA</label>
              <input type="text" name="abma" value={madre.abma} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Tatu</label>
              <input type="text" name="tatu" value={madre.tatu} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Imagen</label>
              <input  type='file'   name="image" onChange={handleImageChange}/>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '500px', height: '300px' }} />}
            </div>
            <button type="submit" className="button" style={{ flex: '1 ',width:"150px", height:"50px", marginTop: '20px' }}>Guardar </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMadre;



/*
import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditMadre = () => {
  const { id } = useParams();
  const navigate = useNavigate();  
  const [madre, setMadre] = useState({
    rp: '',
    nacimiento: '',
    peso: '',
    pn: '',
    estado: '',
    toro: '',
    servicio: '',
    abma: '',
    tatu: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMadre = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getmadre/${id}`);
        setMadre(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching madre data", error);
      }
    };

    fetchMadre();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMadre({
      ...madre,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMadre({
      ...madre,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(madre).forEach(key => {
      formData.append(key, madre[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editmadre/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/madres'); // Redirige a la página de listado de madres después de la edición
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="editFormContainer">
          <h2>Edit Madre</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>RP</label>
              <input type="text" name="rp" value={madre.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={madre.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input type="number" name="peso" value={madre.peso} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PN</label>
              <input type="number" name="pn" value={madre.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <input type="text" name="estado" value={madre.estado} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Toro</label>
              <input type="text" name="toro" value={madre.toro} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Servicio</label>
              <input type="text" name="servicio" value={madre.servicio} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>ABMA</label>
              <input type="text" name="abma" value={madre.abma} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Tatu</label>
              <input type="text" name="tatu" value={madre.tatu} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <input type="file" name="image" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMadre;
*/