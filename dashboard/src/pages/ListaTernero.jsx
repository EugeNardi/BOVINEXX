
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar/Sidebar';
import BasicModal from '../components/ModalTernero';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



 
const ListaTernero = () => {

  
  

 const [data, setData] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  fetch('http://localhost:4000/getternero')
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
  fetch(`http://localhost:4000/deleteternero/${selectedId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.message === 'Ternero eliminado exitosamente') {
        setData(data.filter((item) => item._id !== selectedId));
        handleClose();
      } else {
        console.error('Error al eliminar el ternero:', result.message);
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
    headerName: 'RP',
    width: 90,
   },
   {
    field: 'nacimiento',
    valueGetter: (v) => {
      return v.value.split('T')[0];
    }
   ,
    headerName: 'NACIMIENTO',
    width: 120,
    editable:true, 
  },

  {
    field: 'madre',
    headerName: 'MADRE',
    width: 90,
    editable:true,
  },

  {
    field: 'padre',
    headerName: 'PADRE',
    width: 90,
    editable:true,
  },

  {
    field: 'genero',
    headerName: 'GENERO',
    width: 90,
    editable:true,
  },
  {
    field: 'pd',
    headerName: 'PD (KG)',
    width: 90,
    editable: true,
   },
 
  {
    field: 'peso',
    headerName: 'PESO (KG)',
    width: 90,
    editable: true,
   },

   {
    field: 'ce',
    headerName: 'CE (CM)',
    width: 90,
    editable: true,
   },

   {
    field: 'tatu',
    headerName: 'TATU',
    width: 90,
    editable: true,
   },

   
 


  {
    field:"action",
    headerName:"CAMBIOS",
    width:"190",
    renderCell: (params) => {
      return (
        <>
        <NavLink to={"/ternero/"+ params.row._id}>
          <button className="productListEdit">Ver</button>
        </NavLink>
        <NavLink to={"/ternero/edit/"+ params.row._id}>
          <button className="productListEdit">Editar</button>
        </NavLink>
        <DeleteOutlineIcon className="userListDelete" onClick={() => handleClickOpen(params.row._id)}/>

        </>
      )
    }

  }

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
    <BasicModal/>
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
            ¿Estás seguro de que deseas eliminar este ternero?
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
    
  )
}

export default ListaTernero