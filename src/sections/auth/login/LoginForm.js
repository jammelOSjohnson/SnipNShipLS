import { useState } from 'react';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const loginData = {
  email: '',
  password: '',
};
export default function LoginForm({ value, setError, setLoading, loadingBtn, handleOpen }) {
  const { login, fetchUserInfo } = value;
  const [client, setClient] = useState(loginData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside fuction");
    try {
      setError('');
      setLoading(true);
      if (client.email === '') {
        setError('Please enter email.');
        return setLoading(false);
      }

      if (client.password === '') {
        setError('Please enter password.');
        return setLoading(false);
      }
      return await login(client.email, client.password, value).then(async (res1) => {
        // console.log(res1);
        if (
          res1 === 'Email / Password Incorrect' ||
          res1 === 'Unable to login at this time' ||
          res1.currentUser === undefined
        ) {
          setLoading(false);
          return setError(res1 !== undefined ? res1 : 'Unable to login at this time');
        }
        setLoading(false);
        return setError('Unable to login at this time');
      });
    } catch {
      setLoading(false);
      return setError('Failed to login');
    }
  };

  const fetchUserDetails = async function fetchUserDetails(payload) {
    // console.log("Is current user null");
    // console.log(payload);
    if (payload.currentUser !== null && payload.currentUser !== undefined) {
      if (payload.currentUser.uid !== null && payload.currentUser.uid !== undefined) {
        // console.log("Fetching user info");
        return fetchUserInfo(payload.currentUser.uid, payload);
      }
    }
    return false;
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" type="email" label="Email address" onChange={handleChange} required />

        <TextField
          name="password"
          label="Password"
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
        <Link variant="subtitle2" underline="hover" onClick={() => handleOpen()}>
          Forgot password?
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
        Login
      </LoadingButton>
    </>
  );
}
