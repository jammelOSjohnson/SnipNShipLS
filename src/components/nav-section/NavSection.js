import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Box, List } from '@mui/material';

import NavItem from './NavItem';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const navigate = useNavigate();
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} navigate={navigate} />
        ))}
      </List>
    </Box>
  );
}
