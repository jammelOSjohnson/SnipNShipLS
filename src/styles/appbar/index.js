import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { List, Typography, IconButton } from '@mui/material';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { Colors } from '../../theme/palette';
import '@fontsource/montez';

// container
// export const AppbarExContainer = styled(Box)(() => ({
//   position: 'sticky',
//   width: '100%',
//   top: 10,
// }));

export const AppbarContainer = styled(Box)(() => ({
  display: 'flex',
  margin: '0px 0px 0px 4px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 0px 8px 8px',
  backgroundColor: `${Colors.white}`,
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
}));

// List
export const MyList = styled(List)(({ type }) => ({
  display: type === 'row' ? 'flex' : 'block',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.primary,
  paddingLeft: '5%',
  borderRadius: '95px 0 0 95px',
  color: Colors.white,
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
  zIndex: 9001,
}));

export const LinkStyled = styled(Link)(() => ({
  flex: '1 1 auto',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const NavLinkStyled = styled(NavLink)(() => ({
  flex: '1 1 auto',
  textDecoration: 'none',
  color: Colors.white,
}));
