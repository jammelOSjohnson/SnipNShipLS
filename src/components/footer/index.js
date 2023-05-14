import { Typography, Grid, Box, List, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Colors } from '../../theme/palette';
import { FooterTitle } from '../../styles/footer';

export default function Footer() {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Typography>
            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            >
              <FacebookIcon sx={{ mr: 1 }} />
              <TwitterIcon sx={{ mr: 1 }} />
              <InstagramIcon sx={{ mr: 1 }} />
            </Box>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">Information</FooterTitle>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  About Us
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  Our Rates
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  Privacy &amp; Policy
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  Terms &amp; Conditions
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">my account</FooterTitle>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  Login
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  SignUp
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="capton2">
                  My Account
                </Typography>
              </ListItemText>
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
