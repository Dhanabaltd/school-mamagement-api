import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import DateFnsUtils from '@date-io/date-fns';
import { toast } from 'react-toastify';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import Config from '../config';

function EditStudent(props) {
    const [student, setStudent] = useState([]);
    const [staffCourse, setStaffCourse] = useState([]);
    const [imgPath, setImgPath] = useState(null);
    const [course, setcourse] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const ID = props.value.match.params.id;
    useEffect(() => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/students/${ID}`)
            .then(res => {
                setImgPath(res.data.data.imageName)
                setStudent(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });

    }, [ID]);
    useEffect(() => {
        courseList();
        staffList();
    }, [])
    const courseList = () => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/courses`)
            .then(res => {
                setcourse(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });
    };
    const staffList = () => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/staffs`)
            .then(res => {
                setStaff(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });
    };
    const editCourseStudent = e => {
        setStudent(prev => {
            prev[e.target.name] = e.target.value;
            return prev
        });
        console.log('student.staffId.courseId', student.staffId.courseId)
        axios.get(`${Config.baseURL}/api/staffs/course/${student.staffId.courseId}`)
            .then(res => {
                console.log('res.data.data', res.data.data)
                setStaffCourse(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });
    }
    const editStudent = e => {
        setStudent(prev => {
            prev[e.target.name] = e.target.value;
            return prev
        });

    };
    const handleDateChange1 = (date) => {
        setStudent({ ...student, dob: date });
    };

    const changeHandler = (event) => {
        setImgPath(event.target.files[0].name);
        setStudent({ ...student, studentImage: event.target.files[0] })
    };
    const updateStudentSubmit = (e) => {
        e.preventDefault();
        var formdata = new FormData();
        formdata.append("studentImage", student.studentImage);
        formdata.append("studentName", student.studentName);
        formdata.append("email", student.email);
        formdata.append("dob", student.dob);
        formdata.append("bloodGroup", student.bloodGroup);
        formdata.append("fatherName", student.fatherName);
        formdata.append("motherName", student.motherName);
        formdata.append("courseId", student.courseId);
        formdata.append("staffId", student.staffId);
        formdata.append("address", student.address);
        formdata.append("imageName", imgPath)
        axios.put(`${Config.baseURL}/api/students/${ID}`, formdata)
            .then(res => {
                toast.success(res.data.message);
                props.value.history.push('/student')
            })
            .catch(error => {
                toast.success(error);
            });
    };



    return (
        <>{
            loading ? <div>...loading</div> : student && Object.keys(student).length > 0 ?
                <Card style={{ padding: '30px' }} variant="outlined">
                    <Typography variant="h4" component="h2">
                        Edit Student
                    </Typography>
                    {console.log('staffCourse', staffCourse)}
                    <form onSubmit={updateStudentSubmit}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Name"
                                defaultValue={student.studentName}
                                focused
                                name='studentName'
                                onChange={editStudent} />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Email"
                                defaultValue={student.email}
                                focused
                                name='email'
                                disabled
                                onChange={editStudent} />
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
                                    name='dob'
                                    value={student.dob}
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
                                defaultValue={student.bloodGroup}
                                focused
                                name='bloodGroup'
                                onChange={editStudent} />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Father name"
                                defaultValue={student.fatherName}
                                focused
                                name='fatherName'
                                onChange={editStudent} />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Mother name"
                                defaultValue={student.motherName}
                                focused
                                name='motherName'
                                onChange={editStudent} />
                        </Box>
                        <TextField
                            required
                            style={{ marginBottom: '15px' }}
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Course name"
                            name='courseId'
                            defaultValue={student && student.courseId && student.courseId._id ? student.courseId._id : ''}
                            onChange={editCourseStudent}
                        >
                            {course.map((option) => (
                                <MenuItem key={option.value} value={option._id}>
                                    {option.courseName}
                                </MenuItem>
                            ))}
                        </TextField>
                        {console.log('ddd', student && student.staffId && student.staffId._id ? student.staffId._id : '')}
                        {staffCourse.length === 0 ?
                            <TextField
                                required
                                style={{ marginBottom: '15px' }}
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Staff name"
                                name='staffId'
                                defaultValue={student && student.staffId && student.staffId._id ? student.staffId._id : ''}
                                onChange={editStudent}
                            >
                                {staff.map((option) => (
                                    <MenuItem key={option.value} value={option._id}>
                                        {option.staffName}
                                    </MenuItem>
                                ))}
                            </TextField> :
                            <TextField
                                required
                                style={{ marginBottom: '15px' }}
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Staff name"
                                name='staffId'
                                defaultValue={student && student.staffId && student.staffId._id ? student.staffId._id : ''}
                                onChange={editStudent}
                            >
                                {staffCourse.map((option) => (
                                    <MenuItem key={option.value} value={option._id}>
                                        {option.staffName}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        {/* <TextField
                            required
                            style={{ marginBottom: '15px' }}
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Staff name"
                            name='staffId'
                            defaultValue={student && student.staffId && student.staffId._id ? student.staffId._id : ''}
                            onChange={editStudent}
                        >
                            {staff.map((option) => (
                                console.log('option._id', option._id)
                                // <MenuItem key={option.value} value={option._id}>
                                //     {option.staffName}
                                // </MenuItem>
                            ))}
                        </TextField> */}
                        <TextField mb={2}
                            required
                            id="outlined-multiline-static"
                            label="Address"
                            multiline
                            rows={4}
                            fullWidth
                            name='address'
                            defaultValue={student.address}
                            style={{ marginBottom: '15px' }}
                            onChange={editStudent}
                        />
                        <Button variant="contained" component="label">
                            Upload
                            <input name='studentImage' onChange={changeHandler} hidden accept="image/*" type="file" />
                        </Button>
                        <Typography>{imgPath}</Typography>

                        <div align="right">
                            <Button onClick={() => props.value.history.push('/student')} style={{ marginRight: '15px' }} variant="outlined" startIcon={<CloseIcon />}>
                                Cancel
                            </Button>
                            <Button type='submit' variant="contained" startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </div>
                    </form>
                </Card> : <div>Not found</div>
        }

        </>
    );
}
export default EditStudent
