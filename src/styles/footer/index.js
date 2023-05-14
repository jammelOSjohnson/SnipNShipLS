import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const MainFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}));

export const FooterTitle = styled(Typography)(() => ({
  textTransform: 'uppercase',
  marginBottom: '1em',
}));
