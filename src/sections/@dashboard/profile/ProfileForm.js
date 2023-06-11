import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const loginData = {
  email: '',
  password: '',
};
export default function ProfileForm({ value, error, setError, setLoading, loadingBtn, success, setSuccess }) {
  const { updateUserInfo } = value;
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
    } catch {
      setLoading(false);
      setError('Failed to login');
    }
    setLoading(false);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" type="email" label="Email address" onChange={handleChange} required />
      </Stack>
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      )}
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={(e) => handleSubmit(e)}
        disabled={loadingBtn}
      >
        Update Profile
      </LoadingButton>
    </>
  );
}
