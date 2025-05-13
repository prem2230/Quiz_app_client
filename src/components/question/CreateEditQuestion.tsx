import { Add, CheckCircle, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./question.styles";

interface Question {
    question: string,
    explanation: string,
    marks: number,
}
interface AnswerOption {
    text: string,
    isCorrect: boolean
}
const MAX_QUES_CHAR = 200;
const MAX_EXPL_CHAR = 200;
const MAX_OPT_CHAR = 100;

const CreateEditQuestion = () => {
    const styles = useStyles();
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
        setOptions((prev => {
            const updated = [...prev];
            updated.forEach((option, i) => {
                option.isCorrect = i === index;
            })
            return updated;
        }))
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = {};
        data = {
            ...question,
            options: options.filter((opt) => opt.text.length)
        }
        console.log(data);
    }

    // useEffect(() => {
    //     console.log('uuuu', question);
    //     console.log('options', options)
    // }, [question, options])
    return (
        <Container >
            <Typography variant="h4" fontWeight={600} textAlign={"center"}>Create Question</Typography>
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
                            type="number"
                            sx={styles.commonTxtfield}
                        />
                    </Box>
                    <Button type="submit" sx={{ ...styles.actionBtn, ...styles.createBtn }}>Create</Button>
                </Box>
            </form>
        </Container >
    )
};

export default CreateEditQuestion;