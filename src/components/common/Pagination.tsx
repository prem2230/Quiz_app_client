// src/components/common/Pagination/Pagination.tsx
import React from 'react';
import { Box, Pagination as MuiPagination } from '@mui/material';
import useQuestion from '../question/hooks';
import { useQuiz } from '../quiz/hooks';

interface PaginationProps {
    module: 'question' | 'quiz';
    color?: 'primary' | 'secondary' | 'standard';
    size?: 'small' | 'medium' | 'large';
}

const Pagination: React.FC<PaginationProps> = ({
    module = 'question',
    color = 'primary',
    size = 'small'
}) => {
    const { loadAllQuestions, pagination: questionPagination } = useQuestion();
    const { loadAllQuizzes, pagination: quizPagination } = useQuiz();
    const { page: questionPage, pages: questionPages, } = questionPagination;
    const { page: quizPage, pages: quizPages, } = quizPagination;
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        if (module === 'question') {
            loadAllQuestions({ page: value });
        }
        if (module === 'quiz') {
            loadAllQuizzes({ page: value });
        }
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
                count={module === 'question' ? questionPages : quizPages}
                page={module === 'question' ? questionPage : quizPage}
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
