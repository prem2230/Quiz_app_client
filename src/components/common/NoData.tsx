import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
    title?: string;
    message?: string;
    buttonText?: string;
    redirectPath?: string;
    isExam?: boolean;
}

const NoData: React.FC<NotFoundProps> = ({
    title = "No Data Found",
    message = "The resource you are looking for does not exist.",
    buttonText = "",
    redirectPath,
    isExam = false
}) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        if (redirectPath) {
            navigate(redirectPath);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
                p: 3
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" paragraph>
                {message}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'center', gap: 1 }}>
                {!isExam && <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)}
                >
                    {`Go Back`}
                </Button>
                }
                {buttonText && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleRedirect}
                    >
                        {buttonText}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default NoData;
