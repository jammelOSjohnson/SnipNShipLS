import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { List, Typography, IconButton } from '@mui/material';
import { Colors } from '../../theme/palette';
import '@fontsource/montez';

// container
export const AppbarContainer = styled(Box)(() => ({
  display: 'flex',
  margin: 4,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px 8px',
}));

// Header
export const AppbarHeader = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontSize: '4em',
  fontFamily: '"Montez", "cursive"',
  color: Colors.secondary,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-around',
  },
  display: 'flex',
}));

export const AppbarMenuIcon = styled(IconButton)(() => ({
  position: 'absolute',
  top: 3,
  left: 10,
}));

export const AppbarSearchIcon = styled(IconButton)(() => ({
  position: 'absolute',
  top: 3,
  right: 10,
}));

export const AppbarLogo = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '50px',
  [theme.breakpoints.down('md')]: {
    width: '30px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '30px',
  },
}));

// List
export const MyList = styled(List)(({ type }) => ({
  display: type === 'row' ? 'flex' : 'block',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ActionItemsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`,
}));

export const ActionItemsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));

export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  left: '250px',
  zIndex: 1999,
}));
