import { Divider, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
// import { lighten } from 'polished';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import { useUIContext } from '../../context/ui';
import { DrawerCloseButton, NavLinkStyled } from '../../styles/appbar';
import { Colors } from '../../theme/palette';

const MiddleDivider = styled((props) => <Divider variant="middle" {...props} />)``;

export default function AppDrawer() {
  const { drawerOpen, setDrawerOpen } = useUIContext();
  const isTrue = true;
  const navigate = useNavigate();
  const urlLocation = useLocation().pathname;

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: '2.5em',
              color: Colors.white,
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        {urlLocation === '/refund' || urlLocation === '/privacy' || urlLocation === '/terms' ? (
          <List>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/home');
              }}
            >
              <ListItemText>HOME</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/terms');
              }}
            >
              <ListItemText>TERMS & CONDITIONS</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/privacy');
              }}
            >
              <ListItemText>PRIVACY POLICY</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/refund');
              }}
            >
              <ListItemText>REFUND POLICY</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            {/* <ListItemButton>
            <ListItemText>ABOUT</ListItemText>
          </ListItemButton>
          <MiddleDivider /> */}
            <ListItemButton>
              <NavLinkStyled
                to="/Login"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>LOGIN</ListItemText>
              </NavLinkStyled>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <NavLinkStyled
                to="/signup"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>SIGNUP</ListItemText>
              </NavLinkStyled>
            </ListItemButton>
            <MiddleDivider />
          </List>
        ) : (
          <List>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate('/home');
              }}
            >
              <ListItemText>HOME</ListItemText>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <Link
                to="services"
                spy={isTrue}
                smooth={isTrue}
                offset={0}
                duration={500}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>SERVICES</ListItemText>
              </Link>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <Link
                to="contactus"
                spy={isTrue}
                smooth={isTrue}
                offset={0}
                duration={500}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>CONTACT US</ListItemText>
              </Link>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <Link
                to="rates"
                spy={isTrue}
                smooth={isTrue}
                offset={0}
                duration={500}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>RATES</ListItemText>
              </Link>
            </ListItemButton>
            <MiddleDivider />
            {/* <ListItemButton>
            <ListItemText>ABOUT</ListItemText>
          </ListItemButton>
          <MiddleDivider /> */}
            <ListItemButton>
              <NavLinkStyled
                to="/Login"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>LOGIN</ListItemText>
              </NavLinkStyled>
            </ListItemButton>
            <MiddleDivider />
            <ListItemButton>
              <NavLinkStyled
                to="/signup"
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText>SIGNUP</ListItemText>
              </NavLinkStyled>
            </ListItemButton>
            <MiddleDivider />
          </List>
        )}
      </Drawer>
      <style>
        {`
            .active{
              background:linear-gradient(to left, ${Colors.warning} 100%, ${Colors.warning} 100%) bottom;
            background-repeat: no-repeat;
            background-size:100% 2px;
            }
          `}
      </style>
    </>
  );
}
