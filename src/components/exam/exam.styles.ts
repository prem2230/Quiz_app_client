import { useTheme } from "@mui/system";

export const useStyles = () => {
    const theme = useTheme();

    const styles = {

        //quiz exam card styles
        quizCardGrid: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch'
        },
        cardBox: {
            background: theme.palette.secondary.light,
            p: {
                xs: 1.5,
                sm: 2
            },
            width: {
                xs: '100%',
                sm: 280,
                md: 300
            },
            maxHeight: {
                xs: 200,
                sm: 200
            },
            borderRadius: {
                xs: 3,
                sm: 5
            },
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8,
            }
        },
        quizTitle: {
            fontWeight: '600',
            fontSize: {
                xs: '0.9rem',
                sm: '1rem'
            },
            fontStyle: 'italic',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
        },
        descriptionBox: {
            height: {
                xs: 40,
                sm: 40
            },
        },
        quizDescription: {
            fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
            },
            my: 1,
            color: theme.palette.text.primary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
        },
        detailsBox: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
            alignItems: 'center',
            height: 20,
        },
        typography: {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: {
                xs: '0.65rem',
                sm: '0.7rem'
            },
            color: theme.palette.secondary.main,
            px: 1,
            borderRadius: {
                xs: 3,
                sm: 5
            },
            border: 1,
            fontStyle: 'italic',
        },
        badgeBox: {
            textAlign: 'center',
            height: 25,
            display: 'flex',
            alignItems: 'center',
            my: 1
        },
        difficultyBadge: {
            fontStyle: 'italic',
            fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
            },
            px: {
                xs: 1.5,
                sm: 2
            },
            borderRadius: {
                xs: 3,
                sm: 5
            },
        },
        easy: {
            background: theme.palette.success.main,
            color: theme.palette.success.contrastText
        },
        medium: {
            background: theme.palette.warning.main,
            color: theme.palette.warning.contrastText
        },
        hard: {
            background: theme.palette.error.main,
            color: theme.palette.error.contrastText
        },
        btnBox: {
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        startBtn: {
            textTransform: 'none',
            borderRadius: {
                xs: 3,
                sm: 5
            },
            px: {
                xs: 1.5,
                sm: 2
            },
            py: 0,
            fontSize: {
                xs: '0.75rem',
                sm: '0.8rem'
            },
            color: theme.palette.primary.contrastText,
            '&:hover': {
                background: theme.palette.secondary.main,
            }
        },

        //exam-quiz styles
        examContainer: {
            mb: { xs: 0.5, sm: 1 },
            background: theme.palette.secondary.light,
            p: { xs: 1.5, sm: 2, md: 3 },
            borderRadius: { xs: 3, sm: 4, md: 5 },
            boxShadow: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 1, sm: 2 }
        },
        examTitle: {
            fontWeight: 600,
            color: theme.palette.text.primary,
            position: 'relative',
            fontStyle: 'italic',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: { xs: -4, sm: -8 },
                left: 0,
                width: { xs: 40, sm: 60 },
                height: { xs: 2, sm: 2 },
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main
            }
        },
        headerStack: {
            flexWrap: 'wrap',
            gap: { xs: 0.5, sm: 1 }
        },
        timerBox: {
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            backgroundColor: theme.palette.text.secondary,
            backdropFilter: 'blur(10px)',
            px: { xs: 1, sm: 1.5, md: 2 },
            py: { xs: 0.3, sm: 0.5 },
            borderRadius: { xs: 8, sm: 10 },
            boxShadow: { xs: 1, sm: 2 }
        },
        timerIcon: {
            color: theme.palette.primary.main,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
        },
        timerText: (timeLeft: number) => ({
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontWeight: 600,
            color: timeLeft < 60 ? theme.palette.error.main : theme.palette.text.primary
        }),
        examDifficulty: {
            color: '#fff',
            px: { xs: 1, sm: 1.5, md: 2 },
            py: { xs: 0.3, sm: 0.5 },
            borderRadius: { xs: 8, sm: 10 },
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontStyle: 'italic',
            letterSpacing: { xs: 0.5, sm: 1 }
        },
        progressBox: {
            position: 'relative',
            mx: { xs: 1, sm: 2 },
            mt: { xs: 1, sm: 2 }
        },
        progressDetails: {
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 0.3, sm: 0.5 }
        },
        progressTypography: {
            textAlign: 'center',
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
        },
        progressBar: {
            height: { xs: 3, sm: 4, md: 5 },
            borderRadius: { xs: 2, sm: 4 },
            backgroundColor: theme.palette.secondary.light,
        },
        questionContainer: {
            my: { xs: 1, sm: 2 },
            backgroundColor: theme.palette.secondary.light,
            backdropFilter: 'blur(10px)',
            borderRadius: { xs: 2, sm: 3 },
            p: { xs: 1.5, sm: 2, md: 3 },
            boxShadow: { xs: 1, sm: 2 }
        },
        questionText: {
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: { xs: 1.5, sm: 2, md: 3 },
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
        },
        answerOptions: (currentAnswer: any, option: any) => ({
            justifyContent: 'flex-start',
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1.5, sm: 2, md: 2.5 },
            textTransform: 'none',
            borderRadius: { xs: 1, sm: 2 },
            fontWeight: 500,
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
            textAlign: 'left',
            transition: 'all 0.2s ease',
            backgroundColor: currentAnswer === option._id
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            color: currentAnswer === option._id
                ? '#fff'
                : theme.palette.text.primary,
            border: currentAnswer === option._id
                ? 'none'
                : '1px solid rgba(0,0,0,0.1)',
            boxShadow: currentAnswer === option._id
                ? `0 4px 12px ${theme.palette.primary.main}80`
                : 'none',
            '&:hover': {
                backgroundColor: currentAnswer === option._id
                    ? theme.palette.primary.dark
                    : theme.palette.secondary.main,
                color: theme.palette.text.secondary,
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
            }
        }),
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 }
        },
        button: {
            borderRadius: { xs: 8, sm: 10 },
            px: { xs: 2, sm: 2.5, md: 3 },
            py: { xs: 0.5, sm: 0.75, md: 1 },
            fontWeight: 600,
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            border: theme.palette.secondary.main,
            color: theme.palette.text.secondary,
            '&.Mui-disabled': {
                opacity: 0.5,
                border: theme.palette.secondary.main,
                background: theme.palette.secondary.light,
                color: theme.palette.text.primary
            }
        },
        prevNextButton: {
            background: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: { xs: 5, sm: 10 },
            },
        },
        submitButton: {
            background: theme.palette.success.light,
            '&:hover': {
                backgroundColor: theme.palette.success.dark,
                boxShadow: { xs: 5, sm: 10 },
            },
        },
        numberBox: {
            mt: { xs: 2, sm: 3, md: 4 },
            pt: { xs: 1.5, sm: 2, md: 3 },
            borderTop: `1px solid ${theme.palette.secondary.light}`,
            display: 'flex',
            justifyContent: 'center'
        },
        numberGroup: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 0.5, sm: 1 },
            justifyContent: 'center',
            maxWidth: '100%'
        },
        numberButton: (isCurrent: boolean, isAnswered: boolean) => ({
            minWidth: { xs: '32px', sm: '36px', md: '40px' },
            height: { xs: '32px', sm: '36px', md: '40px' },
            borderRadius: '50%',
            p: 0,
            m: { xs: 0.25, sm: 0.5 },
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
            color: isCurrent
                ? '#fff'
                : isAnswered
                    ? theme.palette.success.main
                    : theme.palette.text.primary,
            backgroundColor: isCurrent
                ? theme.palette.primary.main
                : isAnswered
                    ? 'rgba(76, 175, 80, 0.1)'
                    : 'rgba(255,255,255,0.8)',
            border: isAnswered && !isCurrent
                ? `2px solid ${theme.palette.success.light}`
                : isCurrent
                    ? 'none'
                    : `1px solid ${theme.palette.primary.main}`,
            boxShadow: isCurrent
                ? `0 4px 10px ${theme.palette.primary.main}80`
                : 'none',
            '&:hover': {
                color: theme.palette.text.secondary,
                backgroundColor: isCurrent
                    ? theme.palette.primary.dark
                    : isAnswered
                        ? theme.palette.success.light
                        : theme.palette.primary.main,
                transform: 'translateY(-2px)',
            }
        }),

    };
    return styles;
};
