import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

export default function Loading() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" justifyContent={'center'}>
      <Typography />
      <CircularProgress color="primary" />
    </Stack>
  );
}
