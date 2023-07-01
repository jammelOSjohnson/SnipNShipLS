import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack } from '@mui/material';
// components
// import Iconify from '../components/iconify';
import DashboardTable from '../components/dashboardtable';
// sections
import { AppOrderTimeline } from '../sections/@dashboard/app';
import CheckParish from '../components/checkparish';
import OutstandingBalance from '../components/outstandingbalance';
import WelcomeEmail from '../components/welcomeemail';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Snip & Ship </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <WelcomeEmail />
          <Grid item xs={12} md={6} lg={8} />

          <Grid item xs={12} md={6} lg={4}>
            <Stack direction={'row'} justifyContent="flex-end" spacing={{ xs: 12, sm: 10 }}>
              <Typography variant="h4">Balance:</Typography>
              <OutstandingBalance />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <DashboardTable />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Shipping Address"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <CheckParish />

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
