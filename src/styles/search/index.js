import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Colors } from '../../theme/palette';

export const SearchBoxContainer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: Colors.primary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
  opacity: 0.9,
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  '.MuiInputLabel-root': {
    color: Colors.white,
  },
  '.MuiInput-root': {
    fontSize: '1em',
    [theme.breakpoints.up('md')]: {
      fontSize: '2em',
    },
    color: Colors.white,
  },
  '.MuiInput-root::before': {
    borderBottom: `1px solid ${Colors.white}`,
  },
  padding: '0 0 0 40px',
}));
