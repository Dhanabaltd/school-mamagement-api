import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Config from '../config';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import { toast } from 'react-toastify';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


function AddStudent(props) {
    const [course, setcourse] = useState([]);
    const [staff, setStaff] = useState([]);
    const [imgPath, setImgPath] = useState(null);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [datas, setDatas] = useState({
        studentName: "",
        email: "",
        dob: Moment(new Date(selectedDate)).format("DD/MM/YYYY"),
        bloodGroup: "",
        fatherName: "",
        motherName: "",
        course: "",
        staffName: "",
        address: "",
        studentImage: null
    });
    const addNewStudent = e => {
        setDatas({ ...datas, [e.target.name]: e.target.value });
    };
    const handleDateChange1 = (date) => {
        setDatas({ ...datas, dob: date });
        handleDateChange(date)
    };
    const changeHandler = (event) => {
        setImgPath(event.target.files[0].name);
        setDatas({ ...datas, studentImage: event.target.files[0] })
    };
    const addStudentSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("studentImage", datas.studentImage);
        formdata.append("studentName", datas.studentName);
        formdata.append("email", datas.email);
        formdata.append("dob", datas.dob);
        formdata.append("bloodGroup", datas.bloodGroup);
        formdata.append("fatherName", datas.fatherName);
        formdata.append("motherName", datas.motherName);
        formdata.append("course", datas.course);
        formdata.append("staffName", datas.staffName);
        formdata.append("address", datas.address);


        axios.post(`${Config.baseURL}/api/students`, formdata)
            .then(res => {
                toast.success(res.data.message);
                props.value.history.push('/student')
            })
            .catch(error => {
                toast.success(error);
            });
    };
    useEffect(() => {
        courseList();
        staffList();
    }, [])
    const courseList = () => {
        axios.get(`${Config.baseURL}/api/courses`)
            .then(res => {
                setcourse(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });
    };
    const staffList = () => {
        axios.get(`${Config.baseURL}/api/staffs`)
            .then(res => {
                setStaff(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });
    };

    return (
        <>
            <Card style={{ padding: '30px' }} variant="outlined">
                <Typography variant="h4" component="h2">
                    Add Student
                </Typography>;
                <form onSubmit={addStudentSubmit} >
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper"
                            label="Student Name"
                            name='studentName'
                            onChange={addNewStudent} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            required
                            fullWidth
                            id="demo-helper-text-misaligned-no-helper"
                            label="Email"
                            name='email'
                            onChange={addNewStudent} />
                    </Box>
                    <Box mb={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                autoOk
                                required
                                fullWidth
                                variant="inline"
                                inputVariant="outlined"
                                label="Date of Birth"
                                format="dd/MM/yyyy"
                                value={selectedDate}
                                name='dob'
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => handleDateChange1(date)}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper"
                            label="Blood group"
                            name='bloodGroup'
                            onChange={addNewStudent} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper"
                            label="Father name"
                            name='fatherName'
                            onChange={addNewStudent} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper"
                            label="Mother name"
                            name='motherName'
                            onChange={addNewStudent} />
                    </Box>
                    <TextField
                        required
                        style={{ marginBottom: '15px' }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Course name"
                        name='course'
                        onChange={addNewStudent}
                    >
                        {course.map((option) => (
                            <MenuItem key={option.value} value={option.courseName}>
                                {option.courseName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        style={{ marginBottom: '15px' }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Staff name"
                        name='staffName'
                        onChange={addNewStudent}
                    >
                        {staff.map((option) => (
                            <MenuItem key={option.value} value={option.staffName}>
                                {option.staffName}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField mb={2}
                        required
                        id="outlined-multiline-static"
                        label="Address"
                        multiline
                        rows={4}
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        name='address'
                        onChange={addNewStudent}
                    />
                    <Button variant="contained" component="label">
                        Upload
                        <input required onChange={changeHandler} hidden accept="image/*" type="file" />
                    </Button>
                    <Typography>{imgPath?imgPath:'File upload required'}</Typography>
                    <div align="right">
                        <Button onClick={() => props.value.history.push('/student')} style={{ marginRight: '15px' }} variant="outlined" startIcon={<CloseIcon />}>
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
export default AddStudent
