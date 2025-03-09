import  { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Topbar from '../components/Topbar';
import Sidebar from "../components/Sidebar/Sidebar";
import ModalMadre from '../components/ModalMadre';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



export default function ListaMadre() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
      fetch("http://localhost:4000/getmadre")
      
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const fetchMadres = () => {
    fetch("http://localhost:4000/getmadres")
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Actualiza el estado con los datos más recientes
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:4000/deletemadre/${selectedId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Vaca eliminada exitosamente") {
          fetchMadres(); // Recarga la lista completa desde el backend
          handleClose(); // Cierra el modal
        } else {
          console.error("Error al eliminar la vaca:", result.message);
        }
      })
      .catch((error) => console.error("Error en la solicitud de eliminación:", error))
      .finally(() => setIsDeleting(false));
  };
  
  
  
  const columns = [
    { field: "rp", headerName: "RP", width: 80 },
    { field: "nacimiento", valueGetter: (v) => v.value.split('T')[0], headerName: "NACIMIENTO", width: 120 },
    { field: "peso", headerName: "PESO (KG)", width: 90 },
    { field: "pn", headerName: "PN (KG)", width: 90 },
    { field: "estado", headerName: "ESTADO", width: 90 },
    { field: "toro", headerName: "TORO", width: 90 },
    { field: "servicio", valueGetter: (v) => v.value.split('T')[0], headerName: "SERVICIO", width: 120 },
    { field: "abma", headerName: "ABUELA M", width: 90 },
    { field: "tatu", headerName: "TATU", width: 90 },
    {
      field: "action",
      headerName: "CAMBIOS",
      width: 190,
      renderCell: (params) => (
        <>
          <Link to={"/madre/" + params.row._id}>
            <button className="productListEdit">Ver</button>
          </Link>
          <Link to={"/madre/edit/" + params.row._id}>
            <button className="productListEdit">Editar</button>
          </Link>
          <DeleteOutlineIcon
            className="productListDelete"
            onClick={() => handleClickOpen(params.row._id)}
          />
        </>
      ),
    },
  ];

  const filteredData = data.filter(item =>
    item.rp.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div>
          <div className="subcontainer">
            <ModalMadre />
            <TextField
              className="buscadorrp"
              label="Buscar por RP"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="userList">
            <Box sx={{ height: 423, width: '110%' }}>
              <DataGrid
                rows={filteredData}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6,
                    },
                  },
                }}
                pageSizeOptions={[6]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <h3>Confirmar Eliminación</h3>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta vaca?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="button-cancel" disabled={isDeleting}>
            No
          </button>
          <button onClick={handleDelete} className="button-out" autoFocus disabled={isDeleting}>
            Sí
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}


/*

import  { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Topbar from '../components/Topbar';
import Sidebar from "../components/Sidebar/Sidebar";
import ModalMadre from '../components/ModalMadre';
import TextField from '@mui/material/TextField';

export default function ListaMadre() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://localhost:4000/getmadre')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handleDelete = (id) => {
    fetch(`http://localhost:4000/deletemadre/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'Vaca eliminada exitosamente') {
          setData(data.filter((item) => item._id !== id));
        } else {
          console.error('Error al eliminar la vaca:', result.message);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud de eliminación:', error);
      });
  };


 

  const columns = [
    { field: "rp", headerName: "RP", width: 80},
    { field: "nacimiento",  valueGetter: (v) => {
      return v.value.split('T')[0];}, headerName: "NACIMIENTO", width: 120 },
    { field: "peso", headerName: "PESO (KG)", width: 90 },
    { field: "pn", headerName: "PN (KG)", width: 90 },
    { field: "estado", headerName: "ESTADO", width: 90 },
    { field: "toro", headerName: "TORO", width: 90 },
    { field: "servicio",  valueGetter: (v) => {
      return v.value.split('T')[0];
    },
     headerName: "SERVICIO", width: 120 },
    { field: "abma", headerName: "ABUELA M", width: 90 },
    { field: "tatu", headerName: "TATU", width: 90 },
    {
      field: "action",
      headerName: "CAMBIOS", 
      width: 190,
      renderCell: (params) => {
        return (
          <>
          
            <Link to={"/madre/" + params.row._id}>
              <button className="productListEdit">Ver</button>
            </Link>
            <Link to={"/madre/edit/" + params.row._id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
          
            />
          

            
          </>
        );
      },
    },
  ];

  const filteredData = data.filter(item =>
    item.rp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div>
          <div className="subcontainer">
          <ModalMadre />
        <TextField
              label="Buscar por RP"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="userList">
        
            <Box sx={{ height: 423, width: '110%' }}>
         
              <DataGrid
                rows={filteredData}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 6,
                    },
                  },
                }}
                pageSizeOptions={[6]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}



*/ 