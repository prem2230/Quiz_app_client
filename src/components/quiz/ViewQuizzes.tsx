import { Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { useQuiz } from "./hooks";
import { useEffect } from "react";
import { Update } from "@mui/icons-material";
import { useStyles } from "./quiz.styles";
import { getDifficultyStyle, getTimestampInfo, standardCase } from "../../utils";
import { useNavigate } from "react-router-dom";
import AppLoader from "../loaders/AppLoader";
import QuestionCardLoader from "../loaders/QuestionCardLoader";
import Pagination from "../common/Pagination";
import NoData from "../common/NoData";

const ViewQuizzes = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { loadAllQuizzes, quizzes, deleteQuiz, saveLoading, loading } = useQuiz();

    useEffect(() => {
        loadAllQuizzes();
    }, [])

    const handleModifyQuiz = (id: string) => {
        navigate(`/dashboard/edit-quiz/${id}`)
    }

    const handleDeleteQuiz = (id: string) => {
        deleteQuiz({ id })
    }

    if (!quizzes.length) {
        return <NoData title="No Quizzes Found" buttonText="Create Quiz" redirectPath="/dashboard/create-quiz" />
    }


    return (
        <Container>
            {saveLoading && <AppLoader message="Deleting Quiz" />}
            <Typography variant="h4" fontWeight={600} textAlign={"center"}>Quizzes</Typography>
            {loading ? <QuestionCardLoader value={8} />
                :
                <Grid container spacing={2} mt={2}>
                    {quizzes?.map((quiz) => {
                        const { prefix, time } = getTimestampInfo(quiz.createdAt, quiz.updatedAt)
                        return (
                            <Grid key={quiz._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={styles.cardGrid}>
                                <Box sx={styles.cardBox}>
                                    <Box sx={styles.innerBox}>
                                        <Tooltip title={quiz.title}>
                                            <Typography sx={styles.quizTxt}>{standardCase(quiz.title)}</Typography>
                                        </Tooltip>
                                        <Box sx={styles.quizInfoBox}>
                                            <Box sx={{ ...styles.difficultyChip, ...getDifficultyStyle(quiz.difficulty, styles) }}>
                                                <Typography sx={styles.chipText} fontWeight={500}>
                                                    {standardCase(quiz.difficulty)}
                                                </Typography>
                                            </Box>
                                            <Box sx={styles.durationChip}>
                                                <Update sx={styles.chipIcon} />
                                                <Typography sx={styles.chipText} fontWeight={500}>
                                                    {quiz.duration} min
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={styles.buttonDiv}>
                                            <Button onClick={() => handleModifyQuiz(quiz._id)} sx={{ ...styles.actionBtn, ...styles.modifyBtn }}>Modify</Button>
                                            <Button onClick={() => handleDeleteQuiz(quiz._id)} sx={{ ...styles.actionBtn, ...styles.deleteBtn }}>Delete</Button>
                                        </Box>
                                    </Box>
                                    <Typography sx={styles.cardFooterTxt}>{prefix} {time} </Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            }

            <Pagination module="quiz" />
        </Container >
    )
}

export default ViewQuizzes;