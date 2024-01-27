import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// context
import { useGeneral } from '../../context/general';

export default function Popup() {
  const { value } = useGeneral();
  const { fetchPopupSettings, popupSetting } = value;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    try {
      // console.log('triggered');
      if (popupSetting === undefined) {
        fetchPopupSettings(value);
      } else {
        // console.log(popupSetting);
        setOpen(popupSetting);
      }
    } catch (err) {
      console.log(err);
    }
  }, [popupSetting]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{''}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <img
            src="/assets/images/popup/snipnship_adv.jpeg"
            alt="popup"
            width={'100%'}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
