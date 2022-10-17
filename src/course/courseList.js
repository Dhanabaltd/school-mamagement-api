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
import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../config';

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

function CourseList(props) {
    const [course, setcourse] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [names, setNames] = useState([]);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        courseList();
    }, [])
    useEffect(() => {
        const Staff_names = []
        course.map(cour => {
            Staff_names[cour._id] = Staff_names[cour._id] ? Staff_names.cour : []
            console.log(Staff_names, 'Staff_namesStaff_names')
            cour.staffId.map(data => {
                console.log(data.staffName , "ota")
                if(Staff_names[cour._id].length > 0){
                    Staff_names[cour._id].push(" ,")
                    Staff_names[cour._id].push(data.staffName)
                }else{
                    Staff_names[cour._id].push(data.staffName)
                }

            })
        })
        setNames(Staff_names)
    },[course])

    const courseList = () => {
        axios.get(`${Config.baseURL}/api/courses`)
            .then(res => {
                setcourse(res.data.data);

            })
            .catch(error => {
                toast.error(error);
            });
    };
    const confirmDeleteCourse = () => {
        axios.delete(`${Config.baseURL}/api/courses/${id}`)
            .then(res => {
                toast.success(res.data.message);
                courseList();
            })
            .catch(error => {
                toast.error(error);
            });
        setOpen(false);
    };
    const DeleteCourse = (_id) => {
        setOpen(true);
        setId(_id);
    };

    return (
        <>
            {console.log('Staff_names', names)}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p className='heading'>{props?.value.label}</p>
                <Button onClick={() => props.value.history.push('/courseAdd')} variant="contained" startIcon={<AddIcon />}>
                    Add
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Course name</TableCell>
                            <TableCell align="right">Staff name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {course.length === 0 ? <p align="center">No Course data found:)</p> :
                            course.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.courseName}
                                    </TableCell>
                                    <TableCell align="right">{names[row._id]}</TableCell>
                                    <TableCell align="right">{<RemoveRedEyeIcon className='cursor' onClick={() => props.value.history.push(`/courseView/${row._id}`)} />}&nbsp;&nbsp;{<EditIcon className='themeColor cursor' onClick={() => props.value.history.push(`/courseEdit/${row._id}`)} />}&nbsp;&nbsp;{<DeleteIcon className='dangerColor cursor' onClick={() => { DeleteCourse(row._id) }} />}</TableCell>
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
                    <Button style={{ marginRight: '20px' }} onClick={() => { confirmDeleteCourse() }} variant="contained" startIcon={<CloseIcon />}>
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



export default CourseList
