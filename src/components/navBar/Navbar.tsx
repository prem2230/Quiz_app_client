import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserPopover from './UserPopover';
import { DataArray } from '@mui/icons-material';
import { useStyles } from './navbar.styles';

const Navbar = () => {
  const navigate = useNavigate();
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={styles.headerTypo}
          onClick={() => navigate('/')}
        >
          <IconButton sx={styles.logo}>
            <DataArray />
          </IconButton>
          Tech Quiz
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <UserPopover />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
