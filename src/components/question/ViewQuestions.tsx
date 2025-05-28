import { useEffect } from "react";
import useQuestion from "./hooks";
import { Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { useStyles } from "./question.styles";
import { getTimestampInfo } from "../../utils";
import { useNavigate } from "react-router-dom";
import QuestionCardLoader from "../loaders/QuestionCardLoader";
import AppLoader from "../loaders/AppLoader";
import NoData from "../common/NoData";
import Pagination from "../common/Pagination";

const ViewQuestions = () => {
    const styles = useStyles();
    const navigate = useNavigate();
    const { loading, saveLoading, loadAllQuestions, questions, deleteQuestion } = useQuestion();

    useEffect(() => {
        loadAllQuestions();
    }, [])

    const handleDeleteQues = (id: string) => {
        deleteQuestion({ id })
    }

    const handleModifyQues = (id: string) => {
        navigate(`/dashboard/edit-question/${id}`)
    }

    if (!questions.length && !loading) {
        return <NoData title="No Questions Found" buttonText="Create Question" redirectPath="/dashboard/create-question" />
    }

    return (
        <Container>
            <Typography variant="h4" fontWeight={600} textAlign={"center"}>Questions</Typography>
            {saveLoading && <AppLoader message="Deleting Question" />}
            {loading ? <QuestionCardLoader value={8} />
                :
                <Grid container spacing={2} mt={2}>
                    {questions?.map((question) => {
                        const { prefix, time } = getTimestampInfo(question?.createdAt, question?.updatedAt)
                        return (
                            <Grid sx={styles.cardGrid} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={question?._id}>
                                <Box sx={styles.cardBox}>
                                    <Box sx={styles.innerBox}>
                                        <Tooltip title={question?.question}>
                                            <Typography sx={styles.questionTxt}>{question?.question}</Typography>
                                        </Tooltip>
                                        <Typography sx={styles.marksTxt}>{question?.marks} Marks</Typography>

                                        <Box sx={styles.buttonDiv}>
                                            <Button onClick={() => handleModifyQues(question?._id)} sx={{ ...styles.actionBtn, ...styles.modifyBtn }}>Modify</Button>
                                            <Button onClick={() => handleDeleteQues(question?._id)} sx={{ ...styles.actionBtn, ...styles.deleteBtn }}>Delete</Button>
                                        </Box>
                                    </Box>
                                    <Typography sx={styles.cardFooterTxt}>{prefix} {time} </Typography>
                                </Box>
                            </Grid>
                        )
                    })}

                </Grid>
            }
            <Pagination module="question" />
        </Container >
    )
}

export default ViewQuestions;