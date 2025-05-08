import { useTheme } from "@mui/material"

export const useStyles = () => {
    const theme = useTheme();

    const styles = {
        headerTypo: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1
        },
        logo: {
            background: theme.palette.secondary.main,
            borderRadius: 5,
            p: 1,
            color: theme.palette.text.secondary 
        },
        popoverProfile: {
            color: theme.palette.text.secondary,
            p: 0,
            m: 2,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: 10,
            gap: 1,
        },
        userName: {
            cursor: 'pointer',
            fontSize: '0.5em',
            [theme.breakpoints.down('md')]: {
                display: 'none'
            }
        },
        popover: {
            '& .MuiPaper-root': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                borderRadius: 2,
                boxShadow: 1,
            },
        },
        menuBox: {
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            px: 6, 
            background: theme.palette.secondary.main, 
            color: theme.palette.text.secondary,
            [theme.breakpoints.down('sm')]: {
                px: 2,
                width: '100%',
            }
        },
        menuLogo: {
            m: 2, 
            background: theme.palette.primary.main, 
            borderRadius: 10,
            color: theme.palette.text.secondary,
            '&:hover': {
                background: theme.palette.primary.main,
            }
        },
        menuTypo: {
            fontSize: '1em', 
            fontWeight: 700
        },
        menuTypo2: {
            fontSize: '0.8em', 
            fontFamily: 'calibri'
        },
        menuButton: {
            fontSize: '0.8em',
            px: 2,
            py: 0.5,
            m: 1,
            border: 1,
            borderRadius: 2,
            color: theme.palette.text.secondary,
            background: theme.palette.primary.main,
        },
        menuItem: {
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            gap: 3, 
            borderBottom: 1, 
            borderColor: theme.palette.text.secondary, 
            p: 2
        },
        // New styles for responsive design
        mobileMenuButton: {
            color: theme.palette.text.secondary,
            m: 1,
        },
        drawer: {
            '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                width: '80%',
                maxWidth: '300px',
            },
        },
        drawerContent: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
    }

    return styles;
}
