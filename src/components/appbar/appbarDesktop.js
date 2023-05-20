import { useEffect } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppbarContainer, AppbarHeader, AppbarLogo, LinkStyled, MyList, NavLinkStyled } from '../../styles/appbar';
import { useUIContext } from '../../context/ui';
import { Colors } from '../../theme/palette';

export default function AppbarDesktop() {
  const { setShowSearchBox } = useUIContext();
  const isTrue = true;

  useEffect(() => {
    const wOutsticky = document.getElementById('w-out');
    console.log(wOutsticky);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        wOutsticky.classList.add('sticky');
      } else wOutsticky.classList.remove('sticky');
    });
  }, []);
  return (
    <AppbarContainer id="w-out">
      <AppbarHeader>
        {/* My Bags */}
        <AppbarLogo src="/assets/images/Logos/ShipNShipLS.png" />
      </AppbarHeader>
      <MyList type="row">
        <NavLinkStyled
          to="/Home"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
        >
          <ListItemText primary="Home" />
        </NavLinkStyled>
        <LinkStyled to="rates" spy={isTrue} smooth={isTrue} offset={50} duration={500}>
          <ListItemText primary="Rates" />
        </LinkStyled>
        <LinkStyled to="about" spy={isTrue} smooth={isTrue} offset={50} duration={500}>
          <ListItemText primary="About" />
        </LinkStyled>
        <LinkStyled to="contactus" spy={isTrue} smooth={isTrue} offset={50} duration={500}>
          <ListItemText primary="Contact Us" />
        </LinkStyled>
        <NavLinkStyled
          to="/Login"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
        >
          <ListItemText primary="Login" />
        </NavLinkStyled>
        <NavLinkStyled
          to="/signup"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
        >
          <ListItemText primary="SignUp" />
        </NavLinkStyled>
        <ListItemButton>
          <ListItemIcon>
            <SearchIcon sx={{ color: `${Colors.white}` }} onClick={() => setShowSearchBox(true)} />
          </ListItemIcon>
        </ListItemButton>
      </MyList>
      {/* <Actions matches={matches} /> */}
      <style>
        {`
            .active{
              background:linear-gradient(to left, transparent 50%, ${Colors.warning} 50%) bottom;
            background-repeat: no-repeat;
            background-size:100% 2px;
            }

            .sticky {
              position: fixed;
              top: 0;
              padding-top: 35px;
              width: 100%;
            }
          `}
      </style>
    </AppbarContainer>
  );
}
