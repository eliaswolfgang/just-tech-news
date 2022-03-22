import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from './SideNav';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

export const NavBar = () => {
  const { state, dispatch } = useUserContext();
  const { user } = state[0] ?? {};
  const [showSideNav, setShowSideNav] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    dispatch({
      type: 'logout',
      payload: {
        username: '',
        email: '',
        loggedIn: false,
      },
    });
    sessionStorage.clear('user');
    navigate('/');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            {user && user.loggedIn && (
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
                onClick={() => setShowSideNav(!showSideNav)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1 }}
              onClick={() => navigate('/')}
            >
              Just Tech News
            </Typography>
            <Button
              color='inherit'
              onClick={
                user && user.loggedIn ? handleLogoutClick : handleLoginClick
              }
            >
              {user && user.loggedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {showSideNav && <SideNav onClose={() => setShowSideNav(false)} />}
    </>
  );
};

export default NavBar;
