import { useEffect } from "react";
import useQuestion from "./hooks";
import { Box, Button, Container, Grid, Tooltip, Typography } from "@mui/material";
import { useStyles } from "./question.styles";
import { getTimestampInfo } from "../../utils";

const ViewQuestions = () => {

    const styles = useStyles();
    const { loadAllQuestions, questions } = useQuestion();

    useEffect(() => {
        loadAllQuestions();
    }, [])

    return (
        <Container>
            <Typography variant="h4" fontWeight={600} textAlign={"center"}>Questions</Typography>
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
                                        <Button sx={{ ...styles.actionBtn, ...styles.modifyBtn }}>Modify</Button>
                                        <Button sx={{ ...styles.actionBtn, ...styles.deleteBtn }}>Delete</Button>
                                    </Box>
                                </Box>
                                <Typography sx={styles.cardFooterTxt}>{prefix} {time} </Typography>
                            </Box>
                        </Grid>
                    )
                })}

            </Grid>
        </Container >
    )
}

export default ViewQuestions;