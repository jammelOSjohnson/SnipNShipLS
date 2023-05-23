import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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
