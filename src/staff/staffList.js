import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import Moment from 'moment';
import axios from 'axios';
import Config from '../config';
import '../style.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function StaffList(props) {
    const [Staff, setStaff] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        staffList();
    }, [])
    const staffList = () => {
        axios.get(`${Config.baseURL}/api/staffs`)
            .then(res => {
                setStaff(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });
    };
    const confirmDeleteStaff = () => {
        axios.delete(`${Config.baseURL}/api/staffs/${id}`)
            .then(res => {
                toast.success(res.data.message);
                staffList();
            })
            .catch(error => {
                toast.error(error);
            });
        setOpen(false);
    };
    const DeleteStaff = (_id) => {
        setOpen(true);
        setId(_id);
    };
    return (
        <>
            <div className='cardHeading'>
                <p className='heading'>{props?.value.label}</p>
                <Button onClick={() => props.value.history.push('/staffAdd')} variant="contained" startIcon={<AddIcon />}>
                    Add
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Mobile&nbsp;number</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Staff.length === 0 ? <p align="center">No Staff data found:)</p> :
                            Staff.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.staffName}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.mobileNumber}</TableCell>
                                    <TableCell align="right">{Moment(new Date(row.dob)).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell align="right">{<RemoveRedEyeIcon className='cursor' onClick={() => props.value.history.push(`/staffView/${row._id}`)} />}&nbsp;&nbsp;{<EditIcon className='themeColor cursor' onClick={() => props.value.history.push(`/staffEdit/${row._id}`)} />}&nbsp;&nbsp;{<DeleteIcon className='dangerColor cursor' onClick={() => { DeleteStaff(row._id) }} />}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography mb={4} id="modal-modal-title" variant="h6" component="h2">
                        Are you sure Delete this record!
                    </Typography>
                    <Button style={{ marginRight: '20px' }} onClick={() => { confirmDeleteStaff() }} variant="contained" startIcon={<CloseIcon />}>
                        Delete
                    </Button>
                    <Button onClick={() => { handleClose() }} variant="outlined" startIcon={<DeleteIcon />}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
}



export default StaffList
