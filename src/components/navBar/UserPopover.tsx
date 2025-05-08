import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Drawer, IconButton, MenuItem } from '@mui/material';
import { Box, useMediaQuery, useTheme } from "@mui/system";
import useAuth from '../login/hooks';
import { DataArray, HeadsetMic, Logout, Menu } from '@mui/icons-material';
import { useStyles } from './navbar.styles';


export default function UserPopover() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const styles = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user, logout } = useAuth();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isMobile) {
            setDrawerOpen(true);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const userContent = (
        <>
            <Box sx={styles.menuBox}>
                <IconButton sx={styles.menuLogo}>
                    <DataArray />
                </IconButton>
                <Typography sx={styles.menuTypo}>{user?.username.toUpperCase()}</Typography>
                <Typography sx={styles.menuTypo2} variant="body2" color="">{user?.email}</Typography>
                <IconButton sx={styles.menuButton}>
                    Manage Your Account
                </IconButton>
            </Box>
            <Box>
                <MenuItem sx={styles.menuItem}>
                    <HeadsetMic />
                    <Typography  >
                        Support
                    </Typography>
                </MenuItem>
                <MenuItem sx={styles.menuItem} onClick={logout}>
                    <Logout />
                    <Typography  >
                        Logout
                    </Typography>
                </MenuItem>
            </Box>
        </>
    )

    return (
        <React.Fragment>
            {isMobile ? (
                <IconButton sx={styles.mobileMenuButton} onClick={handleClick}>
                    <Menu />
                </IconButton>
            ) : (
                <IconButton aria-describedby={id}
                    sx={styles.popoverProfile} onClick={handleClick}>
                    <AccountCircleIcon />
                    <Typography sx={styles.userName}>
                        {user?.username.toUpperCase()}
                    </Typography>
                </IconButton>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                sx={styles.popover}
            >
                {userContent}
            </Popover>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={styles.drawer}
            >
                <Box sx={styles.drawerContent}>
                    {userContent}
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
