import { LoadingButton } from '@mui/lab';
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
  TextField,
  Typography,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { useEffect, useState } from 'react';
import Moment from 'moment';

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
  height: '40%',
  borderRadius: '5%',
};

const closeStyle = {
  position: 'absolute',
  top: '35px',
  right: '5%',
  fontSize: '2rem',
  '&:hover': {
    cursor: 'pointer',
  },
};

const packageValues = {
  cost: '',
  item_name: '',
  mailbox_number: '',
  merchant: '',
  order_date: '',
  status: 'Select A Status',
  tracking_number: '',
  weight: '',
  courier: 'Select A Courier',
  fcost: '',
  fullName: '',
  house_Num: '',
};

export default function DeletePackage({ open3, handleClose3, tracking, pack, deletePackage }) {
  const [message, setMessage] = useState('');
  const [fail, setFail] = useState('');
  const [loadingBtn, setLoading] = useState(false);
  const [state, setState] = useState(packageValues);
  const [packIndex, setPAckIndex] = useState(undefined);

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    setFail('');
    setLoading(true);
    try {
      setFail('');
      setMessage('');
      setLoading(true);

      await deletePackage(tracking).then((res) => {
        if (res === true) {
          console.log('here');
          setMessage('Package deleted successfully.');
          setTimeout(() => {
            setMessage('');
            setLoading(false);
            handleClose3();
          }, 3000);
        } else {
          setFail('Unable to delete Package at this time');
          setLoading(false);
        }
      });
    } catch (err) {
      console.log('here', err);
      setLoading(false);
      setFail('Failed to delete package');
    }
    setLoading(false);
    return null;
  };

  useEffect(() => {
    // console.log(tracking);
    // console.log(state.tracking_number);
    if (state.tracking_number !== tracking) {
      if (tracking !== undefined && tracking !== '') {
        // console.log('here');
        if (pack !== undefined) {
          // console.log('here2');
          const numRows = pack.length;
          const packFound = [];
          for (let i = 0; i < numRows; ) {
            if (tracking === pack[i].PackageDetails.TrackingNumber) {
              // console.log('What is inside single package');
              // console.log(pack[i]);
              packFound.push(pack[i]);
              setPAckIndex(i);
            }
            i += 1;
          }
          // console.log('Package to be editer is');
          // console.log(packFound);
          if (packFound.length > 0) {
            const date = packFound[0].PackageDetails.OrderDate.toDate();
            // console.log(date);
            const conVDate = Moment(date);
            // console.log(conVDate);
            const fdate = conVDate;
            setState({
              ...state,
              cost:
                packFound[0].PackageDetails.Cost != null && packFound[0].PackageDetails.Cost !== undefined
                  ? packFound[0].PackageDetails.Cost
                  : '',
              item_name:
                packFound[0].PackageDetails.ItemName != null && packFound[0].PackageDetails.ItemName !== undefined
                  ? packFound[0].PackageDetails.ItemName
                  : '',
              mailbox_number:
                packFound[0].PackageDetails.MBoxNumber != null && packFound[0].PackageDetails.MBoxNumber !== undefined
                  ? packFound[0].PackageDetails.MBoxNumber
                  : '',
              merchant:
                packFound[0].PackageDetails.MerchantName != null &&
                packFound[0].PackageDetails.MerchantName !== undefined
                  ? packFound[0].PackageDetails.MerchantName
                  : '',
              order_date:
                packFound[0].PackageDetails.OrderDate != null && packFound[0].PackageDetails.OrderDate !== undefined
                  ? fdate
                  : '',
              status:
                packFound[0].PackageDetails.ItemStatus != null && packFound[0].PackageDetails.ItemStatus !== undefined
                  ? packFound[0].PackageDetails.ItemStatus
                  : '',
              tracking_number:
                packFound[0].PackageDetails.TrackingNumber != null &&
                packFound[0].PackageDetails.TrackingNumber !== undefined
                  ? packFound[0].PackageDetails.TrackingNumber
                  : '',
              weight:
                packFound[0].PackageDetails.Weight != null && packFound[0].PackageDetails.Weight !== undefined
                  ? packFound[0].PackageDetails.Weight
                  : '',
              courier:
                packFound[0].PackageDetails.Courier != null && packFound[0].PackageDetails.Courier !== undefined
                  ? packFound[0].PackageDetails.Courier
                  : '',
              fcost:
                packFound[0].PackageDetails.Total != null && packFound[0].PackageDetails.Total !== undefined
                  ? packFound[0].PackageDetails.Total
                  : 0,
              fullName:
                packFound[0].clientName != null && packFound[0].clientName !== undefined ? packFound[0].clientName : '',
            });
          }
        }
      }
    }
  }, [tracking, pack]);

  // console.log(state);

  if (tracking !== '' && state.tracking_number !== '') {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open3}>
          <Box sx={style}>
            <CancelIcon color="primary" sx={closeStyle} onClick={handleClose3} />
            <Typography variant="h3">Are You Sure?</Typography>
            <br />
            <Stack spacing={3}>
              <Typography variant="body1">{`You are about to delete package with tracking number: ${state.tracking_number}`}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
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
            <LoadingButton
              fullWidth
              color="error"
              size="large"
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              disabled={loadingBtn}
            >
              DELETE PACKAGE
            </LoadingButton>
          </Box>
        </Fade>
      </Modal>
    );
  }
  return <></>;
}
