import { useEffect, useState } from 'react';
// @mui
import { Stack, TextField, Alert, Grid, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// ----------------------------------------------------------------------
const clientData = {
  email: '',
  contact: '',
  fullname: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  parish: 'Select A Parish',
  terms: false,
};
export default function ProfileForm({ value, error, setError, setLoading, loadingBtn, success, setSuccess }) {
  const { updateUserInfo, clientInfo } = value;
  const [client, setClient] = useState(clientData);

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
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
    if (client.addressLine1 === '') {
      return setError('Please enter a address line 1.');
    }
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await updateUserInfo(value.currentUser.uid, value, client).then(() => {
        setSuccess('Profile updated successfully.');
        setTimeout(() => {
          setSuccess('');
        }, 4000);
      });
    } catch {
      setLoading(false);
      setError('Failed to login');
    }
    setLoading(false);
    return null;
  };

  useEffect(() => {
    setClient({
      ...client,
      email: clientInfo.email,
      fullname: clientInfo.fullName,
      contact: clientInfo.contactNumber,
      addressLine1: clientInfo.addressLine1,
      addressLine2: clientInfo.addressLine2,
      parish: clientInfo.stateOrparish,
      postalCode: clientInfo.postalCode,
    });
  }, [clientInfo]);

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
        <TextField
          name="contact"
          value={client.contact}
          type="number"
          label="Contact Number"
          onChange={handleChange}
          required
        />
        <TextField
          name="addressLine1"
          value={client.addressLine1}
          type="text"
          label="Address Line1"
          onChange={handleChange}
          required
        />
        <TextField
          name="addressLine2"
          value={client.addressLine2}
          type="text"
          label="Address Line2"
          onChange={handleChange}
          required
        />
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
        <TextField
          name="postalCode"
          value={client.postalCode}
          type="text"
          label="Postal Code"
          onChange={handleChange}
          required
        />
      </Stack>
      <br />
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
