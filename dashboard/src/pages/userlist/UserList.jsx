import "./UserList.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userRows } from "../../data/data";
import { NavLink } from "react-router-dom"
import { useState } from "react";

 
const UserList = () => {

  

 const [data, setData] = useState(userRows);

 const handleDelete = (id) =>{
      setData(data.filter((item)=> item.id !== id))
 }

 const columns = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
    field: 'username',
    headerName: 'Caravana',
    width: 200,
    renderCell:(params) =>{
      return(
        <div className="userListUser">
          <img src={params.row.avatar} alt="" className="userListUserImg"/>
          {params.row.username}
        </div>
      )
    }
   },
  {
    field: 'email',
    headerName: 'Raza',
    width: 200,
    editable: true,
   },
   {
    field: 'status',
    headerName: 'Vacunación',
    width: 150,
    editable: true,
   },
   {
    field: 'transaction',
    headerName: 'Peso',
    width: 200,
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
    <div className="userList">
       <Box sx={{ height: 525, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
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
  )
}

export default UserList