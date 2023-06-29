import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Typography } from '@mui/material';
import Scrollbar from '../components/scrollbar/Scrollbar';
// sections
import AddPackageForm from '../sections/@dashboard/addpackage';

// context
import { useGeneral } from '../context/general';

export default function AddPackage() {
  const { value } = useGeneral();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  const { addPackageStaff } = value;
  return (
    <>
      <Helmet>
        <title> Add Package | Snip & Ship </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Add Package
        </Typography>

        <Card>
          <Scrollbar>
            <AddPackageForm
              value={value}
              error={error}
              setError={setError}
              success={success}
              setSuccess={setSuccess}
              loadingBtn={loadingBtn}
              setLoading={setLoading}
              addPackageStaff={addPackageStaff}
            />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
