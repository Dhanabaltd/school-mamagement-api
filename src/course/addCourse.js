import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import Config from '../config';

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

function AddCourse(props) {
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const [staff, setStaff] = useState([]);

    const [Datas, setDatas] = useState({
        staffId: '',
        courseName: ''
    });
    const addNewCourse = e => {
        console.log(e.target.value)
        setDatas({ ...Datas, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        staffList();
    }, [])
    const staffList = () => {
        axios.get(`${Config.baseURL}/api/staffs`)
            .then(res => {
                console.log('res', res.data.data)
                setStaff(res.data.data);
            })
            .catch(error => {
                toast.error(error);
            });
    };
    const addCourseSubmit = (e) => {
        e.preventDefault();
        console.log('Datas',Datas)
        axios.post(`${Config.baseURL}/api/courses`, Datas)
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
        setPersonName(typeof value === 'string' ? value.split(',') : value);
        setDatas({ ...Datas, staffId: typeof value === 'string' ? value.split(',') : value, })
    };

    return (
        <div>
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
                    <FormControl fullWidth sx={{ mb: 2 }}>
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
                    </FormControl>
                    {console.log('personName', personName)}
                    {/* <TextField
                        required
                        style={{ marginBottom: '15px' }}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        label="Staff name"
                        name='staffId'
                        onChange={addNewCourse}
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

        </div>
    );
}

export default AddCourse
