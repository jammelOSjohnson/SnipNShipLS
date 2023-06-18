import { useState } from 'react';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Link,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const clientData = {
  email: '',
  password: '',
  passwordconf: '',
  contact: '',
  fullname: '',
  parish: 'Select A Parish',
  terms: false,
};

export default function SignUpForm({ value, setError, setLoading, loadingBtn }) {
  const { signup, fetchUserInfoForSignUp } = value;

  const [client, setClient] = useState(clientData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    if (event.target.name === 'terms') {
      setClient({ ...client, [event.target.name]: event.target.checked });
    } else {
      setClient({ ...client, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside fuction");
    if (client.email === '') {
      return setError('Please enter your email');
    }
    if (client.fullname === '') {
      return setError('Please enter your fullname');
    }
    if (client.contact === '') {
      return setError('Please enter a contact number');
    }
    if (client.parish === '' || client.parish === 'Select A Parish') {
      return setError('Please select a parish');
    }
    if (client.password === '') {
      return setError('Please enter a password');
    }
    if (client.passwordconf === '') {
      return setError('Please confirm password');
    }
    if (client.password !== client.passwordconf) {
      return setError('Passwords do not match');
    }
    if (!client.terms) {
      return setError('Please check the box to agree to our terms and conditions.');
    }
    try {
      setError('');
      setLoading(true);
      await signup(client, value).then(async (res1) => {
        // console.log(res1);
        if (res1 != null) {
          if (res1 !== 'The email address is already in use by another account.') {
            await fetchUserDetailsSignUp(res1).then((res) => {
              if (res) {
                // console.log("About to close signup modal.");
                // setLoggedIn(true);
                // console.log("About to navigate to dashboard.");
                // console.log(userRolef);
                // history.push('/Dashboard');
              } else {
                setError('Unable to signup at this time');
              }
            });
          } else {
            setError('The email address is already in use by another account.');
          }
        } else {
          setError('Unable to signup at this time.');
        }
      });
    } catch (err) {
      console.log(err);
      setError('Failed to sign up');
    }
    setLoading(false);
    return null;
  };

  const fetchUserDetailsSignUp = async function fetchUserDetailsSignUp(payload) {
    // console.log("Is current user null");
    // console.log(value);
    if (payload.currentUser !== null && payload.currentUser !== undefined) {
      if (payload.currentUser.uid !== null && payload.currentUser.uid !== undefined) {
        // console.log("Fetching user info");
        // console.log(state);
        await fetchUserInfoForSignUp(payload.currentUser.uid, payload, client);
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          value={client.email}
          type="email"
          label="Email address"
          onChange={handleChange}
          required
        />
        <TextField name="fullname" value={client.fullname} label="Full Name" onChange={handleChange} required />
        <Grid container rowSpacing={3} sx={{ marginTop: '0px !important' }}>
          <Grid item xs={12} md={6}>
            <TextField
              name="contact"
              value={client.contact}
              type="number"
              label="Contact Number"
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="Parish">Parish</InputLabel>
              <Select
                id="demo-simple-select"
                name="parish"
                labelId="Parish"
                label="Parish"
                value={client.parish}
                onChange={handleChange}
                required
              >
                <MenuItem value={'Select A Parish'}>Select A Parish</MenuItem>
                <MenuItem value={'Kingston'}>Kingston</MenuItem>
                <MenuItem value={'St. Catherine'}>St. Catherine (Spanish Town)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TextField
          name="password"
          label="Password"
          value={client.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          required
        />
        <TextField
          name="passwordconf"
          label="Confirm Password"
          value={client.passwordconf}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          required
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="terms" label="Remember me" value={clientData.terms} onChange={handleChange} required />
        <Link href="/terms" target="_blank" variant="subtitle2" underline="hover">
          You agree to our Tems & Conditions?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        disabled={loadingBtn}
      >
        Sign Up
      </LoadingButton>
    </>
  );
}
