import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast } from 'react-toastify';
import Moment from 'moment';
import axios from 'axios';
import Config from '../config';

function ViewStudent(props) {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(false);
    const ID = props.value.match.params.id;
    useEffect(() => {
        setLoading(true)
        axios.get(`${Config.baseURL}/api/students/${ID}`)
            .then(res => {
                setStudent(res.data.data);
                setLoading(false)
            })
            .catch(error => {
                toast.error(error);
                setLoading(false)
            });

    }, [ID]);

    return (
        <>{
            loading ? <div>...loading</div> :
                <Card style={{ padding: '30px' }} variant="outlined">
                    <div className='cardHeading'>
                        <Typography variant="h4" component="h2">
                            Student
                        </Typography>
                        <Button onClick={() => props.value.history.push('/student')} variant="contained" startIcon={<ReplyIcon />}>
                            Back
                        </Button>
                    </div>
                    <Box mt={3} mb={2}>
                        <img className='imgView' src={`${Config.baseURL}/${student?.studentImage?.replace(/\\/g, "/")}`} alt="" />
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Student Name</Typography>
                        <Typography variant="h5"> {student.studentName}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Email</Typography>
                        <Typography variant="h5"> {student.email}</Typography>
                    </Box><Box mt={3} mb={2}>
                        <Typography variant="h5" >Date of Birth</Typography>
                        <Typography variant="h5"> {Moment(new Date(student.dob)).format("DD/MM/YYYY")}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Blood Group</Typography>
                        <Typography variant="h5"> {student.bloodGroup}</Typography>
                    </Box><Box mt={3} mb={2}>
                        <Typography variant="h5" >Father Name</Typography>
                        <Typography variant="h5"> {student.fatherName}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Mother Name</Typography>
                        <Typography variant="h5"> {student.motherName}</Typography>
                    </Box><Box mt={3} mb={2}>
                        <Typography variant="h5" >Course Name</Typography>
                        <Typography variant="h5"> {student.course}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Staff Name</Typography>
                        <Typography variant="h5"> {student.staffName}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Address</Typography>
                        <Typography variant="h5"> {student.address}</Typography>
                    </Box>
                </Card>
        }

        </>
    );
}
export default ViewStudent
