import { Typography, Grid, Box, List, ListItemText, Button, ListItemButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TikTokIcon from '../tiktokicon';
import { Colors } from '../../theme/palette';
import { FooterTitle } from '../../styles/footer';

export default function Footer() {
  const navigate = useNavigate();
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

  return (
    <>
      <Box
        sx={{
          background: Colors.primary,
          color: Colors.white,
          p: { xs: 4, md: 10 },
          pt: 12,
          pb: 12,
          fontSize: { xs: '12px', md: '14px' },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item md={6} lg={4}>
            <FooterTitle variant="body1">About us</FooterTitle>
            <Typography variant="caption2">
              Welcome to Snip & Ship, your reliable partner for hassle-free package delivery. With fast, secure, and
              reliable services, we simplify shipping. Experience convenience at your fingertips with easy scheduling,
              tracking, and management.
            </Typography>
            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            >
              <Button sx={{ color: 'inherit' }} onClick={() => handleSocial('facebook')}>
                <FacebookIcon sx={{ mr: 1 }} />
              </Button>
              <Button sx={{ color: 'inherit' }} onClick={() => handleSocial('tiktok')}>
                <TikTokIcon color={Colors.dove_gray} width="1.5em" height="1.5em" style={{ marginRight: 1 }} />
              </Button>
              <Button sx={{ color: 'inherit' }} onClick={() => handleSocial('instagram')}>
                <InstagramIcon sx={{ mr: 1 }} />
              </Button>
            </Box>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">Information</FooterTitle>
            <List>
              <ListItemButton>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    About Us
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    Our Rates
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    Privacy &amp; Policy
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <ListItemButton>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    Terms &amp; Conditions
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">my account</FooterTitle>
            <List>
              <ListItemButton onClick={() => navigate('/login')}>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    Login
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/signup')}>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    SignUp
                  </Typography>
                </ListItemText>
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/myaccount')}>
                <ListItemText>
                  <Typography lineHeight={2} variant="capton2">
                    My Account
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          </Grid>
          <Grid item md={6} lg={4}>
            <FooterTitle variant="body1">Information</FooterTitle>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
