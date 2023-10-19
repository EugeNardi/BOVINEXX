
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar/Sidebar';

 
const UserList = () => {

  

 const [data, setData] = useState([]);

 useEffect(() => {
  fetch('http://localhost:4000/get')
    .then((response) => response.json())
    .then((data) => {
      
      setData(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}, []);


 const handleDelete = (id) =>{
      setData(data.filter((item)=> item.id !== id))
 }

 const columns = [

   {
    field: 'caravana',
    headerName: 'Caravana',
    width: 150,
   },
  {
    field: 'raza',
    headerName: 'Raza',
    width: 150,
    editable: true,
   },
   {
    field: 'vacunacion',
    headerName: 'Vacunación',
    width: 150,
    editable: true,
   },
   {
    field: 'peso',
    headerName: 'Peso (Kg)',
    width: 120,
    editable:true,
  },
  {
    field: 'categoria',
    headerName: 'Categoría',
    width: 150,
    editable:true,
  },
  {
    field: 'sector',
    headerName: 'Sector',
    width: 150,
    editable:true,
  },
  {
    field:"action",
    headerName:"Cambios",
    width:"150",
    renderCell: (params) => {
      return (
        <>
        <NavLink to={"/user/"+ params.row.id}>
          <button className="userListEdit">Editar</button>
        </NavLink>
        <DeleteOutlineIcon className="userListDelete" onClick={() => handleDelete(params.row.id)}/>

        </>
      )
    }

  }

];


  return (
    <>
    <Topbar/>
    <div className="container">
    <Sidebar/>
    <div className="userList">

    <Box sx={{ height: 525, width: '100%' }}>
      <DataGrid
        rows={data}
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
     </>
    
  )
}

export default UserList