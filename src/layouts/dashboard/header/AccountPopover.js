import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

// context
import { useGeneral } from '../../../context/general';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// {
//   label: 'Settings',
//   icon: 'eva:settings-2-fill',
// },
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const { value } = useGeneral();
  const { logout, clientInfo } = value;
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    console.log('here2');
    try {
      logout(value);
      setTimeout(() => {
        console.log('navigating');
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.log(err);
      // do nothing
      handleClose();
    }
  };

  const handleNav = (event, navVal) => {
    event.preventDefault();
    console.log('here2');
    try {
      navigate(navVal);
      handleClose();
    } catch (err) {
      console.log(err);
      // do nothing
      handleClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {clientInfo.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {clientInfo.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) =>
            option.label === 'Home' ? (
              <MenuItem key={option.label} onClick={(e) => handleNav(e, '/dashboard/app')}>
                {option.label}
              </MenuItem>
            ) : option.label === 'Profile' ? (
              <MenuItem key={option.label} onClick={(e) => handleNav(e, '/dashboard/profile')}>
                {option.label}
              </MenuItem>
            ) : (
              <></>
            )
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={(e) => handleLogout(e)} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
