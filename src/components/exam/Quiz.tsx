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
        return score + (question.marks || 1);
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
      <Box sx={styles.examContainer}>
        <Typography variant="h6" sx={styles.examTitle}>
          {standardCase(quiz.title)}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={styles.headerStack}>
          <Box sx={styles.timerBox}>
            <AccessTimeIcon sx={styles.timerIcon} />
            <Typography
              sx={styles.timerText(timeLeft)}
            >
              {formatTime(timeLeft)}
            </Typography>
          </Box>

          <Box sx={{
            backgroundColor: getDifficultyStyle(quiz.difficulty, styles),
            ...styles.examDifficulty
          }}>
            {standardCase(quiz.difficulty)}
          </Box>
        </Stack>
      </Box>

      <Box sx={styles.progressBox}>
        <Box sx={styles.progressDetails}>

          <Typography sx={styles.progressTypography}>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </Typography>
          <Typography variant="body2" sx={styles.progressTypography}>
            {userAnswers.filter(answer => answer.selectedOption !== null).length} answered
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / quiz.questions.length) * 100}
          sx={styles.progressBar}
        />
      </Box>

      <Box sx={styles.questionContainer}>
        <Typography
          variant="h6"
          gutterBottom
          sx={styles.questionText}
        >
          {quiz.questions[currentQuestion].question}
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          {quiz.questions[currentQuestion].options?.map((option) => (
            <Button
              key={option._id}
              onClick={() => handleAnswerSelect(option._id)}
              fullWidth
              sx={styles.answerOptions(currentAnswer, option)}
            >
              {option.text}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={isFirstQuestion}
          startIcon={<ArrowBackIcon />}
          sx={{ ...styles.button, ...styles.prevNextButton }}
        >
          Prev
        </Button>

        {isLastQuestion ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            endIcon={<CheckCircleIcon />}
            sx={{ ...styles.button, ...styles.submitButton }}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentAnswer === null}
            endIcon={<ArrowForwardIcon />}
            sx={{ ...styles.button, ...styles.prevNextButton }}
          >
            Next
          </Button>
        )}
      </Box>

      <Box sx={styles.numberBox}>
        <Box sx={styles.numberGroup}>
          {quiz.questions.map((_, index) => {
            const isAnswered = userAnswers[index]?.selectedOption !== null;
            const isCurrent = currentQuestion === index;

            return (
              <Button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                sx={styles.numberButton(isCurrent, isAnswered)}
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
