import { Theme } from "@mui/material";
import { SxProps, useTheme } from "@mui/system";

export const useStyles = () => {
  const theme = useTheme();

  const styles: Record<string, SxProps<Theme>> = {
    mainContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      minHeight: '100vh',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        backgroundImage: 'url(/assets/Online-test-bro.svg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          zIndex: 0,
        }
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: {
        xs: 'auto',
        md: 'calc(100vh - 0px)'
      },
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      [theme.breakpoints.down('md')]: {
        zIndex: 1,
        position: 'relative',
        py: 4,
      }
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: {
        xs: '100%',
        sm: 400
      },
      padding: {
        xs: 1,
        sm: 2
      },
      borderRadius: 0,
      [theme.breakpoints.down('md')]: {
        zIndex: 1,
      }
    },
    formPaper: {
      padding: {
        xs: 2,
        sm: 3,
        md: 4
      },
      marginTop: {
        xs: 1,
        sm: 2
      },
      width: '100%',
      boxShadow: {
        xs: '0 4px 20px rgba(0,0,0,0.15)',
        md: 'none'
      },
      backgroundColor: {
        xs: 'rgba(255, 255, 255, 0.95)',
        md: 'white'
      },
      borderRadius: {
        xs: 2,
        md: 0
      }
    },
    formField: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: 0,
          border: 'none',
          borderBottom: 1,
        },
        '& input': {
          '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
            WebkitBoxShadow: '0 0 0 30px white inset !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            caretColor: theme.palette.text.primary,
            'transition': 'background-color 5000s ease-in-out 0s',
          },
          '&:-internal-autofill-selected': {
            backgroundColor: 'white !important',
          },
          '&:autofill': {
            backgroundColor: 'white !important',
          },
        }
      },
      '& .MuiInputLabel-root': {
        fontSize: {
          xs: '13px',
          sm: '14px'
        },
        color: theme.palette.text.primary,
      },
      '& .MuiInputLabel-shrink': {
        fontSize: {
          xs: '15px',
          sm: '16px'
        },
      },
    },
    button: {
      borderRadius: 10,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    actionLinks: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    alert: {
      marginBottom: theme.spacing(2),
    },
    imageContainer: {
      backgroundImage: 'url(/assets/Online-test-bro.svg)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    toggleBox: {
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
    toggleBtn: {
      zIndex: 1,
      textTransform: 'capitalize',
      transition: 'color 0.3s ease',
      color: theme.palette.text.primary,
      padding: {
        xs: '4px 8px',
        sm: '6px 12px'
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
    toggleActiveBox: {
      position: 'absolute',
      top: '3px',
      width: 'calc(50% - 3px)',
      height: 'calc(100% - 6px)',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50px',
      transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 0,
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      [theme.breakpoints.down('sm')]: {
        top: '2px',
        height: 'calc(100% - 4px)',
      },
    },
  };
  return styles;
};
