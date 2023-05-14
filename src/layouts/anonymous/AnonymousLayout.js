import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Appbar from '../../components/appbar';
import Footer from '../../components/footer';

// ----------------------------------------------------------------------
const StyledBody = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: 0,
  margin: 0,
  height: '100vh',
}));
// ----------------------------------------------------------------------

export default function AnonymousLayout() {
  return (
    <>
      <StyledBody>
        <Appbar />

        <Outlet />
        <Footer />
      </StyledBody>
    </>
  );
}
