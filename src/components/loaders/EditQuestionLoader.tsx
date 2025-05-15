import { Box, Container, Grid, Skeleton } from '@mui/material';
import { useStyles } from '../question/question.styles';

const EditQuestionLoader = () => {
    const styles = useStyles();

    return (
        <Container>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Skeleton variant="text" width="30%" height={60} sx={{ mx: 'auto' }} />
            </Box>

            {/* Question Field Skeleton */}
            <Box sx={styles.commonBox}>
                <Skeleton variant="text" width="20%" height={40} sx={{ mb: 1, borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 5 }} />
            </Box>

            {/* Answer Options Skeleton */}
            <Box sx={styles.commonBox}>
                <Skeleton variant="text" width="20%" height={40} sx={{ mb: 1 }} />
                <Grid container spacing={2} mt={1} mb={2}>
                    {Array(4).fill(0).map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={styles.optionGrid} key={index}>
                            <Skeleton
                                variant="rectangular"
                                height={100}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        sm: '180px',
                                        md: '200px',
                                        lg: '220px'
                                    },
                                    borderRadius: 5
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Explanation Field Skeleton */}
            <Box sx={styles.commonBox}>
                <Skeleton variant="text" width="20%" height={40} sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 5 }} />
            </Box>

            {/* Marks and Submit Button Skeleton */}
            <Box sx={styles.bottomBox}>
                <Box sx={{ width: '30%' }}>
                    <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={56} width="80%" sx={{ borderRadius: 5 }} />
                </Box>
                <Skeleton variant="rectangular" height={40} width={100} sx={{ borderRadius: 2 }} />
            </Box>
        </Container>
    );
};

export default EditQuestionLoader;
