import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// import SearchIcon from '@mui/icons-material/Search';
import TikTokIcon from '../tiktokicon';
import { AppbarContainer, AppbarHeader, AppbarLogo, LinkStyled, MyList, NavLinkStyled } from '../../styles/appbar';
import { useUIContext } from '../../context/ui';
import { Colors } from '../../theme/palette';

export default function AppbarDesktop() {
  // const { setShowSearchBox } = useUIContext();
  const isTrue = true;
  const urlLocation = useLocation().pathname;

  const handleSocial = function handleSocial(social) {
    switch (social) {
      case 'facebook':
        window.open('https://www.facebook.com/profile.php?id=100092457001052');
        break;
      case 'instagram':
        window.open('https://instagram.com/snipnship?igshid=NTc4MTIwNjQ2YQ==');
        break;
      case 'tiktok':
        window.open('https://www.tiktok.com/@snipnship3?_t=8cLbin6qTA6&_r=1');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const wOutsticky = document.getElementById('w-out');
    // console.log(wOutsticky);
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
        <AppbarLogo src="/assets/images/Logos/ShipNShipLS2.png" />
      </AppbarHeader>
      {urlLocation === '/refund' || urlLocation === '/privacy' || urlLocation === '/terms' ? (
        <MyList type="row">
          <NavLinkStyled
            to="/Home"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="HOME" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/terms"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="TERMS & CONDITIONS" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/privacy"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="PRIVACY POLICY" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/refund"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="REFUND POLICY" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/Login"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="LOGIN" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/signup"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="SIGNUP" />
          </NavLinkStyled>
          <ListItemButton>
            {/* <ListItemIcon>
              <SearchIcon sx={{ color: `${Colors.white}` }} onClick={() => setShowSearchBox(true)} />
            </ListItemIcon> */}
            <ListItemIcon>
              <FacebookIcon sx={{ mr: 1, color: Colors.white }} onClick={() => handleSocial('facebook')} />
            </ListItemIcon>
            <ListItemIcon>
              <TikTokIcon
                color={Colors.white}
                width="1.5em"
                height="1.5em"
                style={{ marginRight: 1 }}
                onClick={() => handleSocial('tiktok')}
              />
            </ListItemIcon>
            <ListItemIcon onClick={() => handleSocial('instagram')}>
              <InstagramIcon sx={{ mr: 1, color: Colors.white }} />
            </ListItemIcon>
          </ListItemButton>
        </MyList>
      ) : (
        <MyList type="row">
          <NavLinkStyled
            to="/Home"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="HOME" />
          </NavLinkStyled>
          <LinkStyled to="services" spy={isTrue} smooth={isTrue} offset={0} duration={500}>
            <ListItemText primary="SERVICES" />
          </LinkStyled>
          <LinkStyled to="contactus" spy={isTrue} smooth={isTrue} offset={0} duration={500}>
            <ListItemText primary="CONTACT US" />
          </LinkStyled>
          <LinkStyled to="rates" spy={isTrue} smooth={isTrue} offset={0} duration={500}>
            <ListItemText primary="RATES" />
          </LinkStyled>
          {/* <LinkStyled to="about" spy={isTrue} smooth={isTrue} offset={0} duration={500}>
          <ListItemText primary="ABOUT" />
        </LinkStyled> */}
          <NavLinkStyled
            to="/Login"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="LOGIN" />
          </NavLinkStyled>
          <NavLinkStyled
            to="/signup"
            className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
          >
            <ListItemText primary="SIGNUP" />
          </NavLinkStyled>
          <ListItemButton>
            {/* <ListItemIcon>
            <SearchIcon sx={{ color: `${Colors.white}` }} onClick={() => setShowSearchBox(true)} />
          </ListItemIcon> */}
            <ListItemIcon>
              <FacebookIcon sx={{ mr: 1, color: Colors.white }} onClick={() => handleSocial('facebook')} />
            </ListItemIcon>
            <ListItemIcon>
              <TikTokIcon
                color={Colors.white}
                width="1.5em"
                height="1.5em"
                style={{ marginRight: 1 }}
                onClick={() => handleSocial('tiktok')}
              />
            </ListItemIcon>
            <ListItemIcon onClick={() => handleSocial('instagram')}>
              <InstagramIcon sx={{ mr: 1, color: Colors.white }} />
            </ListItemIcon>
          </ListItemButton>
        </MyList>
      )}

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
              padding-top: 0;
              padding-bottom: 0;
              width: 100%;
              opacity: 0.9;
              z-index: 8000;
              margin-left: 0;
            }

            #w-out > ul > a:hover {
              background:linear-gradient(to left, transparent 50%, ${Colors.warning} 50%) bottom;
            background-repeat: no-repeat;
            background-size:100% 2px;
            }
          `}
      </style>
    </AppbarContainer>
  );
}
