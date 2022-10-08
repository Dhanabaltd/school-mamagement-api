import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DateFnsUtils from '@date-io/date-fns';
import { toast } from 'react-toastify';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import Config from '../config';

function EditStaff(props) {
    const [Staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const ID = props.value.match.params.id;
    useEffect(() => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/staffs/${ID}`)
            .then(res => {
                setStaff(res.data.data);
                setLoading(false);
            })
            .catch(error => {
                toast.error(error);
                setLoading(false);
            });

    }, [ID]);
    const editStaff = e => {
        setStaff(prev => {
            prev[e.target.name] = e.target.value
            return prev
        })
    };
    const handleDateChange1 = (date) => {
        setStaff({ ...Staff, dob: date });
    };

    const updateStaffSubmit = (e) => {
        e.preventDefault();
        axios.put(`${Config.baseURL}/api/staffs/${ID}`, Staff)
            .then(res => {
                toast.success(res.data.message);
                props.value.history.push('/staff');
            })
            .catch(error => {
                toast.error(error);
            });
    };

    return (
        <>
            {
                loading ? <div>...loading</div> : <Card style={{ padding: '30px' }} variant="outlined">
                    <Typography variant="h4" component="h2">
                        Edit Staff
                    </Typography>;
                    <form onSubmit={updateStaffSubmit} >
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper staffName"
                                label="Name"
                                defaultValue={Staff.staffName}
                                focused
                                name='staffName'
                                onChange={editStaff} />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Email"
                                defaultValue={Staff.email}
                                focused
                                disabled
                                onChange={editStaff} />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                required
                                id="demo-helper-text-misaligned-no-helper"
                                label="Mobile number"
                                defaultValue={Staff.mobileNumber}
                                focused
                                name='mobileNumber'
                                onChange={editStaff} />
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
                                    value={Staff.dob}
                                    InputAdornmentProps={{ position: "start" }}
                                    onChange={date => handleDateChange1(date)}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        <div align="right">
                            <Button onClick={() => props.value.history.push('/staff')} style={{ marginRight: '15px' }} variant="outlined" startIcon={<CloseIcon />}>
                                Cancel
                            </Button>
                            <Button type='submit' variant="contained" startIcon={<SaveIcon />}>
                                Save
                            </Button>
                        </div>
                    </form >
                </Card>
            }

        </>
    );
}
export default EditStaff
