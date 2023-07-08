import { useState } from 'react';
import { Grid, TextField, Typography, Checkbox, InputLabel, Alert } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
import EnvelopeIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import {
  ContactAddressSection,
  ContactFormButton,
  ContactFormContainer,
  ContactFormSection,
  ContactInnerFormContainer,
  ContactFromContainerTitleGrid,
} from '../../styles/contactus';
import { Colors } from '../../theme/palette';
import { useGeneral } from '../../context/general';

const contactValues = {
  user_email: '',
  user_subject: 'New Message From Website Customer',
  message: '',
  from_name: '',
};

export default function ContactUs() {
  const { value } = useGeneral();
  const { sendUserContactEmail } = value;
  const [error, setError] = useState('');
  const [terms, setTerms] = useState(false);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState(contactValues);

  const onInputChange2 = function onInputChange2(event) {
    const { value, name } = event.target;
    setState({ ...state, [name.toLowerCase()]: value });
  };

  const handleChange = (event) => {
    setTerms(event.target.checked);
  };

  const sendContactEmail = async function sendContactEmail(e) {
    e.preventDefault();
    // console.log("About to enter sendUserContactEmail");
    setLoading(true);
    setError('');
    setSuccess('');

    if (state.name === '') {
      setError('Please enter a Name.');
      return setLoading(false);
    }

    if (state.user_email === '') {
      setError('Please enter an Email Address.');
      return setLoading(false);
    }

    if (state.message === '' || state.message.length < 9) {
      setError('Please enter a message.');
      return setLoading(false);
    }

    if (!terms) {
      setError('Please check the box to agree to our Privacy Policy.');
      return setLoading(false);
    }

    await sendUserContactEmail(e.target).then(
      (result) => {
        // console.log(result);
        if (result) {
          // console.log("About to clear form");
          setState(contactValues);
          setTerms(false);
          setSuccess('Thank you for contacting us.');
          setLoading(false);
          setTimeout(() => {
            setSuccess();
          }, 4000);
        }
      },
      (error) => {
        // console.log(error);
        setError('Unable to make contact at this time.');
        setLoading(false);
      }
    );
    return null;
  };

  return (
    <>
      <ContactFormContainer id="contactus">
        <Grid container>
          <ContactFromContainerTitleGrid
            item
            xs={12}
            textAlign="center"
            style={{ marginBottom: '5%', textDecoration: 'underline' }}
          >
            <Typography variant="h2">Contact us!</Typography>
          </ContactFromContainerTitleGrid>
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
                          <a href="mailto:snipnship@gmail.com">snipnship@gmail.com</a>
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
                <form data-testid="contact-comp" id="contact-form-data" onSubmit={sendContactEmail}>
                  <Grid container>
                    <Grid item xs={12}>
                      <input
                        placeholder="SUBJECT"
                        name="user_subject"
                        value={state.user_subject}
                        style={{ marginBottom: 20 }}
                        onChange={(e) => onInputChange2(e)}
                        type="hidden"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="NAME"
                        name="from_name"
                        value={state.from_name}
                        fullWidth
                        required
                        style={{ marginBottom: 20 }}
                        onChange={(e) => onInputChange2(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Email"
                        name="user_email"
                        value={state.user_email}
                        fullWidth
                        required
                        style={{ marginBottom: 20 }}
                        onChange={(e) => onInputChange2(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        name="message"
                        value={state.message}
                        style={{ marginBottom: 20 }}
                        multiline
                        rows={4}
                        placeholder="Message"
                        onChange={(e) => onInputChange2(e)}
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
                            value={terms}
                            onChange={handleChange}
                            required
                          />
                        </Grid>
                        &nbsp;&nbsp;&nbsp;
                        <Grid item xs={10}>
                          <InputLabel>
                            <Link to="/Privacy" style={{ textDecoration: 'none', color: Colors.primary }}>
                              You agree to our Privacy Policy
                            </Link>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {error && (
                        <>
                          <Alert variant="filled" severity="error">
                            {error}
                          </Alert>
                          <br />
                        </>
                      )}
                      {success && (
                        <>
                          <Alert variant="filled" severity="success">
                            {success}
                          </Alert>
                          <br />
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <ContactFormButton type="submit" disabled={loading} fullWidth>
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
