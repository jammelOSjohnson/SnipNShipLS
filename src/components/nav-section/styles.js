// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { Colors } from '../../theme/palette';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  '&.active': {
    [theme.breakpoints.down('md')]: {
      color: Colors.white,
    },
    bgcolor: 'action.selected',
    fontWeight: 'fontWeightBold',
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    color: Colors.white,
  },
}));

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: Colors.white,
  },
}));
