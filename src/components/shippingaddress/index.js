import { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useGeneral } from '../../context/general';
import Loading from '../loading';

// import Tippy from "@tippy.js/react";
// import "tippy.js/dist/tippy.css";

export default function ShippingAddress() {
  const [addressData, setAddressData] = useState({ seaFreightAdd: undefined, airFreightAdd: undefined });
  let Firstname = '';
  const { value } = useGeneral();
  const { clientInfo, seaFreightAdd, mailboxNum, airFreightAdd, fetchAddress, currentUser } = value;

  useEffect(() => {
    if (currentUser != null) {
      try {
        // console.log('about to enter fetch adddress', mailboxNum);
        if (mailboxNum === null || mailboxNum === undefined || mailboxNum === '') {
          fetchAddress(currentUser.uid, value);
        }
        // console.log(airFreightAdd);
        if (airFreightAdd !== undefined && seaFreightAdd !== undefined) {
          setAddressData({ airFreightAdd, seaFreightAdd });
        }
      } catch {
        // console.log("unable to fetch address");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airFreightAdd, currentUser, mailboxNum, fetchAddress]);

  if (
    value.clientInfo.fullName == null &&
    value.clientInfo.fullName === undefined &&
    value.clientInfo.fullName === ''
  ) {
    Firstname = 'Display Name';
  } else {
    Firstname = value.clientInfo.fullName;
  }

  if (addressData.seaFreightAdd === undefined && addressData.airFreightAdd === undefined) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (clientInfo.stateOrparish === 'Kingston') {
    return (
      <>
        <Stack component="span" direction="column" spacing={2}>
          <Typography />
          <Typography variant="p">
            <b>Your Name: </b>
            {/* {`${Firstname?.toUpperCase()} - ${mailboxNum}`} */}
            {`${Firstname?.toUpperCase()}`}
          </Typography>
          <Typography variant="p">
            <b>Address Line 1: </b>
            {`${airFreightAdd.addressLine1}`}
          </Typography>
          <Typography variant="p">
            <b>Address Line 2: </b>
            {`${airFreightAdd.addressLine2} - ${mailboxNum}`}
          </Typography>
          <Typography variant="p">
            <b>City: </b>
            {airFreightAdd.city}
          </Typography>
          <Typography variant="p">
            <b>State: </b>
            {airFreightAdd.state}
          </Typography>
          <Typography variant="p">
            <b>Zip Code: </b>
            {airFreightAdd.zipCode}
          </Typography>
          <p />
        </Stack>
      </>
    );
  }

  if (clientInfo.stateOrparish === 'St. Catherine') {
    return (
      <>
        <Stack component="span" direction="column" spacing={2}>
          <Typography />
          <Typography variant="p">
            <b>Your Name: </b>
            {/* {`${Firstname?.toUpperCase()} - ${mailboxNum}`} */}
            {`${Firstname?.toUpperCase()}`}
          </Typography>
          <Typography variant="p">
            <b>Address Line 1: </b>
            {`${seaFreightAdd.addressLine1}`}
          </Typography>
          <Typography variant="p">
            <b>Address Line 2: </b>
            {/* {seaFreightAdd.addressLine2} */}
            {`${seaFreightAdd.addressLine2} - ${mailboxNum}`}
          </Typography>
          <Typography variant="p">
            <b>City: </b>
            {seaFreightAdd.city}
          </Typography>
          <Typography variant="p">
            <b>State: </b>
            {seaFreightAdd.state}
          </Typography>
          <Typography variant="p">
            <b>Zip Code: </b>
            {seaFreightAdd.zipCode}
          </Typography>
          <p />
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack component="span" direction="column" spacing={2}>
        <Typography />
        <Typography variant="p">
          <b>Your Name: </b>
          {`${Firstname?.toUpperCase()} - ${mailboxNum}`}
        </Typography>
        <Typography variant="p">
          <b>Address Line 1: </b>
          {airFreightAdd.addressLine1}
        </Typography>
        <Typography variant="p">
          <b>Address Line 2: </b>
          {airFreightAdd.addressLine2}
        </Typography>
        <Typography variant="p">
          <b>City: </b>
          {airFreightAdd.city}
        </Typography>
        <Typography variant="p">
          <b>State: </b>
          {airFreightAdd.state}
        </Typography>
        <Typography variant="p">
          <b>Zip Code: </b>
          {airFreightAdd.zipCode}
        </Typography>
        <p />
      </Stack>
    </>
  );
}
