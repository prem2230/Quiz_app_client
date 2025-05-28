import { useTheme, useMediaQuery } from "@mui/material";

export const useStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        //view quizzes styles --
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
        skeletonCardBox: {
            width: {
                xs: '100%',
                sm: '220px',
                md: '230px',
                lg: '250px'
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
        quizTxt: {
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
        quizInfoBox: {
            my: {
                xs: 0.8,
                sm: 1,
                md: 1.2
            },
            display: 'flex',
            justifyContent: 'flex-start',
            gap: {
                xs: 0.8,
                sm: 1,
                md: 1.2
            },
            flexWrap: 'wrap'
        },
        difficultyChip: {
            px: {
                xs: 0.8,
                sm: 1,
                md: 1.2
            },
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            color: theme.palette.secondary.light
        },
        easy: {
            background: theme.palette.success.light,
        },
        medium: {
            background: theme.palette.info.light,
        },
        hard: {
            background: theme.palette.error.light,
        },
        durationChip: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: {
                xs: 0.3,
                sm: 0.4,
                md: 0.5
            },
            background: theme.palette.primary.main,
            px: {
                xs: 0.8,
                sm: 1,
                md: 1.2
            },
            borderRadius: 2,
            color: theme.palette.secondary.light
        },
        chipText: {
            fontSize: {
                xs: '0.65em',
                sm: '0.7em',
                md: '0.75em'
            },
            fontStyle: 'italic',
            fontWeight: 500
        },
        chipIcon: {
            fontSize: {
                xs: '0.8em',
                sm: '0.85em',
                md: '0.9em'
            }
        },

        //create quiz styles
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
        toggleButtonGroup: {
            width: '100%',
            maxWidth: {
                xs: '100%',
                sm: '300px'
            },
            height: {
                xs: '36px',
                sm: '40px'
            },
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.text.primary,
            border: '1px solid #e0e0e0',
            borderRadius: 5,
            position: 'relative',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            padding: '3px',
            mt: 1,
            '& .MuiToggleButtonGroup-grouped': {
                margin: 0,
                border: 0,
                flex: 1,
                fontSize: {
                    xs: '12px',
                    sm: '14px'
                },
                '&:not(:first-of-type)': {
                    borderRadius: 0,
                    borderLeft: 0,
                },
                '&:first-of-type': {
                    borderRadius: 0,
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                },
                '& .MuiTouchRipple-root': {
                    display: 'none'
                }
            },
        },
        toggleButton: {
            zIndex: 1,
            textTransform: 'capitalize',
            transition: 'color 0.3s ease',
            color: theme.palette.text.primary,
            padding: {
                xs: '4px 8px',
                sm: '8px 12px'
            },
            fontWeight: 600,
            '&.Mui-selected': {
                backgroundColor: 'transparent',
                color: 'white',
            },
            '&:focus': {
                outline: 'none',
            },
        },
        toggleActiveIndicator: {
            position: 'absolute',
            top: '3px',
            width: 'calc(33.33% - 3px)',
            height: 'calc(100% - 6px)',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50px',
            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        toggleButtonGroupDuration: {
            width: '100%',
            maxWidth: {
                xs: '100%',
                sm: '350px'  // Wider than difficulty toggle to accommodate 4 buttons
            },
            height: {
                xs: '36px',
                sm: '40px'
            },
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.text.primary,
            border: '1px solid #e0e0e0',
            borderRadius: 5,
            position: 'relative',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            padding: '3px',
            mt: 1,
            '& .MuiToggleButtonGroup-grouped': {
                margin: 0,
                border: 0,
                flex: 1,
                fontSize: {
                    xs: '10px',  // Smaller font for mobile with 4 buttons
                    sm: '12px'
                },
                '&:not(:first-of-type)': {
                    borderRadius: 0,
                    borderLeft: 0,
                },
                '&:first-of-type': {
                    borderRadius: 0,
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                },
                '& .MuiTouchRipple-root': {
                    display: 'none'
                }
            },
        },
        toggleButtonDuration: {
            zIndex: 1,
            textTransform: 'capitalize',
            transition: 'color 0.3s ease',
            color: theme.palette.text.primary,
            padding: {
                xs: '4px 4px',  // Less padding for mobile
                sm: '6px 8px'   // Less padding than difficulty buttons
            },
            fontWeight: 600,
            '&.Mui-selected': {
                backgroundColor: 'transparent',
                color: 'white',
            },
            '&:focus': {
                outline: 'none',
            },
        },
        toggleActiveDurationIndicator: {
            position: 'absolute',
            top: '3px',
            width: 'calc(25% - 3px)',  // 25% for 4 buttons
            height: 'calc(100% - 6px)',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50px',
            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
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

        // question selector styles
        searchContainer: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mb: {
                xs: 1,
                sm: 1.5,
                md: 2
            }
        },
        searchBox: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.secondary.light,
            borderRadius: {
                xs: 3,
                sm: 4,
                md: 5
            },
            padding: {
                xs: '2px',
                sm: '3px',
                md: '4px'
            },
            width: '100%'
        },
        searchField: {
            ml: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            '& .MuiInputBase-root': {
                backgroundColor: 'transparent',
                fontSize: {
                    xs: '0.85rem',
                    sm: '0.9rem',
                    md: '1rem'
                }
            },
            '& .MuiInputBase-input::placeholder': {
                fontSize: {
                    xs: '0.8rem',
                    sm: '0.85rem',
                    md: '0.9rem'
                },
                opacity: 0.8
            }
        },
        searchButton: {
            borderRadius: {
                xs: 2,
                sm: 2.5,
                md: 3
            },
            minWidth: 'auto',
            px: {
                xs: 1.5,
                sm: 1.8,
                md: 2
            },
            py: {
                xs: 0.5,
                sm: 0.6,
                md: 0.8
            },
            fontSize: {
                xs: '0.7rem',
                sm: '0.8rem',
                md: '0.9rem'
            }
        },
        questionListContainer: {
            minHeight: '40vh',
            maxHeight: {
                xs: '40vh',
                sm: '50vh',
                md: '60vh'
            },
            border: 2,
            borderColor: theme.palette.secondary.light,
            borderRadius: {
                xs: 3,
                sm: 4,
                md: 5
            },
            my: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            p: {
                xs: 1.5,
                sm: 2,
                md: 3
            },
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: {
                    xs: '0.3em',
                    sm: '0.35em',
                    md: '0.4em'
                }
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.secondary.light,
                borderRadius: 10
            }
        },
        questionItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: {
                xs: 1.5,
                sm: 2,
                md: 3
            },
            py: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            my: {
                xs: 0.5,
                sm: 0.8,
                md: 1
            },
            borderRadius: {
                xs: 3,
                sm: 4,
                md: 5
            },
            cursor: 'pointer',
            background: theme.palette.secondary.light,
            transition: 'all 0.3s ease',
            textTransform: 'none',
            '&:hover': {
                background: theme.palette.primary.main,
                color: theme.palette.secondary.light
            }
        },
        skeletonItem: {
            '&:hover': {
                background: theme.palette.secondary.light,
                color: 'none'
            }
        },
        questionItemSelected: {
            background: theme.palette.primary.main,
            color: theme.palette.text.secondary,
            '&:hover': {
                background: theme.palette.primary.main,
                color: theme.palette.secondary.light
            }
        },
        questionText: {
            fontSize: {
                xs: '0.75em',
                sm: '0.8em',
                md: '0.85em'
            },
            fontStyle: 'italic',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: {
                xs: '180px',
                sm: '250px',
                md: '300px',
                lg: '400px'
            }
        },
        markText: {
            fontSize: {
                xs: '0.75em',
                sm: '0.8em',
                md: '0.85em'
            },
            fontStyle: 'italic',
            fontWeight: 500
        },
        noQuestionsMessage: {
            display: 'flex',
            justifyContent: 'center',
            mt: {
                xs: 2,
                sm: 3,
                md: 4
            },
            color: theme.palette.text.primary,
            fontStyle: 'italic',
            fontSize: {
                xs: '0.85rem',
                sm: '0.9rem',
                md: '1rem'
            }
        },
        loaderDiv: {
            display: 'block',
            margin: '20px auto'
        }
    }

    return styles;
};
