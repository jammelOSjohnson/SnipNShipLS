import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Moment time
import Moment from 'moment';
// components
// import Iconify from '../components/iconify';
import ViewAuditedPackagesAdmin from '../components/viewauditedpackagesadmin';

// sections
// context
import { useGeneral } from '../context/general';
// ----------------------------------------------------------------------

export default function PackageAuditPage() {
  // const theme = useTheme();
  const { value } = useGeneral();
  const { userRolef, loggedIn, findPackagesByDateRange } = value;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(Moment().clone().startOf('day').format('YYYY-MM-DDTHH:mm').toString());
  const [endDate, setEndDate] = useState(Moment().clone().endOf('day').format('YYYY-MM-DDTHH:mm').toString());
  const [parish, setParish] = useState('Kingston');
  const [loadingBtn, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loggedIn && (userRolef !== 'Admin' || userRolef !== 'Staff')) {
      // console.log("Dashboard LoggedIn Value" + loggedIn);
      // console.log('going home');
      navigate('/Home');
    }

    const start = Moment().clone().startOf('month').subtract(3, 'months').format('YYYY-MM-DD hh:mm').toString();
    const end = Moment().clone().endOf('month').format('YYYY-MM-DD hh:mm').toString();

    try {
      // console.log('fetching packages');
      findPackagesByDateRange(start, end, value, 'audit', parish);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = function handleChange(event) {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    } else if (event.target.name === 'parish') {
      setParish(event.target.value);
    }

    console.log(startDate, parish);
  };

  const handleSubmit = async function handleSubmit(event) {
    event.preventDefault();
    // prevents default form refresh
    // console.log("I am inside fuction");
    // console.log(state.end_date);
    // console.log(state.start_date);
    if (startDate.length < 3 || endDate.length < 3) {
      return setError('Please select a proper date range');
    }
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      const start = Moment(startDate, 'YYYY-MM-DD');
      const end = Moment(endDate, 'YYYY-MM-DD');
      console.log('about to call find Packages By Date Range');
      findPackagesByDateRange(start, end, value, 'audit', parish);
    } catch {
      setError('Failed to fetch packages.');
    }
    setLoading(false);
    return null;
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Snip & Ship </title>
      </Helmet>

      <Container maxWidth="xl">
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Package Audit
          </Typography>
        </Container>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Container>
              <Grid container>
                <form>
                  <Stack direction={'row'} justifyContent="left" spacing={{ xs: 12, sm: 10, md: 2 }}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="datetime-local"
                        label="Start Date"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => handleChange(e)}
                        type="datetime-local"
                        // defaultValue={Moment()
                        //   .clone()
                        //   .startOf('month')
                        //   .subtract(3, 'months')
                        //   .format('YYYY-MM-DD hh:mm')
                        //   .toString()}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={12} md={4}>
                      <TextField
                        id="datetime-local2"
                        label="End Date"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => handleChange(e)}
                        type="datetime-local"
                        // defaultValue={Moment().clone().endOf('month').format('YYYY-MM-DD hh:mm').toString()} // "2017-05-24T10:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Stack>
                  <br />
                  <Stack direction={'row'} justifyContent="left" spacing={{ xs: 12, sm: 10, md: 2 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="Parish">Parish</InputLabel>
                        <Select
                          id="demo-simple-select"
                          name="parish"
                          labelId="Parish"
                          label="Parish"
                          value={parish}
                          onChange={(e) => handleChange(e)}
                          fullWidth
                          required
                        >
                          <MenuItem value={'Select A Parish'}>Select A Parish</MenuItem>
                          <MenuItem value={'Kingston'}>Kingston</MenuItem>
                          <MenuItem value={'St. Catherine'}>St. Catherine (Spanish Town)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Grid item xs={12} md={6}>
                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                        disabled={loadingBtn}
                      >
                        SEARCH
                      </LoadingButton>
                    </Grid>
                  </Stack>
                </form>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <ViewAuditedPackagesAdmin />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
