import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppbarContainer, AppbarHeader, AppbarLogo, AppbarMenuIcon, AppbarSearchIcon } from '../../styles/appbar';
// import Actions from './actions';
import { useUIContext } from '../../context/ui';

// { matches }
export default function AppbarMobile() {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarMenuIcon onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </AppbarMenuIcon>
      <AppbarHeader textAlign={'center'} variant="h4">
        {/* My Bags */}
        <AppbarLogo src="/assets/images/Logos/ShipNShipLS.png" />
      </AppbarHeader>
      <AppbarSearchIcon onClick={() => setShowSearchBox(true)}>
        <SearchIcon />
      </AppbarSearchIcon>
      {/* <Actions matches={matches} /> */}
    </AppbarContainer>
  );
}
