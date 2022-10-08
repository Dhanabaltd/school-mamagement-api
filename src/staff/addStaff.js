import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
function AddStaff(props) {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [datas, setDatas] = useState({
        staffName: '',
        email: '',
        mobileNumber: 0,
        dob: Moment(new Date(selectedDate)).format("DD/MM/YYYY")
    });
    const addNewStaff = e => {
        setDatas({ ...datas, [e.target.name]: e.target.value });
    };
    const handleDateChange1 = (date) => {
        handleDateChange(date)
    };

    const addStaffSubmit = (e) => {
        e.preventDefault();
        axios.post(`${Config.baseURL}/api/staffs`, datas)
            .then(res => {
                toast.success(res.data.message);
                props.value.history.push('/staff')
            })
            .catch(error => {
                toast.error(error);
            });
    };

    return (
        <>
            <Card style={{ padding: '30px' }} variant="outlined">
                <Typography variant="h4" component="h2">
                    Add Staff
                </Typography>;
                <form onSubmit={addStaffSubmit} >
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper staffName"
                            name='staffName'
                            label="Staff Name"
                            onChange={addNewStaff} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper email"
                            name='email'
                            label="Email"
                            onChange={addNewStaff} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            required
                            id="demo-helper-text-misaligned-no-helper mobileNumber"
                            name='mobileNumber'
                            label="Mobile number"
                            onChange={addNewStaff} />
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
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => handleDateChange1(date)}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <div align="right">
                        <Button onClick={() => props.value.history.push('/staff')} style={{ marginRight: '15px' }} variant="outlined" startIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </div>
                </form>
            </Card>

        </>
    );
}
export default AddStaff
