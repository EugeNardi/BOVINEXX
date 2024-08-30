import { useState, useEffect } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Import the delete icon
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import './Guias.css';

const Guias = () => {
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/getguia');
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('guia', selectedFile);

            try {
                const response = await fetch('/postguia', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    fetchFiles(); // Refresh the file list after upload
                } else {
                    console.error('Error uploading file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

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
        fetch(`http://localhost:4000/deleteguia/${selectedId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    fetchFiles(); // Refresh the file list after deletion
                    handleClose(); // Close modal
                } else {
                    console.error('Error deleting file');
                }
            })
            .catch((error) => console.error('Error deleting file:', error))
            .finally(() => setIsDeleting(false));
    };

    const columns = [
        { field: 'guia', headerName: 'Guía', flex: 1 },
        { field: 'createdAt', headerName: 'Fecha', flex: 1 },
        {
            field: 'action',
            headerName: 'Cambios',
            flex: 1,
            renderCell: (params) => (
                <>
                    <a
                        className='uploadButton'
                        href={`/${params.row.guia}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                    >
                        Ver PDF
                    </a>
                    <IconButton
                        onClick={() => handleClickOpen(params.row._id)}
                        style={{ padding: 0, backgroundColor: 'transparent' }} // No background
                    >
                        <DeleteOutlineIcon style={{ color: 'gray' }} /> {/* Gray color for the delete icon */}
                    </IconButton>
                </>
            ),
        },
    ];

    const rows = files.map((file) => ({
        ...file,
        guia: file.guia, // File name as it is
        createdAt: new Date(file.createdAt).toLocaleDateString(), // Display only the date
    }));

    return (
        <>
            <Topbar />
            <div className='container'>
                <Sidebar />
                <div style={{ width: '100%', padding: '10px 40px' }}>
                    <div className="header">
                        <h2>Guías de Carga</h2>
                        <div className="uploadContainer">
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput" className="uploadLabel" style={{ display: 'flex', alignItems: 'center' }}>
                                <PublishIcon style={{ color: 'gray', fontSize: 30 }} />
                                <span style={{ marginLeft: '10px' }}>Cargar Guía</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ height: 420, width: '100%' }}>
                        <DataGrid
                            rows={rows}
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
                        ¿Estás seguro de que deseas eliminar esta guía?
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
};

export default Guias;





/*
import { useState, useEffect } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Import the delete icon
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import './Guias.css';

const Guias = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await fetch('/getguia');
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('guia', file);

        try {
            const response = await fetch('/postguia', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                fetchFiles(); // Refresh the file list after upload
                setFile(null); // Clear the file input
            } else {
                console.error('Error uploading file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/deleteguia/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchFiles(); // Refresh the file list after deletion
            } else {
                console.error('Error deleting file');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };
    

    console.log(handleFileUpload);
    
    const columns = [
        { field: 'guia', headerName: 'Guía', flex: 1 },
        { field: 'createdAt', headerName: 'Fecha', flex: 1 },
        {
            field: 'action',
            headerName: 'Cambios',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        className="customButton"
                        href={`/${params.row.guia}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver PDF
                    </Button>
                    <IconButton
                        onClick={() => handleDelete(params.row._id)}
                        style={{ padding: 0, backgroundColor: 'transparent' }} // No background
                    >
                        <DeleteOutlineIcon style={{ color: 'gray' }} /> {/* Gray color for the delete icon */
                      /*  
                    </IconButton>
                </>
            ),
        },
    ];
/*
    const rows = files.map((file) => ({
        ...file,
        guia: file.guia, // Extract the part before the first hyphen
        createdAt: new Date(file.createdAt).toLocaleDateString(), // Display only the date
    }));

    return (
        <>
            <Topbar />
            <div className='container'>
                <Sidebar />
                <div style={{ width: '100%', padding: '10px 40px' }}>
                    <div className="header">
                        <h2>Guías de Carga</h2>
                        <div className="uploadContainer">
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput" className="uploadLabel">
                                <PublishIcon style={{ color: 'gray', fontSize: 30 }} />
                                Cargar Guía
                            </label>
                        </div>
                    </div>

                    <div style={{ height: 420, width: '100%' }}>
                        <DataGrid
                            rows={rows}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Guias;

/*



import { useState, useEffect } from 'react';
import axios from 'axios';
import PublishIcon from '@mui/icons-material/Publish'; // Import the MUI icon
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './Guias.css';

const Guias = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('/getguia');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('guia', file);

        try {
            await axios.post('/postguia', formData);
            fetchFiles(); // Refresh the file list after upload
            setFile(null); // Clear the file input
            console.log();
            
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

  console.log(handleFileUpload);
  

    const columns = [
        { field: 'guia', headerName: 'Guía', flex: 1 },
        { field: 'createdAt', headerName: 'Fecha', flex: 1 },
        {
            field: 'action',
            headerName: 'Cambios',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    className="customButton"
                    href={`/${params.row.guia}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver PDF
                </Button>
            ),
        },
    ];

    const rows = files.map((file) => ({
        ...file,
        guia: file.guia, // Extract the part before the first hyphen
        createdAt: new Date(file.createdAt).toLocaleDateString(), // Display only the date
    }));

    return (
        <>
            <Topbar />
            <div className='container'>
                <Sidebar />
                <div style={{ width: '100%', padding: '10px 40px' }}>
                    <div className="header">
                        <h2>Guías de Carga</h2>
                        <div className="uploadContainer">
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="fileInput" className="uploadLabel">
                                <PublishIcon style={{ color: 'gray', fontSize: 40 }} />
                                Cargar Guía
                            </label>
                        </div>
                    </div>

                    <div style={{ height: 420, width: '100%' }}>
                        <DataGrid
                            rows={rows}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Guias;





/*
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { DataGrid } from '@mui/x-data-grid';


const Guias = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('/getguia');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('guia', file);

        try {
            await axios.post('/postguia', formData);
            fetchFiles(); // Refresh the file list after upload
            setFile(null); // Clear the file input
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const columns = [
        { field: 'guia', headerName: 'File Name', flex: 1 },
        { field: 'createdAt', headerName: 'Uploaded At', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
                <button
                    
                    color="primary"
                    href={`/${params.row.guia}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver PDF
                </button>
            ),
        },
    ];

    const rows = files.map((file) => ({
        ...file,
        guia: file.guia.split('/').pop(), // Extract the file name
        createdAt: new Date(file.createdAt).toLocaleString(),
    }));

    return (
        <>
            <Topbar />
            <div className='container'>
                <Sidebar />
                <div style={{ width: '100%', padding: '20px' }}> 
                    <h3>Subir Guías de Carga</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                            <FaUpload size={30} /> Cargar
                        </label>
                        {file && <button onClick={handleFileUpload}>Cargar</button>}
                    </div>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Guias;
*/