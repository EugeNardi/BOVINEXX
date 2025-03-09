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
    image: null,
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
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMadre({
      ...madre,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(madre).forEach((key) => {
      formData.append(key, madre[key]);
    });

    try {
      await axios.put(`http://localhost:4000/editmadre/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/madres');
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Madre</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
            }}
          >
            {['rp', 'nacimiento', 'peso', 'pn', 'toro', 'servicio', 'abma', 'tatu'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' || field === 'servicio' ? 'date' : (field === 'peso' || field === 'pn' ? 'number' : 'text')}
                  name={field}
                  value={madre[field]}
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
              <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>Estado</label>
              <select
                name="estado"
                value={madre.estado}
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
                <option value="">Seleccionar estado</option>
                <option value="PREÑADA">PREÑADA</option>
                <option value="VACÍA">VACÍA</option>
              </select>
            </div>
            <div className="form-group image-upload" style={{ gridColumn: 'span 1' }}>
              <label htmlFor="image-upload" style={{ marginBottom: '5px', display: 'block', fontSize: '14px' }}>Imagen</label>
              <div className="image-upload-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                    style={{ width: '130px', height: 'auto', borderRadius: '4px' }}
                  />
                )}
              </div>
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

export default EditMadre;


/*
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
      navigate('/madres');
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Madre</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {['rp', 'nacimiento', 'peso', 'pn', 'estado', 'toro', 'servicio', 'abma', 'tatu'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' || field === 'servicio' ? 'date' : (field === 'peso' || field === 'pn' ? 'number' : 'text')}
                  name={field}
                  value={madre[field]}
                  onChange={handleInputChange}
                  style={{
                    padding: '6px',
                    width: '100%',
                    fontSize: '14px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </div>
            ))}
            <div className="form-group image-upload" style={{ gridColumn: 'span 1' }}>
              <label htmlFor="image-upload" style={{ marginBottom: '5px', display: 'block', fontSize: '14px' }}>Imagen</label>
              <div className="image-upload-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                    style={{ width: '130px', height: 'auto', borderRadius: '4px' }}
                  />
                )}
              </div>
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
                fontSize: '16px'
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

export default EditMadre;


/*
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
      navigate('/madres');
    } catch (error) {
      console.error("Error updating madre", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div
          className="editFormContainer"
          style={{
            marginLeft: "80px",
            width: '100%',
            padding: '20px',
            fontFamily: 'Poppins',
            maxWidth: '1200px',
            margin: 'auto',
          }}
        >
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Editar Madre</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              alignItems: 'start',
            }}
          >
            {['rp', 'nacimiento', 'peso', 'pn', 'estado', 'toro', 'servicio', 'abma', 'tatu'].map((field, index) => (
              <div className="form-group" key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' || field === 'servicio' ? 'date' : (field === 'peso' || field === 'pn' ? 'number' : 'text')}
                  name={field}
                  value={madre[field]}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
            ))}
            <div
              className="form-group image-upload"
              style={{ gridColumn: 'span 3', textAlign: 'center' }}
            >
              <label htmlFor="image-upload" style={{ marginBottom: '10px', display: 'block', fontWeight: 'bold' }}>
                Imagen
              </label>
              <div className="image-upload-wrapper" style={{ display: 'inline-block' }}>
                <label htmlFor="image" className="upload-label" style={{ cursor: 'pointer' }}>
                  <PublishIcon style={{ color: 'gray', fontSize: '30px' }} />
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
                    style={{
                      width: '150px',
                      height: 'auto',
                      marginTop: '10px',
                      borderRadius: '5px',
                    }}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 3',
                width: '200px',
                height: '50px',
                alignSelf: 'center',
                margin: '20px auto 0',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
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

export default EditMadre;


/*
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
        <div className="editFormContainer" style={{ marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Madre</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {['rp', 'nacimiento', 'peso', 'pn', 'estado', 'toro', 'servicio', 'abma', 'tatu'].map((field, index) => (
              <div className="form-group" key={index}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'nacimiento' || field === 'servicio' ? 'date' : (field === 'peso' || field === 'pn' ? 'number' : 'text')}
                  name={field}
                  value={madre[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
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
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 3',
                width: '200px',
                height: '50px',
                alignSelf: 'center',
                marginTop: '20px'
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

export default EditMadre;


/*
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