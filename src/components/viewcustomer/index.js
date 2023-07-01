import { useEffect } from 'react';
import { Backdrop, Box, Fade, Modal, Stack, TextField, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

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
  height: '55%',
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

export default function ViewCustomer({
  open2,
  handleClose2,
  currentUserID,
  previousUserID,
  findUserForDashboard,
  value,
}) {
  useEffect(() => {
    // console.log("Single User Result component reloaded");
    // console.log(props)
    if (currentUserID !== previousUserID) {
      findUserForDashboard(value, currentUserID);
    } else {
      // console.log("Value was previously serche for");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserID, previousUserID]);

  if (value.singleUser !== undefined && value.singleUser !== null) {
    // console.log("result is: ");
    // console.log(value.singleUser.length);
    if (value.singleUser.length > 0) {
      // console.log("greater than zero");
      let address = value.singleUser[0].addressLine1 !== undefined ? `${value.singleUser[0].addressLine1},` : ',';
      address += value.singleUser[0].addressLine2 !== undefined ? `${value.singleUser[0].addressLine2},` : ',';
      address += value.singleUser[0].city !== undefined ? `${value.singleUser[0].city},` : ',';
      address += value.singleUser[0].stateOrparish !== undefined ? `${value.singleUser[0].stateOrparish}` : '';
      return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open2}
          onClose={handleClose2}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open2}>
            <Box sx={style}>
              <CancelIcon color="primary" sx={closeStyle} onClick={handleClose2} />
              <Typography variant="h3">View Customer Info</Typography>
              <Stack spacing={3}>
                <Typography variant="p">
                  <b>Email:</b> {value.singleUser[0].email}
                </Typography>
                <Typography variant="p">
                  <b>Fullname:</b> {value.singleUser[0].fullName}
                </Typography>
                <Typography variant="p">
                  <b>Contact:</b> {value.singleUser[0].contactNumber}
                </Typography>
                <Typography variant="p">
                  <b>Address:</b> {address}
                </Typography>
              </Stack>
            </Box>
          </Fade>
        </Modal>
      );
    }
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open2}>
          <Box sx={style}>
            <CancelIcon color="primary" sx={closeStyle} onClick={handleClose2} />
            <Typography variant="h3">View Customer Info</Typography>
            <br />
            <Stack spacing={3}>
              <p style={{ justifyContent: 'center' }}>No User Was Found</p>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
          </Box>
        </Fade>
      </Modal>
    );
  }
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open2}
      onClose={handleClose2}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open2}>
        <Box sx={style}>
          <CancelIcon color="primary" sx={closeStyle} onClick={handleClose2} />
          <Typography variant="h3">View Customer Info</Typography>
          <br />
          <Stack spacing={3}>
            <p style={{ justifyContent: 'center' }}>Loading</p>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
        </Box>
      </Fade>
    </Modal>
  );
}
