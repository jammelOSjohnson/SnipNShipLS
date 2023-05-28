import { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AppbarContainer, AppbarHeader, AppbarLogo, AppbarMenuIcon, AppbarSearchIcon } from '../../styles/appbar';
// import Actions from './actions';
import { useUIContext } from '../../context/ui';

// { matches }
export default function AppbarMobile() {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  useEffect(() => {
    const wOutsticky = document.getElementById('m-out');
    // console.log(wOutsticky);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        wOutsticky.classList.add('sticky');
      } else wOutsticky.classList.remove('sticky');
    });
  }, []);

  return (
    <AppbarContainer id="m-out">
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
      <style>
        {`
            .sticky {
              position: fixed;
              top: 0;
              padding-top: 5%;
              padding-bottom: 0;
              width: 100%;
              opacity: 0.9;
              z-index: 8000;
              margin-left: 0;
            }

            .sticky > .MuiIconButton-root {
              top: 20%;
            }
          `}
      </style>
    </AppbarContainer>
  );
}
