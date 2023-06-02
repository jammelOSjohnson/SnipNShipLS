import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { SignUpForm } from '../sections/auth/signup';
// context
import { useGeneral } from '../context/general';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive('up', 'md');
  const { value } = useGeneral();
  const { signup, gLogin, fLogin, tLogin, fetchUserInfoForSignUp, fetchUserInfo } = value;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSubmit = async function handleGoogleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside Google Submit fuction");
    try {
      setError('');
      setLoading(true);
      await gLogin(value).then(async (res1) => {
        if (res1 != null) {
          await fetchUserDetails(res1).then((res) => {
            if (res) {
              // console.log("About to close signup modal.");
              setLoading(false);
              // setLoggedIn(true);
              // console.log("About to navigate to dashboard.");
              // history.push("/Dashboard");
            } else {
              setError('Unable to signup at this time');
              setLoading(false);
            }
          });
        } else {
          setError('Unable to signup at this time.');
          setLoading(false);
        }
      });
    } catch {
      setError('Failed to signup');
      setLoading(false);
    }
  };

  const fetchUserDetails = async function fetchUserDetails(payload) {
    // console.log("Is current user null");
    // console.log(value);
    if (payload.currentUser !== null && payload.currentUser !== undefined) {
      if (payload.currentUser.uid !== null && payload.currentUser.uid !== undefined) {
        // console.log("Fetching user info");
        // console.log(state);
        return fetchUserInfo(payload.currentUser.uid, payload);
      }
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title> SignUp | Snip & Ship </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome to Snip & Ship
            </Typography>
            <img src="/assets/illustrations/delivery_signup.jpg" alt="signup" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign Up to Snip & Ship
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link to="/Login" variant="subtitle2">
                Login
              </Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={() => handleGoogleSubmit}>
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <SignUpForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
