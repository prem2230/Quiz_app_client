import { useTheme, useMediaQuery } from "@mui/material";

export const useStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const styles = {
        //view questions styles --
        cardGrid: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        cardBox: {
            background: theme.palette.primary.main,
            p: isMobile ? 0.3 : 0.5,
            width: {
                xs: '100%',
                sm: '220px',
                md: '230px',
                lg: '250px'
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: isMobile ? 3 : 5,
            boxShadow: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: !isMobile ? 'scale(1.05)' : 'scale(1.03)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            },
        },
        innerBox: {
            background: theme.palette.secondary.light,
            p: {
                xs: 1.5,
                sm: 1.8,
                md: 2
            },
            width: '100%',
            borderRadius: isMobile ? 3 : 4
        },
        questionTxt: {
            whiteSpace: 'nowrap',
            fontSize: {
                xs: '0.85em',
                sm: '0.9em',
                md: '1em'
            },
            fontStyle: 'italic',
            my: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            cursor: 'pointer'
        },
        marksTxt: {
            whiteSpace: 'nowrap',
            fontSize: {
                xs: '0.85em',
                sm: '0.9em',
                md: '1em'
            },
            fontStyle: 'italic',
            my: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            color: theme.palette.secondary.main
        },
        buttonDiv: {
            display: 'flex',
            alignItems: 'center',
            gap: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            }
        },
        actionBtn: {
            border: 1,
            borderWidth: {
                xs: 1,
                sm: 1.2,
                md: 1.5
            },
            borderRadius: 2,
            borderColor: theme.palette.primary.main,
            fontWeight: 600,
        },
        modifyBtn: {
            fontSize: {
                xs: '0.5em',
                sm: '0.55em',
                md: '0.6em'
            },
            color: theme.palette.text.primary,
            '&:hover': {
                background: theme.palette.primary.main,
                color: theme.palette.text.secondary
            }
        },
        deleteBtn: {
            fontSize: {
                xs: '0.5em',
                sm: '0.55em',
                md: '0.6em'
            },
            color: theme.palette.error.main,
            '&:hover': {
                background: theme.palette.error.light,
                color: theme.palette.primary.main
            }
        },
        cardFooterTxt: {
            m: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            fontSize: {
                xs: '0.6em',
                sm: '0.65em',
                md: '0.7em'
            },
            fontStyle: 'italic',
            color: 'gray',
            textAlign: 'center'
        },

        //create question styles --
        commonBox: {
            my: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            }
        },
        commonLabel: {
            fontWeight: 600,
            fontSize: {
                xs: '0.85em',
                sm: '0.9em',
                md: '1em'
            }
        },
        commonTxtfield: {
            mt: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                    borderRadius: isMobile ? 3 : 5,
                },
                '&:hover fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                },
                '&.Mui-focused fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                },
            },
            '& .MuiInputBase-input': {
                padding: isMobile ? 0.8 : 1,
            },
        },
        optionGrid: {
            display: 'flex',
            justifyContent: 'center'
        },
        optionTxtfield: {
            width: {
                xs: '100%',
                sm: '180px',
                md: '200px',
                lg: '220px'
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                    borderRadius: isMobile ? 3 : 5,
                },
                '&:hover fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                },
                '&.Mui-focused fieldset': {
                    border: isMobile ? 1 : 2,
                    borderColor: theme.palette.secondary.light,
                },
            },
        },
        ansToggleBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
                xs: '100%',
                sm: '180px',
                md: '200px',
                lg: '220px'
            },
            height: {
                xs: '80px',
                sm: '90px',
                md: '100px'
            },
            p: {
                xs: 2,
                sm: 2.5,
                md: 3
            },
            background: theme.palette.secondary.light,
            borderRadius: isMobile ? 3 : 5,
            color: theme.palette.text.primary,
            transition: 'all 0.3s ease',
            boxShadow: 2,
            '&:hover': {
                transform: 'scale(1.01)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }
        },
        bottomBox: {
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'row'
            },
            justifyContent: 'space-between',
            my: {
                xs: 1,
                sm: 1.5,
                md: 2
            },
            alignItems: {
                xs: 'stretch',
                sm: 'end'
            },
            gap: {
                xs: 2,
                sm: 1
            }
        },
        createBtn: {
            px: {
                xs: 1,
                sm: 1.5,
                md: 2
            },
            mt: {
                xs: 1,
                sm: 0
            },
            '&:hover': {
                background: theme.palette.primary.main,
                color: theme.palette.secondary.light
            }
        },
        helperFormProps: (words: number, totalWords: number) => ({
            textAlign: 'right',
            mr: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            mt: {
                xs: 0.3,
                sm: 0.4,
                md: 0.5
            },
            fontSize: {
                xs: '0.65rem',
                sm: '0.7rem',
                md: '0.75rem'
            },
            color: words > totalWords * 0.9 ? theme.palette.error.main : theme.palette.secondary.main
        }),
        checkFill: {
            color: theme.palette.success.light
        },
        inputIcon: {
            cursor: 'pointer',
            fontSize: {
                xs: '1.2rem',
                sm: '1.3rem',
                md: '1.5rem'
            }
        }
    };

    return styles;
};
