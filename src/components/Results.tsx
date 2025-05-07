import { Container, Paper, Typography, Button, Box,  } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { 
    score: 0, 
    total: 0, 
    answers: [] 
  };

  const percentage = Math.round((score / total) * 100);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Quiz Completed! 🎉
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Your Score: {score} / {total} ({percentage}%)
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {percentage >= 70 ? 'Great job!' : 'Keep practicing!'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          fullWidth
          sx={{ mt: 3 }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default Results;
