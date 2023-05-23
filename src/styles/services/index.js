import { styled } from '@mui/material/styles';
import { Box, Card, CardMedia, Grid, Typography } from '@mui/material';
import { Colors } from '../../theme/palette';

export const ServicesContainer = styled(Box)(({ theme }) => ({
  padding: '5% 0px 0% 0px',
  backgroundColor: Colors.primary,
  [theme.breakpoints.up('sm')]: {
    padding: '5% 0px 5% 0px',
  },
}));

export const CardsContainer = styled(Grid)(() => ({
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

export const ServiceCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: '5%',
  },
}));

export const ServiceCardTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  textAlign: 'center',
  color: Colors.primary,
}));

export const ServiceCardMedia = styled(CardMedia)(() => ({
  textAlign: 'center',
  color: Colors.primary,
  padding: '8px',
}));
