import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Container, Typography } from '@mui/material';
import { useGeneral } from '../context/general';
import Scrollbar from '../components/scrollbar/Scrollbar';
import UploadInvoiceForm from '../sections/@dashboard/invoice/UploadInvoiceForm';

export default function UploadInvoicePage() {
  const { value } = useGeneral();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  return (
    <>
      <Helmet>
        <title> Upload Invoice | Snip & Ship </title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          Upload Invoice
        </Typography>

        <Card>
          <Scrollbar>
            <UploadInvoiceForm
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
