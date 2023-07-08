import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, Stack, TextField, Typography } from '@mui/material';
import Doc from '@mui/icons-material/FileUpload';

const fileValues = { file: '', content: '', tracking_number: '', merchant: '', amount: '' };

export default function UploadInvoiceForm({ value, error, setError, setLoading, loadingBtn, success, setSuccess }) {
  const { uploadInvoice, clientInfo, mailboxNum } = value;
  const [state, setState] = useState(fileValues);
  const [fileDisplay, setFileDisplay] = useState('');

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    let data = '';

    if (state.content !== null && state.content !== undefined) {
      if (state.content.type !== null || state.content.type !== undefined) {
        if (
          state.content.type === 'application/pdf' ||
          state.content.type === 'image/png' ||
          state.content.type === 'image/svg+xml' ||
          state.content.type === 'image/jpeg'
        ) {
          if (state.tracking_number.length < 3) {
            return setError('Please enter the tracking number.');
          }

          if (state.merchant.length < 3) {
            return setError('Please enter the merchants name. Eg. Amazon');
          }

          if (state.amount.length < 3) {
            return setError('Please enter the invoice total. Eg. 75');
          }

          await getBase64(state.content, async (result) => {
            data = result;
            // console.log(data);
            try {
              setError('');
              setSuccess('');
              setLoading(true);
              await uploadInvoice(state, data, clientInfo, mailboxNum)
                .then((res) => {
                  if (res === true) {
                    setSuccess('Invoice uploaded successfully.');
                    setState(fileValues);
                    setFileDisplay('');
                    setState(fileValues);
                    setLoading(false);
                    setTimeout(() => {
                      setSuccess('');
                    }, 4000);
                    // console.log(dateFeildDesktop.value);
                  } else if (res === false) {
                    setError('Unable to upload invoice at this time');
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch {
              setError('Unable to upload invoice at this time.');
              setLoading(false);
            }
          });
        } else {
          return setError('Please upload a valid invoice. Only Pdf, Png, Jpg/Jpeg and Svg files are allowed.');
        }
      } else {
        return setError('Please upload a valid invoice. Only Pdf, Png, Jpg/Jpeg and Svg files are allowed.');
      }
    } else {
      return setError('Please upload a valid invoice. Only Pdf, Png, Jpg/Jpeg and Svg files are allowed.');
    }
    return setLoading(false);
  };

  const getBase64 = async function getBase64(file, cb) {
    try {
      if (file !== '') {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          cb(reader.result);
        };
        reader.onerror = () => {
          // console.log('Error: ', error);
        };
      } else {
        return '';
      }
    } catch (err) {
      // console.log(err);
      setError('Unable to upload invoice at this time.');
      return '';
    }
    return '';
  };

  const onInputChange2 = function onInputChange2(event) {
    // console.log(event.target.value);
    const { value, name } = event.target;

    if (name === 'file') {
      // console.log(event.target.files[0])
      setState({
        ...state,
        [name.toLowerCase()]: value,
        content: event.target.files[0],
      });
    } else {
      setState({ ...state, [name.toLowerCase()]: value });
    }
  };

  useEffect(() => {
    if (state.content !== '' && state.content.name !== fileDisplay) {
      setFileDisplay(state.content.name);
    }
  }, [state.content, fileDisplay]);

  return (
    <>
      <Stack spacing={3}>
        <TextField name="file" value={state.file} onChange={(e) => onInputChange2(e)} type="file" required />
        {fileDisplay && (
          <Stack direction={'row'} spacing={3}>
            <Doc /> <Typography>{fileDisplay}</Typography>
          </Stack>
        )}
        <TextField
          label="Tracking Number"
          name="tracking_number"
          value={state.tracking_number}
          onChange={(e) => onInputChange2(e)}
          type="text"
          required
        />
        <TextField
          label="Merchant Name"
          name="merchant"
          value={state.merchant}
          onChange={(e) => onInputChange2(e)}
          type="text"
          required
        />
        <TextField
          label="Invoice Total"
          name="amount"
          value={state.amount}
          onChange={(e) => onInputChange2(e)}
          type="text"
          required
        />
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
          UPLOAD INVOICE
        </LoadingButton>
      </Stack>
    </>
  );
}
