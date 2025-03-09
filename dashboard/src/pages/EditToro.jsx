import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import PublishIcon from '@mui/icons-material/Publish';

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {['rp', 'nacimiento', 'padre', "madre", 'inmunizado', 'pn', 'pd', 'p12', 'p18', 'ce12', 'ce18', 'ce', ].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '8px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : 'text'}
                  name={field}
                  value={toro[field]}
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

export default EditToro;

/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import PublishIcon from '@mui/icons-material/Publish';

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '15px' }}>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {['rp', 'nacimiento', 'padre', 'pn', 'pd', 'p12', 'p18', 'ce12', 'ce18', 'ce', 'inmunizado'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '5px', display: 'block', fontSize: '14px' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : 'text'}
                  name={field}
                  value={toro[field]}
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
                    style={{ width: '80px', height: 'auto', borderRadius: '4px' }}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="button"
              style={{
                gridColumn: 'span 4',
                width: '150px',
                height: '40px',
                alignSelf: 'center',
                marginTop: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
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

export default EditToro;

/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import PublishIcon from '@mui/icons-material/Publish';

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft: "80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {['rp', 'nacimiento', 'padre', 'pn', 'pd', 'p12', 'p18', 'ce12', 'ce18', 'ce', 'inmunizado'].map((field, index) => (
              <div className="form-group" key={index}>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : 'text'}
                  name={field}
                  value={toro[field]}
                  onChange={handleInputChange}
                  style={{ padding: '8px', width: '80%' }}
                />
              </div>
            ))}
            <div className="form-group image-upload" style={{ gridColumn: 'span 1' }}>
              <label htmlFor="image-upload" style={{ marginBottom: '10px', display: 'block' }}>Imagen</label>
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
                    style={{ width: '100px', height: 'auto', borderRadius: '4px' }}
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

export default EditToro;



/*

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import PublishIcon from '@mui/icons-material/Publish';

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '100%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '0px', marginLeft:"80px", width: '100%' }}>
          <h2 style={{ marginBottom: '20px' }}>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {['rp', 'nacimiento', 'padre', 'pn', 'pd', 'p12', 'p18', 'ce12', 'ce18', 'ce', 'inmunizado'].map((field, index) => (
              <div className="form-group" key={index}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'nacimiento' ? 'date' : 'text'}
                  name={field}
                  value={toro[field]}
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
              
             
              </div>
            
              
             
            </div>
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
                style={{ width: '100%', height: 'auto', marginTop: '0px' }}
                />)}
            <button type="submit" className="button" style={{ gridColumn: 'span 2', width: '200px', height: '50px', alignSelf: 'center', marginTop: '0px', margin:"100px" }}>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditToro;



/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '400%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '20px', width: '90%' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontFamily: 'Poppins' }}>
            {['rp', 'nacimiento', 'padre', 'pn', 'pd', 'p12', 'p18', 'ce12', 'ce18', 'ce', 'inmunizado'].map((field, index) => (
              <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }} key={index}>
                <label style={{ marginBottom: '10px', display: 'block' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'nacimiento' ? 'date' : 'text'}
                  name={field}
                  value={toro[field]}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontFamily: 'Poppins'
                  }}
                />
              </div>
            ))}
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label style={{ marginBottom: '10px', display: 'block' }}>Imagen</label>
              <input
                type='file'
                name="image"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'Poppins'
                }}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '500px', height: '300px' }} />}
            </div>
            <button
              type="submit"
              className="button"
              style={{
                flex: '1',
                width: "150px",
                height: "50px",
                marginTop: '20px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Poppins'
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

export default EditToro;


/*
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditToro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toro, setToro] = useState({
    rp: '',
    nacimiento: '',
    padre: '',
    pn: '',
    pd: '',
    p12: '',
    p18: '',
    ce12: '',
    ce18: '',
    ce: '',
    inmunizado: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchToro = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/gettoro/${id}`);
        setToro(response.data);
        setImagePreview(`http://localhost:4000/${response.data.image}`);
      } catch (error) {
        console.error("Error fetching toro data", error);
      }
    };

    fetchToro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToro({
      ...toro,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setToro({
      ...toro,
      image: file
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(toro).forEach(key => {
      formData.append(key, toro[key]);
    });

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/toros');
    } catch (error) {
      console.error("Error updating toro", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="container" style={{ width: '400%' }}>
        <Sidebar />
        <div className="editFormContainer" style={{ margin: '20px', width: '90%' }}>
          <h2>Editar Toro</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>RP</label>
              <input type="text" name="rp" value={toro.rp} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Nacimiento</label>
              <input type="date" name="nacimiento" value={toro.nacimiento} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Padre</label>
              <input type="text" name="padre" value={toro.padre} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>PN</label>
              <input type="number" name="pn" value={toro.pn} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>PD</label>
              <input type="number" name="pd" value={toro.pd} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Peso 12 meses</label>
              <input type="number" name="p12" value={toro.p12} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Peso 18 meses</label>
              <input type="number" name="p18" value={toro.p18} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>CE 12 meses</label>
              <input type="number" name="ce12" value={toro.ce12} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>CE 18 meses</label>
              <input type="number" name="ce18" value={toro.ce18} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>CE</label>
              <input type="text" name="ce" value={toro.ce} onChange={handleInputChange} />
            </div>
            <div className="form-group" style={{ flex: '1 1 calc(33% - 20px)' }}>
              <label>Inmunizado</label>
              <input type="text" name="inmunizado" value={toro.inmunizado} onChange={handleInputChange} />
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

export default EditToro;




/*
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const EditToro = () => {
  const { id } = useParams();
  const [rp, setRp] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [padre, setPadre] = useState("");
  const [pn, setPn] = useState("");
  const [pd, setPd] = useState("");
  const [p12, setP12] = useState("");
  const [p18, setP18] = useState("");
  const [ce12, setCe12] = useState("");
  const [ce18, setCe18] = useState("");
  const [ce, setCe] = useState("");
  const [inmunizado, setInmunizado] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/gettoro/${id}`).then((response) => {
      const toro = response.data;
      setRp(toro.rp);
      setNacimiento(toro.nacimiento);
      setPadre(toro.padre);
      setPn(toro.pn);
      setPd(toro.pd);
      setP12(toro.p12);
      setP18(toro.p18);
      setCe12(toro.ce12);
      setCe18(toro.ce18);
      setCe(toro.ce);
      setInmunizado(toro.inmunizado);
      setImage(toro.image);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rp", rp);
    formData.append("nacimiento", nacimiento);
    formData.append("padre", padre);
    formData.append("pn", pn);
    formData.append("pd", pd);
    formData.append("p12", p12);
    formData.append("p18", p18);
    formData.append("ce12", ce12);
    formData.append("ce18", ce18);
    formData.append("ce", ce);
    formData.append("inmunizado", inmunizado);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:4000/edittoro/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/toros'); // Redirige a la página de listado de madres después de la edición
      
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error("There was an error updating the toro!", error);
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
              <label>P12:</label>
              <input type="text" value={p12} onChange={(e) => setP12(e.target.value)} />
            </div>
            <div>
              <label>P18:</label>
              <input type="text" value={p18} onChange={(e) => setP18(e.target.value)} />
            </div>
            <div>
              <label>CE12:</label>
              <input type="text" value={ce12} onChange={(e) => setCe12(e.target.value)} />
            </div>
            <div>
              <label>CE18:</label>
              <input type="text" value={ce18} onChange={(e) => setCe18(e.target.value)} />
            </div>
            <div>
              <label>CE:</label>
              <input type="text" value={ce} onChange={(e) => setCe(e.target.value)} />
            </div>
            <div>
              <label>Inmunizado:</label>
              <input type="text" value={inmunizado} onChange={(e) => setInmunizado(e.target.value)} />
            </div>
            <div>
              <label>Imagen:</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button type="submit">Actualizar Toro</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditToro;
*/