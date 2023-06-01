import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [parish, setParish] = useState('Select A Parish');

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleChange = (event) => {
    setParish(event.target.value);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" required />
        <TextField name="text" label="Full Name" required />
        <TextField name="number" label="Contact Number" required />
        <FormControl fullWidth>
          <InputLabel id="Parish">Parish</InputLabel>
          <Select
            id="demo-simple-select"
            labelId="Parish"
            label="Parish"
            value={parish}
            onChange={handleChange}
            required
          >
            <MenuItem value={'Select A Parish'}>Select A Parish</MenuItem>
            <MenuItem value={'Kingston'}>Kingston</MenuItem>
            <MenuItem value={'St. Catherine'}>St. Catherine</MenuItem>
          </Select>
        </FormControl>
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
          required
        />
        <TextField
          name="confirmpassword"
          label="Confirm Password"
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
          required
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}
      <br />
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}
