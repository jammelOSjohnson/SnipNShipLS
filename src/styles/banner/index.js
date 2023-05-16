import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { Colors } from '../../theme/palette';

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: '0px 0px',
  background: Colors.white,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

// export const BannerImage = styled(Box)(({ src }) => ({
//   backgroundImage: `url(${src})`,
//   backgroundRepeat: 'no-repeat',
//   backgroundColor: 'black',
//   backgroundPosition: 'center',
//   backgroundSize: 'cover',
//   height: '100%',
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// }));

export const BannerImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '500px',
  [theme.breakpoints.down('md')]: {
    width: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '320px',
    height: '260px',
  },
}));

export const BannerContentContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    width: '100%',
    padding: 3,
  },

  [theme.breakpoints.down('sm')]: {
    width: '50%',
    padding: 2,
  },

  [theme.breakpoints.down('md')]: {
    width: '40%',
    padding: 20,
  },
}));

// export const BannerContent = styled(Box)(() => ({
//   background: 'white',
//   opacity: '0.8',
// }));

export const BannerContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 600,
  padding: '30px',
  [theme.breakpoints.down('sm')]: {
    padding: '5px 30px 30px 30px',
  },
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '72px',
  marginBottom: '20px',
  paddingTop: 8,
  [theme.breakpoints.down('sm')]: {
    fontSize: '32px',
    paddingTop: 0,
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '3em',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
    display: 'none',
  },
}));

export const BannerButton = styled(Button)(() => ({
  backgroundColor: Colors.primary,
  color: Colors.white,
  height: '70px',
  borderRadius: '50px',
}));
