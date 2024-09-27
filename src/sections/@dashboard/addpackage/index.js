import { useEffect, useState } from 'react';
import Moment from 'moment';
import { LoadingButton } from '@mui/lab';
import { Alert, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';

const packageValues = {
  cost: '',
  item_name: '',
  mailbox_number: '',
  merchant: '',
  order_date: Moment().format('YYYY-MM-DD hh:mm').toString(),
  status: 'Select A Status',
  tracking_number: '',
  weight: '',
  courier: 'Select A Courier',
  fcost: '',
  fullName: '',
  house_Num: '',
};
export default function AddPackageForm({
  value,
  error,
  setError,
  setLoading,
  loadingBtn,
  success,
  setSuccess,
  addPackageStaff,
}) {
  const [state, setState] = useState(packageValues);

  const handleChange = function handleChange(event) {
    const { checked, value, name } = event.target;
    if (name === 'tracking_number' || name === 'house_Num' || name === 'mailbox_number') {
      let trackcheck = value.trimStart();
      trackcheck = trackcheck.trimEnd();
      console.log('trimed', trackcheck);
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

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside fuction");
    if (state.order_date.length < 3) {
      setLoading(false);
      return setError('Please select date received');
    }

    if (state.status === 'Select A Status') {
      setLoading(false);
      return setError('Please select status');
    }

    if (state.tracking_number === '') {
      setLoading(false);
      return setError('Please enter a tracking number');
    }

    if (state.courier === 'Select A Courier') {
      setLoading(false);
      return setError('Please select a courier');
    }

    if (state.item_name === '') {
      setLoading(false);
      return setError('Please enter the name of the item');
    }

    if (state.mailbox_number === '') {
      setLoading(false);
      return setError('Please enter a mailbox number');
    }

    if (state.merchant === '') {
      setLoading(false);
      return setError('Please enter a marchant name');
    }

    if (state.fcost === '') {
      setLoading(false);
      return setError('Please enter total cost');
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await addPackageStaff(state).then((res) => {
        if (res === state.tracking_number) {
          setError(`A package with the tracking number ${res} already exists.`);
          setTimeout(() => {
            setError('');
          }, 4000);
        } else if (res === true) {
          setSuccess('Package added successfully.');
          // console.log(res);
          setState(packageValues);
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        } else if (res === 'Mailbox doesnot exist') {
          setError('Please enter a valid mailbox number.');
          setTimeout(() => {
            setError('');
          }, 4000);
        } else if (res === false) {
          setError('Unable to add Package at this time');
          setTimeout(() => {
            setError('');
          }, 4000);
        }
      });
    } catch (err) {
      // console.log(err);
      setError('Failed to add package.');
      setTimeout(() => {
        setError('');
      }, 4000);
    }
    setLoading(false);

    return null;
  };

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
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Arrived At Warehouse', label: 'Arrived At Warehouse' },
    { value: 'In Jamaica', label: 'In Jamaica' },
    { value: 'Ready For Pickup', label: 'Ready For Pickup' },
    { value: 'Delivered', label: 'Delivered' },
  ];

  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="order_date"
          label="Order Date"
          name="order_date"
          value={
            state.order_date !== null && state.order_date !== undefined && state.order_date === ''
              ? Moment().format('YYYY-MM-DD hh:mm').toString()
              : state.order_date
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
        SAVE PACKAGE
      </LoadingButton>
    </>
  );
}
