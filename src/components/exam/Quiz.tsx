import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Stack,
  LinearProgress,
  Box,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { useQuiz } from '../quiz/hooks';
import { getDifficultyStyle, standardCase } from '../../utils';
import { useStyles } from './exam.styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface Question {
  question?: string,
  _id: string,
  options?: [
    {
      _id: string
      text: string,
      isCorrect: boolean
    }
  ],
  explanation?: string,
  marks?: number,
  createdBy?: string,
  updatedBy?: string,
  createdAt?: string,
  updatedAt?: string,
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard',
  questions: Question[];
  totalMarks?: number;
}

interface UserAnswer {
  questionId: string;
  selectedOption: string | null;
}

const Quiz = () => {
  const theme = useTheme();
  const styles = useStyles();
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { loadCurrentQuiz, currentQuiz, loading: quizLoading } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (quizId) {
      loadCurrentQuiz({ id: quizId });
    }
  }, [quizId, loadCurrentQuiz]);

  useEffect(() => {
    if (currentQuiz && Object.keys(currentQuiz).length > 0) {
      setQuiz(currentQuiz as Quiz);
      setLoading(false);

      if ((currentQuiz as Quiz).duration) {
        setTimeLeft((currentQuiz as Quiz).duration * 60);
      }
    }
  }, [currentQuiz]);

  useEffect(() => {
    if (quiz && quiz.questions) {
      const initialAnswers = quiz.questions.map(question => ({
        questionId: question._id,
        selectedOption: null
      }));
      setUserAnswers(initialAnswers);
    }
  }, [quiz]);

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) {
      if (quiz) {
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (selectedOption: string) => {
    setUserAnswers(prev => prev.map((answer, index) =>
      index === currentQuestion
        ? { ...answer, selectedOption }
        : answer
    ));
  };

  const handleNext = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;

    const finalScore = userAnswers.reduce((score, answer, index) => {
      const question = quiz.questions[index];
      const correctOption = question.options?.find(opt => opt.isCorrect);

      if (correctOption && answer.selectedOption === correctOption._id) {
        return score + (question.marks || 1); // Use question marks or default to 1
      }
      return score;
    }, 0);

    navigate('/results', {
      state: {
        score: finalScore,
        total: quiz.questions.reduce((sum, q) => sum + (q.marks || 1), 0),
        answers: userAnswers,
        quizId: quiz._id,
        quizTitle: quiz.title
      }
    });
  };

  if (loading || quizLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container>
        <Alert severity="error">Quiz not found</Alert>
      </Container>
    );
  }

  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentAnswer = userAnswers[currentQuestion]?.selectedOption;
  const allQuestionsAnswered = userAnswers.every(answer => answer.selectedOption !== null);

  return (
    <Container maxWidth="xl">
      <Box sx={{
        mb: 1,
        background: theme.palette.secondary.light,
        p: 2,
        borderRadius: 5,
        boxShadow: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2
      }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            position: 'relative',
            fontStyle: 'italic',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: 60,
              height: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          {standardCase(quiz.title)}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flexWrap: 'wrap' }}
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            px: 2,
            borderRadius: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <AccessTimeIcon sx={{ color: theme.palette.primary.main, fontSize: '0.875rem' }} />
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: timeLeft < 60 ? theme.palette.error.main : theme.palette.text.primary
              }}
            >
              {formatTime(timeLeft)}
            </Typography>
          </Box>

          <Box sx={{
            backgroundColor: getDifficultyStyle(quiz.difficulty, styles),
            color: '#fff',
            px: 2,
            borderRadius: 10,
            fontWeight: 600,
            fontSize: '0.875rem',
            fontStyle: 'italic',
            letterSpacing: 1
          }}>
            {standardCase(quiz.difficulty)}
          </Box>
        </Stack>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ position: 'relative', mx: 2, mt: 2 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          // mt: 1,
          px: 0.5
        }}>

          <Typography sx={{
            textAlign: 'center',
            mb: 1,
            fontSize: '0.875rem',
          }}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Typography>
          <Typography variant="body2" sx={{
            textAlign: 'center',
            mb: 1,
            fontSize: '0.875rem',
          }}>
            {userAnswers.filter(answer => answer.selectedOption !== null).length} answered
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / quiz.questions.length) * 100}
          sx={{
            height: 10,
            borderRadius: 4,
            backgroundColor: theme.palette.secondary.light,
            // '& .MuiLinearProgress-bar': {
            //   borderRadius: 4,
            //   backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
            // }
          }}
        />
      </Box>

      <Box sx={{
        my: 2,
        backgroundColor: theme.palette.secondary.light,
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        p: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          {quiz.questions[currentQuestion].question}
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          {quiz.questions[currentQuestion].options?.map((option) => (
            <Button
              key={option._id}
              onClick={() => handleAnswerSelect(option._id)}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                px: 2.5,
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 500,
                fontSize: '1rem',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                backgroundColor: currentAnswer === option._id
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                color: currentAnswer === option._id
                  ? '#fff'
                  : theme.palette.text.primary,
                border: currentAnswer === option._id
                  ? 'none'
                  : '1px solid rgba(0,0,0,0.1)',
                boxShadow: currentAnswer === option._id
                  ? `0 4px 12px ${theme.palette.primary.main}80`
                  : 'none',
                '&:hover': {
                  backgroundColor: currentAnswer === option._id
                    ? theme.palette.primary.dark
                    : theme.palette.secondary.main,
                  color: theme.palette.text.secondary,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
                }
              }}
            >
              {option.text}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: 10,
            px: 3,
            py: 1,
            fontWeight: 600,
            border: theme.palette.secondary.main,
            color: theme.palette.text.secondary,
            background: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: 10,
            },
            '&.Mui-disabled': {
              opacity: 0.5,
              border: theme.palette.secondary.main,
              background: theme.palette.secondary.light,
              color: theme.palette.text.primary
            }
          }}
        >
          Prev
        </Button>

        {isLastQuestion ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            endIcon={<CheckCircleIcon />}
            sx={{
              borderRadius: 10,
              px: 3,
              py: 1,
              fontWeight: 600,
              border: theme.palette.secondary.main,
              color: theme.palette.text.secondary,
              background: theme.palette.success.light,
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
                boxShadow: 10,
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                border: theme.palette.secondary.main,
                background: theme.palette.secondary.light,
                color: theme.palette.text.primary
              }
            }}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentAnswer === null}
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 10,
              px: 3,
              py: 1,
              fontWeight: 600,
              border: theme.palette.secondary.main,
              color: theme.palette.text.secondary,
              background: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: 10,
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                border: theme.palette.secondary.main,
                background: theme.palette.secondary.light,
                color: theme.palette.text.primary
              }
            }}
          >
            Next
          </Button>
        )}
      </Box>

      <Box sx={{
        mt: 4,
        pt: 3,
        borderTop: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          maxWidth: '100%'
        }}>
          {quiz.questions.map((_, index) => {
            const isAnswered = userAnswers[index]?.selectedOption !== null;
            const isCurrent = currentQuestion === index;

            return (
              <Button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  p: 0,
                  fontWeight: 600,
                  color: isCurrent
                    ? '#fff'
                    : isAnswered
                      ? theme.palette.success.main
                      : theme.palette.text.primary,
                  backgroundColor: isCurrent
                    ? theme.palette.primary.main
                    : isAnswered
                      ? 'rgba(76, 175, 80, 0.1)'
                      : 'rgba(255,255,255,0.8)',
                  border: isAnswered && !isCurrent
                    ? `2px solid ${theme.palette.success.main}`
                    : isCurrent
                      ? 'none'
                      : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: isCurrent
                    ? `0 4px 10px ${theme.palette.primary.main}80`
                    : 'none',
                  '&:hover': {
                    backgroundColor: isCurrent
                      ? theme.palette.primary.dark
                      : isAnswered
                        ? 'rgba(76, 175, 80, 0.2)'
                        : 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {index + 1}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Container >

  );
};

export default Quiz;
