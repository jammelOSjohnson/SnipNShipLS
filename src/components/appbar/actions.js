import { ListItemButton, ListItemIcon } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ActionItemsContainerDesktop, ActionItemsContainerMobile, MyList } from '../../styles/appbar';
import { Colors } from '../../theme/palette';

export default function Actions({ matches }) {
  const Component = matches ? ActionItemsContainerMobile : ActionItemsContainerDesktop;
  return (
    <Component>
      <MyList type="row">
        <ListItemButton>
          <ListItemIcon />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon />
        </ListItemButton>
        <ListItemButton
          sx={{
            justifyContent: 'center',
          }}
        >
          <ListItemIcon
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: matches && Colors.secondary,
            }}
          >
            <PersonIcon />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Component>
  );
}
