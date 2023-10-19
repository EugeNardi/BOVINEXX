
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { productRows } from "../data/data"
import { Link } from "react-router-dom";
import { useState } from "react";
import Topbar from '../components/Topbar';
import Sidebar from "../components/Sidebar/Sidebar"

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "lote",
      headerName: "Lote",
      width: 120,
    },
    { field: "categoría",
    headerName: "Categoría", 
    width: 150},
   
    { field: "cantidad",
     headerName: "Cantidad", 
     width: 120 },
    {
      field: "vacunación",
      headerName: "Vacunación",
      width: 150,
    },
    {
      field: "raza",
      headerName: "Raza",
      width: 150,
    },
    {
      field: "foto",
      headerName: "Foto",
      width: 150,
    },
    {
      field: "action",
      headerName: "Cambios",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Editar</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
   <Topbar/>
   <div className="container">
     <Sidebar/>
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
    </>
  );
}
