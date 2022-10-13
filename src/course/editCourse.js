import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Config from '../config';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function EditCourse(props) {
    const theme = useTheme();
    const [staff, setStaff] = useState([]);
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [personName, setPersonName] = useState([]);
    

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

    const handleChange = (event) => {
        const { target: { value }, } = event;
        console.log('value', value)
        // setPersonName(typeof value === 'string' ? value.split(',') : value);
        setCourse({ ...course, staffId: typeof value === 'string' ? value.split(',') : value, })
    };

    return (
        <>
            {loading ? <div>...loading</div> :
                <Card style={{ padding: '30px' }} variant="outlined">
                    <Typography variant="h4" component="h2">
                        Edit Course
                    </Typography>
                    {console.log('course', course)}
                    {console.log('personName', personName)}
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
                        
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="demo-multiple-name-label">Staff Name</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={course.staffId}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                            >
                                {staff.map((name) => (
                                    <MenuItem
                                        key={name._id}
                                        value={name._id}
                                        style={getStyles(name, personName, theme)}
                                    >
                                        {name.staffName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* <TextField
                            required
                            style={{ marginBottom: '15px' }}
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Staff name"
                            name='staffId'
                            defaultValue={course.staffId}
                            onChange={editCourse}
                        >
                            {staff.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.staffName}
                                </MenuItem>
                            ))}
                        </TextField> */}
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
