import { Container, Typography, Button, Box, Grid, useTheme, Tooltip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuiz } from '../quiz/hooks';
import { standardCase } from '../../utils';

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
        return theme.palette.success.light;
      case 'medium':
        return theme.palette.warning.light;
      case 'hard':
        return theme.palette.error.light;
      default:
        return theme.palette.grey[300];
    }
  };


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome to Tech Quiz
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {quizzes?.map((quiz) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={quiz._id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            <Box sx={{
              background: theme.palette.secondary.light,
              p: 2,
              width: 300,
              height: 200,
              borderRadius: 5,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: (theme) => theme.shadows[8],
              }
            }}>
              <Box sx={{ height: 25 }}>
                <Tooltip title={quiz.title} >
                  <Typography sx={{
                    fontWeight: '600',
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {quiz.title}
                  </Typography>
                </Tooltip>
              </Box>
              <Divider />
              <Box sx={{ height: 30, my: 1 }}>
                <Typography sx={{
                  fontSize: '0.8rem',
                  mt: 1,
                  color: theme.palette.text.primary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {quiz.description}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
                alignItems: 'center',
                my: 1,
                height: 30,
              }}>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.7rem',
                  color: theme.palette.secondary.main,
                  px: 1,
                  borderRadius: 5,
                  border: 1,
                  fontStyle: 'italic',
                }}>
                  {quiz.questions.length} Questions
                </Typography>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.7rem',
                  color: theme.palette.secondary.main,
                  px: 1,
                  borderRadius: 5,
                  border: 1,
                  fontStyle: 'italic',
                }}>
                  {quiz.totalMarks} Marks
                </Typography>
                <Typography sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.7rem',
                  color: theme.palette.secondary.main,
                  px: 1,
                  borderRadius: 5,
                  border: 1,
                  fontStyle: 'italic',
                }}>
                  {quiz.duration} minutes
                </Typography>
              </Box>
              <Box sx={{
                textAlign: 'center',
                height: 25,
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography sx={{
                  fontStyle: 'italic',
                  fontSize: '0.8rem',
                  px: 2,
                  background: getDifficultyColor(quiz.difficulty),
                  borderRadius: 5,
                }}>

                  {standardCase(quiz.difficulty)}
                </Typography>
              </Box>
              <Box sx={{
                pt: 1,
                height: 30,
              }}>

                <Button fullWidth variant='contained' sx={{
                  textTransform: 'none',
                  borderRadius: 5,
                  px: 2,
                  py: 0,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    background: theme.palette.secondary.main,
                  }
                }}
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                >Start Quiz</Button>
              </Box>
            </Box>

          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
