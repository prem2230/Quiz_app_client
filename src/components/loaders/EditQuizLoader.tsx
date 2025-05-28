import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { useStyles } from "../quiz/quiz.styles";

const EditQuizLoader = () => {
    const styles = useStyles();

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Skeleton variant="text" width="60%" height={50} />
            </Box>

            <Box sx={styles.commonBox}>
                <Skeleton variant="text" width="30%" height={40} />
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1, mt: 1 }}
                />
                <Skeleton variant="text" width="20%" height={20} sx={{ ml: 'auto', mt: 0.5 }} />
            </Box>

            <Box sx={styles.commonBox}>
                <Skeleton variant="text" width="40%" height={40} />
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    sx={{ borderRadius: 1, mt: 1 }}
                />
                <Skeleton variant="text" width="20%" height={20} sx={{ ml: 'auto', mt: 0.5 }} />
            </Box>

            <Grid container spacing={3} sx={styles.commonBox}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }} >
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        sx={{ borderRadius: 20, mt: 1 }}
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                        sx={{ borderRadius: 20, mt: 1 }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Skeleton variant="text" width="40%" height={40} />

                <Box sx={{ mt: 2, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <Skeleton variant="rectangular" width="80%" height={40} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="rectangular" width="18%" height={40} sx={{ borderRadius: 1, ml: 2 }} />
                    </Box>

                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <Skeleton variant="text" width="30%" height={30} />
                    </Typography>

                    {Array(3).fill(0).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width="100%"
                            height={60}
                            sx={{ borderRadius: 1, mb: 1 }}
                        />
                    ))}

                    <Skeleton variant="text" width="100%" height={1} sx={{ my: 2 }} />

                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <Skeleton variant="text" width="30%" height={30} />
                    </Typography>

                    {Array(5).fill(0).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width="100%"
                            height={60}
                            sx={{ borderRadius: 1, mb: 1 }}
                        />
                    ))}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Skeleton variant="rectangular" width="20%" height={50} sx={{ borderRadius: 1 }} />
            </Box>
        </Container>
    );
};

export default EditQuizLoader;
