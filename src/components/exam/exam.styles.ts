import { Theme } from "@mui/material";
import { SxProps, useTheme } from "@mui/system";

export const useStyles = () => {
    const theme = useTheme();

    const styles: Record<string, SxProps<Theme>> = {
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
                boxShadow: (theme) => theme.shadows[8],
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
        }
    };
    return styles;
};
