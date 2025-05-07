import { Container, Typography,  Card, CardContent,  Button, GridLegacy, Box, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import quizData from '../data/quiz.json';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';

interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  totalMarks: number;
  questions: Array<{
    id: number;
    question: string;
    options: Array<{
      id: number;
      text: string;
    }>;
    correctAnswer: number;
  }>;
}

const Home = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    // Convert the quizData.tests object to an array
    const quizArray = Object.values(quizData?.tests);
    setQuizzes(quizArray);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome to Tech Quiz
      </Typography>
      <GridLegacy container spacing={2} alignItems="stretch">
        {quizzes?.map((quiz) => (
          <GridLegacy
            item 
            xs={12} 
            sm={6} 
            md={4}
            lg={3} 
            key={quiz.id}
            sx={{ display: 'flex' }}
          >
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                 width: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.shadows[8],
                }
            }}>
              <CardContent 
                sx={{ 
                  flexGrow: 1, 
                  p: 2, 
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Box sx={{ mb: 1 }}>
                <Typography variant="h5" gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'flex-start',
                      minHeight: { xs: 'auto', sm: '3em' },
                    }}>
                  {quiz.title}
                </Typography>
                </Box>
                 <Box sx={{ mb: 1, flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {quiz.description}
                </Typography>
                </Box>
                 <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Duration: {quiz.duration} mins
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <QuizIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Questions: {quiz.questions.length}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <StarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      Total Marks: {quiz.totalMarks}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
               <Box 
                sx={{ 
                  p: 1, 
                  backgroundColor: 'grey.50',
                  borderTop: 1,
                  borderColor: 'grey.200'
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label={quiz.difficulty.toUpperCase()}
                      color={getDifficultyColor(quiz.difficulty)}
                      size="small"
                    />
                    <Chip 
                      label={`${quiz.questions.length} Questions`}
                      variant="outlined"
                      size="small"
                    />
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    sx={{
                      textTransform: 'none',
                      py: 1,
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                      }
                    }}
                  >
                    Start Quiz
                  </Button>
                </Stack>
              </Box>
            </Card>
          </GridLegacy>
        ))}
      </GridLegacy>
    </Container>
  );
};

export default Home;
