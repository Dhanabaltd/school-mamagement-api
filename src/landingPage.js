import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';


function LandingPage(props) {
    return (
        <>
            <Card style={{ padding: '30px' }} variant="outlined">
                <div className='landingPage'>
                    <Typography variant="h5" component="h2">
                        Welcome Back!!!
                    </Typography>
                    <Typography variant="h4" component="h2">
                        Ocean School Management
                    </Typography>
                </div>
            </Card>
        </>
    );
}
export default LandingPage
