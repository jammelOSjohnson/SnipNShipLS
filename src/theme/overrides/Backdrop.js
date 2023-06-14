import { alpha } from '@mui/material/styles';
import palette from '../palette';

// ----------------------------------------------------------------------

export default function Backdrop() {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
