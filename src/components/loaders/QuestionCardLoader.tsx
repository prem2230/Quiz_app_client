import { Box, Container, Grid, Skeleton } from "@mui/material";
import { useStyles } from "../question/question.styles";

const QuestionCardLoader = ({ value = 1 }) => {
    const styles = useStyles();
    return (
        <Container>
            <Grid container spacing={2} mt={2} >
                {Array(value).fill(0).map((_, index) => {
                    return (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={styles.cardGrid}>
                            <Box sx={styles.skeletonCardBox}>
                                <Box sx={{ ...styles.innerBox, height: '30vh' }}>
                                    <Skeleton variant="text" width="100%" height={44} />
                                    <Skeleton variant="text" width="60%" height={40} />
                                    <Box sx={styles.buttonDiv}>
                                        <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: 2 }} />
                                        <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: 2 }} />
                                    </Box>
                                </Box>
                                <Skeleton variant="text" width="80%" height={16} sx={{ mx: 'auto' }} />
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default QuestionCardLoader;