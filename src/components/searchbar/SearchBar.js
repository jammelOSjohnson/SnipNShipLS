import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import Iconify from '../iconify/Iconify';

export default function SearchBar({ placeholder, data, requestSearch, searched }) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <TextField
      value={searched}
      label={placeholder}
      onChange={(searchVal) => requestSearch(searchVal)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <SearchOutlined /> : <Iconify icon={'eva:eye-off-fill'} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
