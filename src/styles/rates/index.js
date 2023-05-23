import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Colors } from '../../theme/palette';

export const RatesContainer = styled(Box)(({ theme }) => ({
  padding: '5% 0px 0% 0px',
  backgroundColor: Colors.primary,
  [theme.breakpoints.up('sm')]: {
    padding: '5% 0px 5% 0px',
  },
}));

export const RatesTab = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
}));
