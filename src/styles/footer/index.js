import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import { Colors } from '../../theme/palette';

export const FooterContainer = styled(Box)(() => ({
  background: Colors.primary,
  color: Colors.white,
  paddingTop: 12,
  paddingBottom: 12,
}));

export const MainFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));

export const FooterTitle = styled(Typography)(() => ({
  textTransform: 'uppercase',
  marginBottom: '1em',
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
