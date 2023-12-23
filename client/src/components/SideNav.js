import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

export const SideNav = ({ onClose }) => {
  const { state } = useUserContext();
  const { user } = state ?? {};
  const username = user ? user.username : '';
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleNav = (navigation) => {
    navigate(navigation);
    onClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={500}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          { name: 'All Posts', nav: '/home' },
          { name: 'My Posts', nav: `/posts/${username}` },
        ].map((value, index) => (
          <ListItem
            link='true'
            style={{ cursor: 'pointer' }}
            key={index}
            onClick={() => handleNav(value.nav)}
          >
            <ListItemText primary={value.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '25%' },
      }}
    >
      {list()}
    </Drawer>
  );
};

export default SideNav;
