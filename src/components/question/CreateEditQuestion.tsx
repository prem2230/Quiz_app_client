import { Add, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./question.styles";
import useQuestion from "./hooks";
import { useSnackbar } from "../snackbar/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { questionPayloadValidator } from "../../utils";

interface QuestionData {
    question: string,
    _id?: string,
    options: [
        {
            _id?: string
            text: string,
            isCorrect: boolean
        }
    ],
    explanation: string,
    marks: number,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}
interface Question {
    _id?: string,
    question: string,
    explanation: string,
    marks: number,
}
interface AnswerOption {
    _id?: string
    text: string,
    isCorrect: boolean
}

const MAX_QUES_CHAR = 200;
const MAX_EXPL_CHAR = 200;
const MAX_OPT_CHAR = 100;

const CreateEditQuestion = () => {
    const { questionId } = useParams();
    const styles = useStyles();
    const { setErrorSnack } = useSnackbar();
    const { createQuestion, updateQuestion, loadCurrentQuestion, currentQuestion } = useQuestion();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<Question>({
        question: "",
        explanation: "",
        marks: 0,
    });
    const [options, setOptions] = useState<AnswerOption[]>([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);
    const [ansAdded, setAnsAdded] = useState(Array(options.length).fill({ add: false }));

    useEffect(() => {
        if (questionId) {
            loadCurrentQuestion({ id: questionId });
        }
    }, [questionId])

    useEffect(() => {
        if (currentQuestion && 'options' in currentQuestion) {
            setQuestion({
                question: currentQuestion.question,
                explanation: currentQuestion.explanation,
                marks: currentQuestion.marks,
            });
            setOptions(currentQuestion.options);
            setAnsAdded(Array(currentQuestion.options.length).fill({ add: true }));
        }
    }, [currentQuestion])
    const handleQuestion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuestion((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newAns = [...options];
        newAns[index].text = e.target.value;
        setOptions(newAns);

        if (!newAns[index].text.length) {
            setAnsAdded((prev) => {
                const updated = [...prev];
                updated[index] = { add: false };
                setOptions((prev) => {
                    const updated = [...prev];
                    updated[index] = { text: "", isCorrect: false };
                    return updated;
                })
                return updated;
            })
        }
    }

    const handleRadio = (index: number) => {
        setOptions(prev => {
            return prev.map((opt, i) => {
                if (i === index) {
                    return {
                        ...opt,
                        isCorrect: !opt.isCorrect
                    };
                }
                return { ...opt }
            })
        })
    }

    const handleAnsAdded = (index: number) => {
        setAnsAdded((prev) => {
            const updated = [...prev];
            updated[index] = { add: true };
            updated.forEach((option, i) => {
                if (i !== index && !options[i]?.text.length) {
                    option.add = false;
                }
            })
            return updated;
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: QuestionData = {
            question: question.question,
            explanation: question.explanation,
            marks: question.marks,
            options: options.filter((opt) => opt.text.length) as [{ _id?: string; text: string; isCorrect: boolean }],
        };
        try {
            const validation = questionPayloadValidator(data);
            if (!validation.isValid) {
                setErrorSnack(validation.errorMessage || 'Validation failed');
                return
            }
            if (questionId) {
                updateQuestion({ id: questionId, data });
                navigate('/dashboard/view-questions') // need to fix
            } else {
                createQuestion(data);
                navigate('/dashboard') // need to fix
            }
        } catch (error: any) {
            setErrorSnack(error.message);
        }
    }

    return (
        <Container >
            <Typography variant="h4" fontWeight={600} textAlign={"center"}> {questionId ? `Edit` : `Create`} Question</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={styles.commonBox}>
                    <Typography variant="h6" sx={styles.commonLabel}>Add Question</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your question"
                        multiline
                        name="question"
                        value={question.question || ''}
                        onChange={handleQuestion}
                        rows={3}
                        helperText={`${question.question.length}/${MAX_QUES_CHAR} characters`}
                        FormHelperTextProps={{
                            sx: { ...styles.helperFormProps(question?.question.length, MAX_QUES_CHAR) }
                        }
                        }
                        sx={styles.commonTxtfield}
                    />
                </Box>
                <Box sx={styles.commonBox}>
                    <Typography variant="h6" sx={styles.commonLabel}>Add Answers</Typography>
                    <Grid container spacing={2} mt={1} mb={2}>
                        {options?.map((opt, index) => {
                            return (
                                <Grid sx={styles.optionGrid} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                                    {ansAdded[index].add && <TextField
                                        multiline
                                        rows={3}
                                        value={opt.text || ''}
                                        onChange={(e) => handleChange(e, index)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end" onClick={() => handleRadio(index)} sx={styles.inputIcon}>
                                                    {opt?.isCorrect ? <CheckCircle sx={styles.checkFill} /> : <CheckCircleOutline />}
                                                </InputAdornment>
                                            ),
                                        }}
                                        helperText={`${opt.text.length}/${MAX_OPT_CHAR} char`}
                                        FormHelperTextProps={{
                                            sx: { ...styles.helperFormProps(opt.text.length, MAX_OPT_CHAR) }
                                        }}
                                        sx={styles.optionTxtfield}
                                    />
                                    }
                                    {!ansAdded[index].add &&
                                        <Box sx={styles.ansToggleBox}
                                            onClick={() => handleAnsAdded(index)}>
                                            <Add />
                                            Add Answer
                                        </Box>
                                    }
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
                <Box sx={styles.commonBox}>
                    <Typography variant="h6" sx={styles.commonLabel}>Add Explanation</Typography>
                    <TextField
                        fullWidth
                        placeholder="Enter your explanation"
                        multiline
                        name="explanation"
                        value={question.explanation || ''}
                        onChange={handleQuestion}
                        rows={3}
                        helperText={`${question.explanation.length}/${MAX_EXPL_CHAR} characters`}
                        FormHelperTextProps={{
                            sx: { ...styles.helperFormProps(question.explanation.length, MAX_EXPL_CHAR) }
                        }}
                        sx={styles.commonTxtfield}
                    />
                </Box>
                <Box sx={styles.bottomBox}>
                    <Box>
                        <Typography variant="h6" sx={styles.commonLabel}>Add Marks</Typography>
                        <TextField
                            placeholder="Enter Marks"
                            multiline
                            fullWidth
                            name="marks"
                            onChange={handleQuestion}
                            value={question.marks || ''}
                            type="number"
                            sx={styles.commonTxtfield}
                        />
                    </Box>
                    <Button type="submit" sx={{ ...styles.actionBtn, ...styles.createBtn }}>{questionId ? `Save` : `Create`}</Button>
                </Box>
            </form>
        </Container >
    )
};

export default CreateEditQuestion;