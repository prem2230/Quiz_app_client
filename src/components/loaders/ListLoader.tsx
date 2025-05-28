import { Box, Skeleton } from "@mui/material"
import { useStyles } from "../quiz/quiz.styles"

interface ListLoaderProps {
    index: number;
}

const ListLoader = ({ index }: ListLoaderProps) => {
    const styles = useStyles();
    return (
        <Box key={`skeleton-${index}`} sx={{ ...styles.questionItem, ...styles.skeletonItem }}>
            <Box sx={{ width: '70%' }}>
                <Skeleton
                    animation="wave"
                    height={20}
                    width="100%"
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.1)' }}
                />
            </Box>
            <Box sx={{ width: '20%' }}>
                <Skeleton
                    animation="wave"
                    height={20}
                    width="100%"
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.1)' }}
                />
            </Box>
        </Box>
    )
}

export default ListLoader