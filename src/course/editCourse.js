import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Config from '../config';
import { toast } from 'react-toastify';
function EditCourse(props) {
    const [staff, setStaff] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const ID = props.value.match.params.id;

    const staffList = () => {
        axios.get(`${Config.baseURL}/api/staffs`)
            .then(res => {
                setStaff(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });

    };
    useEffect(() => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/courses/${ID}`)
            .then(res => {
                setCourse(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });
        staffList();
    }, [ID]);
    const editCourse = e => {
        setCourse(prev => {
            prev[e.target.name] = e.target.value;
            return prev
        })
    };
    const updateCourseSubmit = (e) => {
        e.preventDefault();
        axios.put(`${Config.baseURL}/api/courses/${ID}`, course)
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
            {loading ? <div>...loading</div> :
                <Card style={{ padding: '30px' }} variant="outlined">
                    <Typography variant="h4" component="h2">
                        Edit Course
                    </Typography>;
                    <form onSubmit={updateCourseSubmit} >
                        <Box mb={2}>
                            <TextField
                                required
                                fullWidth
                                id="demo-helper-text-misaligned-no-helper"
                                label="Course Name"
                                name="courseName"
                                defaultValue={course.courseName}
                                focused
                                onChange={editCourse} />
                        </Box>
                        <TextField
                            required
                            style={{ marginBottom: '15px' }}
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Staff name"
                            name='staffName'
                            defaultValue={course.staffName}
                            onChange={editCourse}
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
            }

        </>
    );
}
export default EditCourse
