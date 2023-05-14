import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppbarContainer, AppbarHeader, AppbarLogo, MyList } from '../../styles/appbar';
import { useUIContext } from '../../context/ui';

export default function AppbarDesktop() {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarHeader>
        {/* My Bags */}
        <AppbarLogo src="/assets/images/Logos/ShipNShipLS.png" />
      </AppbarHeader>
      <MyList type="row">
        <ListItemText primary="Home" />
        <ListItemText primary="Rates" />
        <ListItemText primary="About" />
        <ListItemText primary="Contact Us" />
        <ListItemText primary="Login" />
        <ListItemText primary="SignUp" />
        <ListItemButton>
          <ListItemIcon>
            <SearchIcon onClick={() => setShowSearchBox(true)} />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
      {/* <Actions matches={matches} /> */}
    </AppbarContainer>
  );
}
