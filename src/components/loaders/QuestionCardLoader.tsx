import { Box, Container, Grid, Skeleton } from "@mui/material";
import { useStyles } from "../question/question.styles";

const QuestionCardLoader = () => {
    const styles = useStyles();
    return (
        <Container>
            <Grid container spacing={2} mt={2} >
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={styles.cardGrid}>
                    <Box sx={styles.cardBox}>
                        <Box sx={{ ...styles.innerBox, height: '25vh' }}>
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
            </Grid>
        </Container>
    )
}

export default QuestionCardLoader;