import { CardContent, Grid, Typography } from '@mui/material';
import Rocket from '@mui/icons-material/RocketLaunch';
import Flight from '@mui/icons-material/FlightTakeoff';
import Door from '@mui/icons-material/DoorBack';
import {
  CardsContainer,
  ServiceCard,
  ServiceCardMedia,
  ServiceCardTitle,
  ServicesContainer,
} from '../../styles/services';
import { Colors } from '../../theme/palette';

export default function Services() {
  return (
    <>
      <ServicesContainer id="services">
        <Grid container>
          <Grid
            item
            xs={12}
            textAlign="center"
            style={{ marginBottom: '5%', textDecoration: 'underline', color: Colors.white }}
          >
            <Typography variant="h2">Our Services</Typography>
          </Grid>
        </Grid>
        <CardsContainer container>
          <Grid item xs={10} md={3}>
            <ServiceCard>
              <ServiceCardMedia>
                <Rocket
                  sx={{
                    fontSize: '50px',
                  }}
                />
              </ServiceCardMedia>
              <CardContent>
                <ServiceCardTitle gutterBottom>Swift and Secure Delivery</ServiceCardTitle>
                <Typography>
                  Rely on our swift and secure delivery service for shipping packages from the USA to Jamaica. We
                  prioritize timely transportation and ensure your items arrive safely at their destination, offering
                  peace of mind throughout the process.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={10} md={3}>
            <ServiceCard>
              <ServiceCardMedia>
                <Flight
                  sx={{
                    fontSize: '50px',
                  }}
                />
              </ServiceCardMedia>
              <CardContent>
                <ServiceCardTitle gutterBottom>Global Shipping Solutions</ServiceCardTitle>
                <Typography>
                  Explore our comprehensive global shipping solutions, specifically designed for packages from the USA
                  to Jamaica. With streamlined processes and trusted partners, we guarantee efficient customs clearance
                  and timely delivery, simplifying your international shipments.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={10} md={3}>
            <ServiceCard>
              <ServiceCardMedia>
                <Door
                  sx={{
                    fontSize: '50px',
                  }}
                />
              </ServiceCardMedia>
              <CardContent>
                <ServiceCardTitle gutterBottom>Door-to-Door Delivery</ServiceCardTitle>
                <Typography>
                  Experience the ease of our seamless door-to-door service, connecting the USA to Jamaica. From pickup
                  at your location to delivery at your recipient's doorstep, our dedicated team ensures a smooth and
                  reliable shipping process, eliminating any logistical hassles.
                </Typography>
              </CardContent>
            </ServiceCard>
          </Grid>
        </CardsContainer>
      </ServicesContainer>
    </>
  );
}
