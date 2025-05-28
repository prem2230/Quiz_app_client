import { Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStyles } from "./quiz.styles";
import { useNavigate, useParams } from "react-router-dom";
import { getActivePositionDifficulty, getActivePositionDuration, quizPayloadValidator } from "../../utils";
import QuestionSelector from "./QuestionSelector";
import { useQuiz } from "./hooks";
import { useSnackbar } from "../snackBar/hooks";
import AppLoader from "../loaders/AppLoader";
import EditQuizLoader from "../loaders/EditQuizLoader";

interface Question {
    question?: string,
    _id: string,
    options?: [
        {
            _id?: string
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
    _id?: string,
    title: string,
    description: string,
    duration: number,
    difficulty: 'easy' | 'medium' | 'hard',
    questions: Question[],
}

const MAX_TITLE_CHAR = 50;
const MAX_DESC_CHAR = 200;

const CreateEditQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const styles = useStyles();
    const { createQuiz, updateQuiz, loadCurrentQuiz, currentQuiz, saveLoading, loading } = useQuiz();
    const { setErrorSnack } = useSnackbar();
    const [quiz, setQuiz] = useState<Quiz>({
        title: "",
        description: "",
        difficulty: 'easy',
        duration: 30,
        questions: []
    })
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if (quizId) {
            loadCurrentQuiz({ id: quizId });
        }
    }, [quizId])

    useEffect(() => {
        if (currentQuiz && 'questions' in currentQuiz) {
            setQuiz({
                title: currentQuiz.title,
                description: currentQuiz.description,
                difficulty: currentQuiz.difficulty,
                duration: currentQuiz.duration,
                questions: currentQuiz.questions as Question[],
            })
            setSelectedQuestions(currentQuiz.questions as Question[])
        }
    }, [currentQuiz])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuiz((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleDifficultyChange = (
        _event: React.MouseEvent<HTMLElement>,
        newDifficulty: 'easy' | 'medium' | 'hard',
    ) => {
        if (newDifficulty !== null) {
            setQuiz({ ...quiz, difficulty: newDifficulty });
        }
    };
    const handleDurationChange = (
        _event: React.MouseEvent<HTMLElement>,
        newDuration: number,
    ) => {
        if (newDuration !== null) {
            setQuiz({ ...quiz, duration: newDuration });
        }
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: Quiz = {
            title: quiz.title,
            description: quiz.description,
            difficulty: quiz.difficulty,
            duration: quiz.duration,
            questions: selectedQuestions as Question[],
        }

        try {
            const validation = quizPayloadValidator(data);
            if (!validation.isValid) {
                setErrorSnack(validation.errorMessage || 'Validation failed');
                return
            }
            if (quizId) {
                updateQuiz({ id: quizId, data: data, navigate });
            } else {
                createQuiz({ data: data, navigate });
            }
        } catch (error: any) {
            setErrorSnack(error.message);
        }
    }


    return (
        <Container >
            {saveLoading && <AppLoader message={quizId ? 'Saving Quiz' : 'Creating Quiz'} />}
            <Typography variant="h4" fontWeight={600} textAlign={"center"}> {quizId ? `Edit` : `Create`} Quiz</Typography>
            {loading ? <EditQuizLoader />
                :
                <form onSubmit={handleSubmit}>
                    <Box sx={styles.commonBox}>
                        <Typography sx={styles.commonLabel} variant="h6">Add Title</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter your title"
                            multiline
                            name="title"
                            value={quiz.title || ''}
                            onChange={handleChange}
                            rows={1}
                            helperText={`${quiz.title.length}/${MAX_TITLE_CHAR} characters`}
                            FormHelperTextProps={{
                                sx: { ...styles.helperFormProps(quiz?.title.length, MAX_TITLE_CHAR) }
                            }
                            }
                            sx={styles.commonTxtfield}
                        />
                    </Box>
                    <Box sx={styles.commonBox}>
                        <Typography sx={styles.commonLabel} variant="h6" >Add Description</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter your description"
                            multiline
                            name="description"
                            value={quiz.description || ''}
                            onChange={handleChange}
                            rows={3}
                            helperText={`${quiz.description.length}/${MAX_DESC_CHAR} characters`}
                            FormHelperTextProps={{
                                sx: { ...styles.helperFormProps(quiz.description.length, MAX_DESC_CHAR) }
                            }}
                            sx={styles.commonTxtfield}
                        />
                    </Box>
                    <Grid container sx={styles.commonBox}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={styles.commonLabel} variant="h6" >Choose Difficulty</Typography>
                            <ToggleButtonGroup
                                color="primary"
                                value={quiz.difficulty}
                                exclusive
                                onChange={handleDifficultyChange}
                                aria-label="quiz difficulty"
                                sx={styles.toggleButtonGroup}
                            >
                                <ToggleButton
                                    value="easy"
                                    disableRipple
                                    sx={styles.toggleButton}
                                >
                                    Easy
                                </ToggleButton>
                                <ToggleButton
                                    value="medium"
                                    disableRipple
                                    sx={styles.toggleButton}
                                >
                                    Medium
                                </ToggleButton>
                                <ToggleButton
                                    value="hard"
                                    disableRipple
                                    sx={styles.toggleButton}
                                >
                                    Hard
                                </ToggleButton>
                                <Box sx={{
                                    ...styles.toggleActiveIndicator,
                                    left: getActivePositionDifficulty(quiz.difficulty),
                                }}
                                />
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={styles.commonLabel} variant="h6" >Choose Duration</Typography>

                            <ToggleButtonGroup
                                color="primary"
                                value={quiz.duration}
                                exclusive
                                onChange={handleDurationChange}
                                aria-label="quiz duration"
                                sx={styles.toggleButtonGroupDuration}
                            >
                                <ToggleButton
                                    value={30}
                                    disableRipple
                                    sx={styles.toggleButtonDuration}
                                >
                                    30 min
                                </ToggleButton>
                                <ToggleButton
                                    value={60}
                                    disableRipple
                                    sx={styles.toggleButtonDuration}
                                >
                                    60 min
                                </ToggleButton>
                                <ToggleButton
                                    value={90}
                                    disableRipple
                                    sx={styles.toggleButtonDuration}
                                >
                                    90 min
                                </ToggleButton>
                                <ToggleButton
                                    value={120}
                                    disableRipple
                                    sx={styles.toggleButtonDuration}
                                >
                                    120 min
                                </ToggleButton>
                                <Box sx={{
                                    ...styles.toggleActiveDurationIndicator,
                                    left: getActivePositionDuration(quiz.duration),
                                }}
                                />
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>

                    <Box sx={styles.commonBox} >
                        <Typography sx={styles.commonLabel} variant="h6" >Choose Questions</Typography>
                        <QuestionSelector selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions} />
                    </Box>
                    <Box sx={styles.bottomBox}>
                        <Box>
                            <Typography variant="h6" sx={styles.commonLabel}>Total Marks</Typography>
                            <TextField
                                placeholder="Enter Marks"
                                multiline
                                fullWidth
                                name="marks"
                                value={selectedQuestions.reduce((acc, question) => acc + (question.marks || 0), 0) || 0}
                                type="number"
                                disabled
                                sx={styles.commonTxtfield}
                            />
                        </Box>
                        <Button type="submit" sx={{ ...styles.actionBtn, ...styles.createBtn }}>{quizId ? `Save` : `Create`}</Button>
                    </Box>
                </form>
            }
        </Container >
    )
};

export default CreateEditQuiz;
