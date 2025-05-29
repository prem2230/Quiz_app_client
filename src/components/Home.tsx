import { Container, Typography, Card, CardContent, Button, Box, Stack, Chip, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';
import { useQuiz } from './quiz/hooks';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { loadAllQuizzes, quizzes } = useQuiz();

  useEffect(() => {
    loadAllQuizzes();
  }, [])

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
      <Grid container spacing={2} alignItems="stretch">
        {quizzes?.map((quiz) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={quiz._id} sx={{ display: 'flex' }}>
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
                    onClick={() => navigate(`/quiz/${quiz._id}`)}
                    sx={{
                      textTransform: 'none',
                      py: 1,
                      borderRadius: 2,
                      background: theme.palette.primary.main,
                      '&:hover': {
                        background: theme.palette.secondary.main,
                      }
                    }}
                  >
                    Start Quiz
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
