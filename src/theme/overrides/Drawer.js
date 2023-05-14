// ----------------------------------------------------------------------

import { Colors } from '../palette';

export default function Drawer() {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 250,
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: '0px 100px 0px 0px',
          borderRight: `10px solid ${Colors.secondary}`,
        },
      },
    },
  };
}
