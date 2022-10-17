import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

function AddStudent(props) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [course, setcourse] = useState([]);
    const [staff, setStaff] = useState([]);
    const [imgPath, setImgPath] = useState(null);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [staffCourse, setStaffCourse] = useState([]);
    const [datas, setDatas] = useState({
        studentName: "",
        email: "",
        dob: Moment(new Date(selectedDate)).format("DD/MM/YYYY"),
        bloodGroup: "",
        fatherName: "",
        motherName: "",
        courseId: null,
        staffId: null,
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
        formdata.append("courseId", datas.courseId);
        formdata.append("staffId", datas.staffId);
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
    const editCourseStudent = e => {
        console.log('e', e.target.value)
        let Id = e.target.value;
        setDatas({ ...datas, staffId: e.target.value })
        setDatas({ ...datas, courseId: e.target.value })

        // console.log('student.staffId.courseId', datas.staffId)
        axios.get(`${Config.baseURL}/api/courses/${Id}`)
            .then(res => {
                console.log('res.data.data', res.data.data)
                setStaffCourse(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });
    };
    const handleChange = (event) => {
        const { target: { value }, } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
        setDatas({ ...datas, staffId: typeof value === 'string' ? value.split(',') : value, })
    };
    return (
        <>
            <Card style={{ padding: '30px' }} variant="outlined">
                <Typography variant="h4" component="h2">
                    Add Student
                </Typography>
                {console.log('datas', datas)}
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
                        name='courseId'
                        onChange={editCourseStudent}
                    >
                        {course.map((option) => (
                            <MenuItem key={option.value} value={option._id}>
                                {option.courseName}
                            </MenuItem>
                        ))}
                    </TextField>
                    {staffCourse.length === 0 ? <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Staff Name</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
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
                    </FormControl> : <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Staff Name</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={staffCourse && staffCourse.staffId ? staffCourse.staffId : ''}
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
                    </FormControl>}
                    {console.log('staffCourse', staffCourse && staffCourse.staffId ? staffCourse.staffId : '')}
                    {/* <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-multiple-name-label">Staff Name</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={staffCourse && staffCourse.staffId ? staffCourse.staffId : ''}
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
                    </FormControl> */}
                    {/* <TextField
                        required
                        style={{ marginBottom: '15px' }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Staff name"
                        name='staffId'
                        value={ccc}
                        onChange={addNewStudent}
                    >
                        {staff.map((option) => (
                            <MenuItem key={option.value} value={option._id}>
                                {option.staffName}
                            </MenuItem>
                        ))}
                    </TextField> */}

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
                    <Typography>{imgPath ? imgPath : 'File upload required'}</Typography>
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
