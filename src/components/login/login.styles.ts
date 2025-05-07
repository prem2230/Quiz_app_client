import { Theme } from "@mui/material";
import { SxProps, useTheme } from "@mui/system";

export  const useStyles = () => {
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
    container:{
      display: 'flex',
      alignItems: 'center',
       height: 'calc(100vh - 0px)',
      overflowY:'scroll',
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
            '-webkit-box-shadow': '0 0 0 30px white inset !important',
            '-webkit-text-fill-color': `${theme.palette.text.primary} !important`,
            'caret-color': theme.palette.text.primary,
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
  };

  return styles;
};