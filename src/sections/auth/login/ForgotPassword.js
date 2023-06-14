import { useState } from 'react';
// @mui
import { Stack, TextField, Modal, Fade, Box, Backdrop, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// ----------------------------------------------------------------------
const loginData = {
  email: '',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ForgotPassword({ value, setLoading, loadingBtn, open, setOpen }) {
  const { resetPassword } = value;
  const [client, setClient] = useState(loginData);
  const [message, setMessage] = useState('');
  const [fail, setFail] = useState('');
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside fuction");
    try {
      setFail('');
      setLoading(true);
      if (client.email === '') {
        setFail('Please enter email.');
      } else {
        await resetPassword(client.email).then(() => {
          setLoading(false);
          setMessage('Check your email inbox/spam folder for further instructions.');
        });
      }
    } catch {
      setLoading(false);
      setFail('Failed to reset password');
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h3">Reset Password</Typography>
            <Stack spacing={3}>
              <TextField name="email" type="email" label="Email address" onChange={handleChange} required />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              disabled={loadingBtn}
            >
              RESET
            </LoadingButton>
            {fail && (
              <Alert variant="filled" severity="error">
                {fail}
              </Alert>
            )}
            {message && (
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
