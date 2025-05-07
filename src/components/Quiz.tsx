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
import quizData from '../data/quiz.json'; // Adjust the path as necessary


interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  difficulty: string;
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

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: number;
  explanation?: string;
}

interface Test {
  difficulty: String;
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
  totalMarks: number;
}

interface UserAnswer {
  questionId: number;
  selectedOption: number | null;
}

const Quiz = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);


  useEffect(() => {
      // Convert the quizData.tests object to an array
      const quizArray = Object.values(quizData?.tests);
      setQuizzes(quizArray);
    }, []);

 // Load test data
  useEffect(() => {
    if (categoryId && quizzes) {
      const testData = quizzes.find(quiz => quiz.id === categoryId);
      if(testData){
        setTest(testData);
        setTimeLeft(testData.duration * 60); // Convert minutes to seconds
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [categoryId,quizzes]);

  // Initialize user answers
  useEffect(() => {
    if (test) {
      const initialAnswers = test.questions.map(question => ({
        questionId: question.id,
        selectedOption: null
      }));
      setUserAnswers(initialAnswers);
    }
  }, [test]);

  // Timer implementation
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (selectedOption: number) => {
    setUserAnswers(prev => prev.map((answer, index) => 
      index === currentQuestion
        ? { ...answer, selectedOption }
        : answer
    ));
  };

  const handleNext = () => {
    if (currentQuestion < (test?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!test) return;

    const finalScore = userAnswers.reduce((score, answer, index) => {
      if (answer.selectedOption === test.questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);

    navigate('/results', { 
      state: { 
        score: finalScore, 
        total: test.questions.length,
        answers: userAnswers,
        testId: test.id,
        testTitle: test.title
      } 
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!test) {
    return (
      <Container>
        <Alert severity="error">Test not found</Alert>
      </Container>
    );
  }

  const isLastQuestion = currentQuestion === test.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentAnswer = userAnswers[currentQuestion]?.selectedOption;
  const allQuestionsAnswered = userAnswers.every(answer => answer.selectedOption !== null);

  return (
    <Container >
      <Paper elevation={3} sx={{ p: 3, mt: 1 }}>
        {/* Quiz Header */}
        <Box sx={{ mb: 1,display:{md:'flex'}, justifyContent:'space-between',alignItems:'center' }}>
          <Typography variant="h5" gutterBottom>
            {test.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
              icon={<AccessTimeIcon />} 
              label={`Time Left: ${formatTime(timeLeft)}`} 
              color={timeLeft < 60 ? "error" : "default"}
            />
            <Chip 
              label={`${test.difficulty.toUpperCase()}`} 
              color={
                test.difficulty === 'easy' ? 'success' : 
                test.difficulty === 'medium' ? 'warning' : 'error'
              }
            />
          </Stack>
        </Box>

        {/* Progress Bar */}
        <LinearProgress 
          variant="determinate" 
          value={(currentQuestion / test.questions.length) * 100} 
          sx={{ mb: 2 }}
        />

        {/* Progress Info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {test.questions.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userAnswers.filter(answer => answer.selectedOption !== null).length} of {test.questions.length} answered
          </Typography>
        </Box>

        {/* Question */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {test.questions[currentQuestion].question}
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {test.questions[currentQuestion].options.map((option) => (
              <Button
                key={option.id}
                variant={currentAnswer === option.id ? "contained" : "outlined"}
                onClick={() => handleAnswerSelect(option.id)}
                fullWidth
                sx={{ 
                  justifyContent: 'flex-start', 
                  py: 1,
                  textTransform: 'none',
                  backgroundColor: currentAnswer === option.id ? 'primary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: currentAnswer === option.id ? 'primary.dark' : 'primary.light',
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
        <Box sx={{mt:1,display:'flex',justifyContent:'center'}} >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {test.questions.map((_, index) => (
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
