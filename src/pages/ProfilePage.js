import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Card, Container, Typography } from '@mui/material';
// components
import Scrollbar from '../components/scrollbar';
// sections
import { ProfileForm } from '../sections/@dashboard/profile';
// context
import { useGeneral } from '../context/general';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ProfilePage() {
  const value = useGeneral();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  return (
    <>
      <Helmet>
        <title> Profile | Snip & Ship </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        <Card>
          <Scrollbar>
            <ProfileForm
              value={value}
              error={error}
              setError={setError}
              success={success}
              setSuccess={setSuccess}
              loadingBtn={loadingBtn}
              setLoading={setLoading}
            />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
