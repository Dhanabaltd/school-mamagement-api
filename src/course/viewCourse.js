import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { toast } from 'react-toastify';
import axios from 'axios';
import Config from '../config';
import Button from '@mui/material/Button';
import ReplyIcon from '@mui/icons-material/Reply';

function ViewCourse(props) {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const ID = props.value.match.params.id;


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
    }, [ID]);


    return (
        <>
            {loading ? <div>...loading</div> :
                <Card style={{ padding: '30px' }} variant="outlined">
                    <div className='cardHeading'>
                        <Typography variant="h4" component="h2">
                            Course
                        </Typography>
                        <Button onClick={() => props.value.history.push('/course')} variant="contained" startIcon={<ReplyIcon />}>
                            Back
                        </Button>
                    </div>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Course Name</Typography>
                        <Typography variant="h5"> {course.courseName}</Typography>
                    </Box>
                    <Box mt={3} mb={2}>
                        <Typography variant="h5" >Staff Name</Typography>
                        <Typography variant="h5"> {course.staffName}</Typography>
                    </Box>

                </Card>
            }

        </>
    );
}
export default ViewCourse
