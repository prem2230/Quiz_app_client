// src/components/common/Pagination/Pagination.tsx
import React from 'react';
import { Box, Pagination as MuiPagination } from '@mui/material';
import useQuestion from '../question/hooks';

interface PaginationProps {
    color?: 'primary' | 'secondary' | 'standard';
    size?: 'small' | 'medium' | 'large';
}

const Pagination: React.FC<PaginationProps> = ({
    color = 'primary',
    size = 'small'
}) => {
    const { loadAllQuestions, pagination } = useQuestion();
    const { page, pages, } = pagination;
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        loadAllQuestions({ page: value });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
            }}
        >
            <MuiPagination
                count={pages}
                page={page}
                onChange={handleChange}
                color={color}
                size={size}
                showFirstButton
                showLastButton
            />
        </Box>
    );
};

export default Pagination;
