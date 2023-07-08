import { NavLink as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { ListItemText } from '@mui/material';
// context
import { useGeneral } from '../../context/general';

//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { Colors } from '../../theme/palette';
// ----------------------------------------------------------------------

// NavItem.propTypes = {
//   item: PropTypes.object,
// };

const NavItem = ({ item, navigate }) => {
  const { value } = useGeneral();
  const { logout } = value;
  const { title, path, icon, info } = item;

  const handleLogout = (event) => {
    event.preventDefault();
    // console.log('here2');
    try {
      logout(value);
      setTimeout(() => {
        // console.log('navigating');
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.log(err);
      // do nothing
    }
  };

  return (
    <>
      {title === 'logout' ? (
        <StyledNavItem
          component={RouterLink}
          to={path}
          sx={{
            '&.active': {
              color: Colors.white,
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          }}
          onClick={(e) => handleLogout(e)}
        >
          <StyledNavItemIcon sx={{ color: Colors.white }}>{icon && icon}</StyledNavItemIcon>

          <ListItemText sx={{ color: Colors.white }} disableTypography primary={title} />

          {info && info}
        </StyledNavItem>
      ) : (
        <StyledNavItem
          component={RouterLink}
          to={path}
          sx={{
            '&.active': {
              color: Colors.white,
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          }}
        >
          <StyledNavItemIcon sx={{ color: Colors.white }}>{icon && icon}</StyledNavItemIcon>

          <ListItemText sx={{ color: Colors.white }} disableTypography primary={title} />

          {info && info}
        </StyledNavItem>
      )}{' '}
    </>
  );
};

export default NavItem;
