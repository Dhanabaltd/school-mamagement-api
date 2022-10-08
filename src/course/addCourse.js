import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';

import Config from '../config';

function AddCourse(props) {
    const [staff, setStaff] = useState([]);

    const [Datas, setDatas] = useState({
        staffName: '',
        courseName: ''
    });
    const addNewCourse = e => {
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    };
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
    const addCourseSubmit = (e) => {
        e.preventDefault();
        axios.post(`${Config.baseURL}/api/courses`, Datas)
            .then(res => {
                toast.success(res.data.message);
                props.value.history.push('/course')
            })
            .catch(error => {
                toast.error(error);
            });
    };

    return (
        <>
            <Card style={{ padding: '30px' }} variant="outlined">
                <Typography variant="h4" component="h2">
                    Add Course
                </Typography>;
                <form onSubmit={addCourseSubmit} >
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper courseName"
                            label="Course name"
                            name="courseName"
                            onChange={addNewCourse} />
                    </Box>
                    <TextField
                        required
                        style={{ marginBottom: '15px' }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Staff name"
                        name='staffName'
                        onChange={addNewCourse}
                    >
                        {staff.map((option) => (
                            <MenuItem key={option._id} value={option.staffName}>
                                {option.staffName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div align="right">
                        <Button onClick={() => props.value.history.push('/course')} style={{ marginRight: '15px' }} variant="outlined" startIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                        <Button type='submit' variant="contained" startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
}
export default AddCourse
