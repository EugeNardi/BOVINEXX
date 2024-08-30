
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from '../components/Topbar';
import Sidebar from "../components/Sidebar/Sidebar"
import ModalToro from '../components/ModalToro';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function ListaMadre() {


  const [data, setData] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [open, setOpen] = useState(false);
 const [selectedId, setSelectedId] = useState(null);
 const [isDeleting, setIsDeleting] = useState(false); 


  useEffect(() => {
    fetch('http://localhost:4000/gettoro')
      .then((response) => response.json())
      .then((data) => {
        
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`http://localhost:4000/deletetoro/${selectedId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'Toro eliminado exitosamente') {
          setData(data.filter((item) => item._id !== selectedId));
          handleClose();
        } else {
          console.error('Error al eliminar el toro:', result.message);
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud de eliminación:', error);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  
      if (handleDelete.ok) {
        setOpen(false); // Cierra el modal
        window.location.reload(); // Recarga la página
      } else {
        console.error("Error al crear el post");
      }
  };

  const columns = [
    {
      field: "rp",
      headerName: "RP",
      width: 90,
    },    
    { field: "nacimiento",
    headerName: "NACIMIENTO", 
    valueGetter: (v) => {
      return v.value.split('T')[0];
    }
   ,
    width: 110},

    { field: "padre",
      headerName: "PADRE", 
      width: 90 },

     { field: "pn",
     headerName: "PN (KG)", 
     width: 90 },

    { field: "pd",
      headerName: "PD (KG)",
      width: 90,
    },

    { field: "p12",
      headerName: "P12 (KG)",
      width: 90,
    },

    { field: "ce12",
      headerName: "CE 12 (CM)",
      width: 90,
    },

    { field: "ce",
    headerName: "CE (CM)",
    width: 90,
  },
  { field: "inmunizado",
    headerName: "INMUNIZADO",
    width: 90,
  },

    {
      field: "action",
      headerName: "CAMBIOS", 
      width: 190,
      renderCell: (params) => {
        return (
          <>
           <Link to={"/toro/" + params.row._id}>
              <button className="productListEdit">Ver</button>
            </Link>
            <Link to={"/toro/edit/" + params.row._id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"  onClick={() => handleClickOpen(params.row._id)} />
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
    <Topbar/>
    <div className="container">
    <Sidebar/>
      <div>
    <div className="subcontainer">
    <ModalToro/>
    <TextField
              className='buscadorrp'
              label="Buscar por RP"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

    </div>
    <div className="userList">

 

    <Box sx={{ height: 423, width: '130%' }}>
          <DataGrid
        rows={filteredData}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
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
            ¿Estás seguro de que deseas eliminar este toro?
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

