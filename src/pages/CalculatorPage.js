import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Typography } from '@mui/material';
import { CalculatorForm } from '../sections/@dashboard/calculator';
import { useGeneral } from '../context/general';
import Scrollbar from '../components/scrollbar/Scrollbar';

export default function CalculatorPage() {
  const { value } = useGeneral();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  return (
    <>
      <Helmet>
        <title> Calculator | Snip & Ship </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Calculate Fees
        </Typography>

        <Card>
          <Scrollbar>
            <CalculatorForm
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
