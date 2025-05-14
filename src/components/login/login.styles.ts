import { Theme } from "@mui/material";
import { SxProps, useTheme } from "@mui/system";

export const useStyles = () => {
  const theme = useTheme();

  const styles: Record<string, SxProps<Theme>> = {
    mainContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      height: 'calc(100vh - 0px)',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: 400,
      padding: theme.spacing(2),
      borderRadius: 0,
    },
    formPaper: {
      padding: theme.spacing(4),
      marginTop: theme.spacing(2),
      width: '100%',
      boxShadow: 'none',
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
        fontSize: '14px',
        color: theme.palette.text.primary,
      },
      '& .MuiInputLabel-shrink': {
        fontSize: '16px',
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
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleBox: {
      width: '100%',
      maxWidth: '300px',
      height: '40px',
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.primary,
      border: '1px solid #e0e0e0',
      borderRadius: 5,
      position: 'relative',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      padding: '3px',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
        height: '36px',
      },
      '& .MuiToggleButtonGroup-grouped': {
        margin: 0,
        border: 0,
        flex: 1,
        fontSize: '14px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '12px',
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
      padding: '6px 12px',
      fontWeight: 600,
      [theme.breakpoints.down('sm')]: {
        padding: '4px 8px',
      },
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