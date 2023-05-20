import { Grid, TextField, Typography, Checkbox, InputLabel } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
import EnvelopeIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import {
  ContactAddressSection,
  ContactFormButton,
  ContactFormContainer,
  ContactFormSection,
  ContactInnerFormContainer,
} from '../../styles/contactus';
import { Colors } from '../../theme/palette';

export default function ContactUs() {
  return (
    <>
      <ContactFormContainer id="contactus">
        <Grid container>
          <Grid item xs={12} textAlign="center" style={{ marginBottom: '5%', textDecoration: 'underline' }}>
            <Typography variant="h2">Contact us!</Typography>
          </Grid>
        </Grid>
        <ContactInnerFormContainer container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12} md={3} />
              <ContactAddressSection item xs={12} md={9}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={1}>
                        <LocationIcon color="primary" />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Remote Jamaica</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 50 }}>
                    <Grid container>
                      <Grid item xs={1}>
                        <EnvelopeIcon color="primary" />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">
                          <a href="mailto:temporaryemail@companyname.com">temporaryemail@companyname.com</a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 45 }}>
                    <img src="/assets/images/util/map.jfif" height="45%" width="100%" alt="map" />
                  </Grid>
                </Grid>
              </ContactAddressSection>
            </Grid>
          </Grid>
          <ContactFormSection item xs={12} md={6}>
            <Grid container>
              <Grid item xs={0} md={1} />
              <Grid item xs={12} md={8}>
                <form>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField placeholder="NAME" fullWidth required style={{ marginBottom: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField placeholder="Email" fullWidth required style={{ marginBottom: 20 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        style={{ marginBottom: 20 }}
                        multiline
                        rows={4}
                        placeholder="Message"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={1}>
                          <Checkbox
                            sx={{
                              color: Colors.primary,
                              '&.Mui-checked': {
                                color: Colors.primary,
                              },
                            }}
                            required
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <InputLabel>
                            <Link to="/Privacy" style={{ textDecoration: 'none', color: Colors.primary }}>
                              You agree to our Privacy Policy
                            </Link>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <ContactFormButton type="submit" fullWidth>
                        SUBMIT
                      </ContactFormButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </ContactFormSection>
        </ContactInnerFormContainer>
      </ContactFormContainer>
    </>
  );
}
