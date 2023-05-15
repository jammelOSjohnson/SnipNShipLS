import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { Colors } from '../../theme/palette';

export const ContactFormButton = styled(Button)(() => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  height: '70px',
  borderRadius: '50px',
}));

export const ContactFormContainer = styled(Box)(() => ({
  padding: '5% 0px 0% 0px',
}));
