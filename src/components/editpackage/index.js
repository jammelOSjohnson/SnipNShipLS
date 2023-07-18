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
  overflowY: 'scroll',
  height: '90%',
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

export default function EditPackage({ open, handleClose, tracking, pack, editPackageStaff, value }) {
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

      if (state.order_date.length < 3) {
        setLoading(false);
        return setFail('Please select date received');
      }

      if (state.status === 'Select A Status') {
        setLoading(false);
        return setFail('Please select status');
      }

      if (state.tracking_number === '') {
        setLoading(false);
        return setFail('Please enter a tracking number');
      }

      if (state.courier === 'Select A Courier') {
        setLoading(false);
        return setFail('Please select a courier');
      }

      if (state.item_name === '') {
        setLoading(false);
        return setFail('Please enter the name of the item');
      }

      if (state.mailbox_number === '') {
        setLoading(false);
        return setFail('Please enter a mailbox number');
      }

      if (state.merchant === '') {
        setLoading(false);
        return setFail('Please enter a marchant name');
      }

      if (state.fcost === '') {
        setLoading(false);
        return setFail('Please enter total cost');
      }

      await editPackageStaff(state, tracking, value, packIndex).then((res) => {
        if (res === true) {
          console.log('here');
          setMessage('Package updated successfully.');
          setTimeout(() => {
            setMessage('');
            setLoading(false);
            handleClose();
          }, 3000);
        } else if (res === 'Mailbox or package doesnot exist') {
          setFail('Please enter a valid mailbox number.');
          setLoading(false);
        } else if (res === false) {
          setFail('Unable to update Package at this time');
          setLoading(false);
        }
      });
    } catch (err) {
      console.log('here', err);
      setLoading(false);
      setFail('Failed to update package');
    }
    setLoading(false);
    return null;
  };

  const handleChange = function handleChange(event) {
    const { checked, value, name } = event.target;
    if (name === 'tracking_number' || name === 'house_Num') {
      let trackcheck = value.trimStart();
      trackcheck = value.trimEnd();
      // console.log('trimed', trackcheck);
      setState({ ...state, [name]: trackcheck });
    } else {
      setState({ ...state, [name.toLowerCase()]: value });
    }
  };

  const handleChange1 = function handleChange1(event) {
    // console.log(event.target.value);
    const { value } = event.target;
    setState({ ...state, status: value });
  };

  const handleChange3 = function handleChange3(event) {
    // console.log(event.target.value);
    const { value } = event.target;
    setState({ ...state, courier: value });
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

  const options2 = [
    { value: 'UPS', label: 'UPS' },
    { value: 'US Postage', label: 'US Postage' },
    { value: 'DHL', label: 'DHL' },
    { value: 'USPS', label: 'USPS' },
    { value: 'Amazon Logistics', label: 'Amazon Logistics' },
    { value: 'China Post', label: 'China Post' },
    { value: 'FedEx', label: 'FedEx' },
    { value: 'Hong Kong Post', label: 'Hong Kong Post' },
    { value: 'IBC', label: 'IBC' },
    { value: 'Korea Post', label: 'Korea Post' },
    { value: 'Lasership', label: 'Lasership' },
    { value: 'Royal Mail', label: 'Royal Mail' },
    { value: 'Major Express', label: 'Major Express' },
    { value: 'TRX', label: 'TRX' },
    { value: 'DSG', label: 'DSG' },
    { value: 'Other', label: 'Other' },
  ];

  const options = [
    { value: 'Arrived At Warehouse', label: 'Arrived At Warehouse' },
    { value: 'Ready For Pickup', label: 'Ready For Pickup' },
    { value: 'Delivered', label: 'Delivered' },
  ];

  if (tracking !== '' && state.tracking_number !== '') {
    return (
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
            <CancelIcon color="primary" sx={closeStyle} onClick={handleClose} />
            <Typography variant="h3">Edit Package</Typography>
            <br />
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="courier">Courier</InputLabel>
                <Select
                  name="courier"
                  labelId="courier"
                  label="Courier"
                  value={state.courier}
                  onChange={(e) => handleChange3(e)}
                  required
                >
                  <MenuItem value={'Select A Courier'}>Select A Courier</MenuItem>
                  {options2.map((item) => {
                    return (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  name="status"
                  labelId="status"
                  label="Status"
                  value={state.status}
                  onChange={(e) => handleChange1(e)}
                  required
                >
                  <MenuItem value={'Select A Status'}>Select A Status</MenuItem>
                  {options.map((item) => {
                    return (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                id="order_date"
                label="Start Date"
                name="order_date"
                value={
                  state.order_date !== null && state.order_date !== undefined
                    ? Moment(state.order_date?.toDate()).format('YYYY-MM-DD hh:mm').toString()
                    : ''
                }
                onChange={(e) => handleChange(e)}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Tracking Number"
                name="tracking_number"
                placeholder="Tracking Number"
                value={state.tracking_number}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <TextField
                label="Item Name"
                name="item_name"
                placeholder="Item Name"
                value={state.item_name}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <TextField
                label="Mailbox Number"
                name="mailbox_number"
                placeholder="Mailbox Number"
                value={state.mailbox_number}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <TextField
                label="Enter Weight"
                name="weight"
                placeholder="Enter Weight"
                value={state.weight}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <TextField
                label="Enter Merchant"
                name="merchant"
                placeholder="Enter Merchant"
                value={state.merchant}
                onChange={(e) => handleChange(e)}
                type="text"
              />
              <TextField
                label="Enter Total Cost"
                name="fcost"
                placeholder="Enter Total Cost"
                value={state.fcost}
                onChange={(e) => handleChange(e)}
                type="number"
              />
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
    );
  }
  return <></>;
}
