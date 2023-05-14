// ----------------------------------------------------------------------

import { lighten } from 'polished';
import { Colors } from '../palette';

export default function Divider() {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary),
        },
      },
    },
  };
}
