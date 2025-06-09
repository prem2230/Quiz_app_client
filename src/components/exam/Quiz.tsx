import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  LinearProgress,
  Box,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useQuiz } from '../quiz/hooks';

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
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { loadCurrentQuiz, currentQuiz, loading: quizLoading } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Load quiz data
  useEffect(() => {
    if (quizId) {
      loadCurrentQuiz({ id: quizId });
    }
  }, [quizId, loadCurrentQuiz]);

  // Set quiz data when loaded
  useEffect(() => {
    if (currentQuiz && Object.keys(currentQuiz).length > 0) {
      setQuiz(currentQuiz as Quiz);
      setLoading(false);

      // Initialize timer when quiz is loaded
      if ((currentQuiz as Quiz).duration) {
        setTimeLeft((currentQuiz as Quiz).duration * 60); // Convert minutes to seconds
      }
    }
  }, [currentQuiz]);

  // Initialize user answers
  useEffect(() => {
    if (quiz && quiz.questions) {
      const initialAnswers = quiz.questions.map(question => ({
        questionId: question._id,
        selectedOption: null
      }));
      setUserAnswers(initialAnswers);
    }
  }, [quiz]);

  // Timer implementation
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) {
      if (quiz) { // Only submit if quiz is loaded
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
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
        {/* Quiz Header */}
        <Box sx={{ mb: 1, display: { md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {quiz.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<AccessTimeIcon />}
              label={`Time Left: ${formatTime(timeLeft)}`}
              color={timeLeft < 60 ? "error" : "default"}
            />
            <Chip
              label={`${quiz.difficulty.toUpperCase()}`}
              color={
                quiz.difficulty === 'easy' ? 'success' :
                  quiz.difficulty === 'medium' ? 'warning' : 'error'
              }
            />
          </Stack>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / quiz.questions.length) * 100}
          sx={{ mb: 2 }}
        />

        {/* Progress Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userAnswers.filter(answer => answer.selectedOption !== null).length} of {quiz.questions.length} answered
          </Typography>
        </Box>

        {/* Question */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {quiz.questions[currentQuestion].question}
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {quiz.questions[currentQuestion].options?.map((option) => (
              <Button
                key={option._id}
                variant={currentAnswer === option._id ? "contained" : "outlined"}
                onClick={() => handleAnswerSelect(option._id)}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  py: 1,
                  textTransform: 'none',
                  backgroundColor: currentAnswer === option._id ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: currentAnswer === option._id ? 'primary.dark' : 'primary.light',
                    color: 'white'
                  }
                }}
              >
                {option.text}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          >
            Previous
          </Button>

          <Box>
            {isLastQuestion ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={currentAnswer === null}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }} >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "contained" : "outlined"}
                size="small"
                onClick={() => setCurrentQuestion(index)}
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  m: 0.5,
                  color: userAnswers[index]?.selectedOption !== null ? 'white' : '',
                  backgroundColor: userAnswers[index]?.selectedOption !== null
                    ? (currentQuestion === index ? 'primary.main' : 'success.light')
                    : (currentQuestion === index ? 'primary.main' : undefined)
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Quiz;
