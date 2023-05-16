import { styled } from '@mui/material/styles';
import { Box, Button, Grid } from '@mui/material';
import { Colors } from '../../theme/palette';

export const ContactFormButton = styled(Button)(({ theme }) => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  height: '70px',
  borderRadius: '50px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '5%',
  },
}));

export const ContactFormContainer = styled(Box)(() => ({
  padding: '5% 0px 0% 0px',
}));

export const ContactInnerFormContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },
}));

export const ContactAddressSection = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const ContactFormSection = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '0px 50px 0px 50px',
  },
}));
