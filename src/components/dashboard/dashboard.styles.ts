import { useTheme, useMediaQuery } from "@mui/material";

export const useStyles = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const styles = {
        cardBox: {
            height: isMobile ? '180px' : isTablet ? '220px' : '250px',
            width: isMobile ? '100%' : 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.palette.secondary.light,
            borderRadius: isMobile ? 6 : 10,
            m: isMobile ? 1 : 2,
            p: isMobile ? 2 : 3,
            cursor: 'pointer',
            flexDirection: 'column',
            boxShadow: 2,
            transition: 'all 0.3s ease', 
            '&:hover': {
                transform: isDesktop ? 'scale(1.05)' : 'scale(1.03)', 
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            },
            '& .MuiSvgIcon-root': {
                fontSize: isMobile ? '2em' : isTablet ? '2.5em' : '3em',
                mb: 1
            },
            '& .MuiTypography-root': {
                fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
                textAlign: 'center'
            }
        },
        container: {
            py: isMobile ? 2 : 4,
            px: isMobile ? 3 : 3
        },
        gridItem: {
            width: '100%'
        }
    };

    return styles;
};
