import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
import Config from '../config';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';

function ViewStaff(props) {
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

    return (
        <>
            {
                loading ? <div>...loading</div> :
                    <Card style={{ padding: '30px' }} variant="outlined">
                        <div className='cardHeading'>
                            <Typography variant="h4" component="h2">
                                Staff
                            </Typography>
                            <Button onClick={() => props.value.history.push('/staff')} variant="contained" startIcon={<ReplyIcon />}>
                                Back
                            </Button>
                        </div>
                        <Box mt={3} mb={2}>
                            <Typography variant="h5" >Staff Name</Typography>
                            <Typography variant="h5"> {Staff.staffName}</Typography>
                        </Box>
                        <Box mt={3} mb={2}>
                            <Typography variant="h5" >Email</Typography>
                            <Typography variant="h5"> {Staff.email}</Typography>
                        </Box>
                        <Box mt={3} mb={2}>
                            <Typography variant="h5" >Mobile no</Typography>
                            <Typography variant="h5"> {Staff.mobileNumber}</Typography>
                        </Box>
                        <Box mt={3} mb={2}>
                            <Typography variant="h5" >Date of Birth</Typography>
                            <Typography variant="h5"> {Moment(new Date(Staff.dob)).format("DD/MM/YYYY")}</Typography>
                        </Box>
                    </Card>
            }
        </>
    );
}
export default ViewStaff
