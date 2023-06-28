import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Moment time
import Moment from 'moment';
// components
// import Iconify from '../components/iconify';
import ViewPackagesAdmin from '../components/viewpackagesadmin';

// sections
// context
import { useGeneral } from '../context/general';
// ----------------------------------------------------------------------

export default function DashboardAdminPage() {
  // const theme = useTheme();
  const { value } = useGeneral();
  const { userRolef, loggedIn, findPackagesByDateRange } = value;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    Moment().clone().startOf('month').subtract(3, 'months').format('YYYY-MM-DD hh:mm').toString()
  );
  const [endDate, setEndDate] = useState(Moment().clone().endOf('month').format('YYYY-MM-DD hh:mm').toString());
  const [loadingBtn, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!loggedIn && (userRolef !== 'Admin' || userRolef !== 'Staff')) {
      // console.log("Dashboard LoggedIn Value" + loggedIn);
      navigate('/Home');
    }

    const start = Moment().clone().startOf('month').subtract(3, 'months').format('YYYY-MM-DD hh:mm').toString();
    const end = Moment().clone().endOf('month').format('YYYY-MM-DD hh:mm').toString();

    try {
      findPackagesByDateRange(start, end, value);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = function handleChange(event) {
    if (event.target.name === 'startDate') {
      setStartDate(event.target.value);
    } else if (event.target.name === 'endDate') {
      setEndDate(event.target.value);
    }

    console.log(startDate);
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
      const start = startDate;
      const end = endDate;
      console.log('about to call findPackagesByDateRange');
      findPackagesByDateRange(start, end, value);
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
            Hi, Welcome back
          </Typography>
        </Container>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

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
                    <Grid item xs={2} />
                    <Grid item xs={12} md={4}>
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
            <ViewPackagesAdmin />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
