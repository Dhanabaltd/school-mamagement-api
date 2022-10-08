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
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import Moment from 'moment';
import axios from 'axios';
import Config from '../config';
import '../style.css';

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

function StudentList(props) {
    const [student, setStudent] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        studentList();
    }, [])
    const studentList = () => {
        axios.get(`${Config.baseURL}/api/students`)
            .then(res => {
                setStudent(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });
    };
    const confirmDeleteStudent = () => {
        axios.delete(`${Config.baseURL}/api/students/${id}`)
            .then(res => {
                toast.success(res.data.meaasage);
                studentList();
            })
            .catch(error => {
                toast.error(error);
            });
        setOpen(false);
    };
    const DeleteStudent = (_id) => {
        setOpen(true);
        setId(_id);
    };


    return (
        <>

            <div className='cardHeading'>
                <p className='heading'>{props?.value.label}</p>
                <Button onClick={() => props.value.history.push('/stuentAdd')} variant="contained" startIcon={<AddIcon />}>
                    Add
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Image</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Blood&nbsp;group</TableCell>
                            <TableCell align="right">Father&nbsp;name</TableCell>
                            <TableCell align="right">Mother&nbsp;name</TableCell>
                            <TableCell align="right">Course</TableCell>
                            <TableCell align="right">Staff&nbsp;name</TableCell>
                            {/* <TableCell align="right">Address</TableCell> */}
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {student.length === 0 ? <p align="center">No Student data found:)</p> :

                            student.map((row) => (
                                <>
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>  <Avatar src={`${Config.baseURL}/${row.studentImage.replace(/\\/g, "/")}`} alt="" /></TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.studentName}
                                        </TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{Moment(new Date(row.dob)).format("DD/MM/YYYY")}</TableCell>
                                        <TableCell align="right">{row.bloodGroup}</TableCell>
                                        <TableCell align="right">{row.fatherName}</TableCell>
                                        <TableCell align="right">{row.motherName}</TableCell>
                                        <TableCell align="right">{row.course}</TableCell>
                                        <TableCell align="right">{row.staffName}</TableCell>
                                        <TableCell align="right">{<RemoveRedEyeIcon className='cursor' onClick={() => props.value.history.push(`/studentView/${row._id}`)}/>}&nbsp;&nbsp;{<EditIcon className='themeColor cursor' onClick={() => props.value.history.push(`/studentEdit/${row._id}`)} />}&nbsp;&nbsp;{<DeleteIcon className='dangerColor cursor' onClick={() => { DeleteStudent(row._id) }} />}</TableCell>
                                    </TableRow>
                                </>
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
                    <Button style={{ marginRight: '20px' }} onClick={() => { confirmDeleteStudent() }} variant="contained" startIcon={<CloseIcon />}>
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



export default StudentList
