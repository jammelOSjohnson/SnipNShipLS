import {
  Alert,
  Backdrop,
  Box,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useGeneral } from '../../context/general';

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
  overflowY: 'scroll',
  height: '55%',
  borderRadius: '5%',
};

export default function CheckParish() {
  const [open, setOpen] = useState(false);
  const { value } = useGeneral();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  const { updateUserInfo, clientInfo } = value;
  const [client, setClient] = useState(clientData);

  const handleChange = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
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
          setOpen(false);
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

    if (clientInfo.email !== '' && clientInfo.stateOrparish === '') {
      setOpen(true);
    }
    //  react-hooks/exhaustive-deps
  }, [clientInfo]);
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
            <Typography variant="h3">Select A Parish</Typography>
            <Typography variant="body2" color="red">
              Please select a parish to ensure you receive the correct shipping address.
            </Typography>
            <br />
            <Stack spacing={3}>
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
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
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
              UPDATE
            </LoadingButton>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
