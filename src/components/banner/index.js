import { useMediaQuery, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  BannerContainer,
  BannerContent,
  BannerContentContainer,
  BannerDescription,
  BannerImage,
  BannerTitle,
} from '../../styles/banner';

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <BannerContainer>
      <BannerImage src="/assets/images/covers/delivery_cover.jpg">
        <BannerContentContainer>
          <BannerContent>
            <Typography variant={'h6'} color={'tomato'} align="center" pt={8}>
              Huge Collection
            </Typography>
            {/* <BannerTitle variant="h2">New Bags</BannerTitle> */}
            {/* <BannerDescription variant="subtitle">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </BannerDescription> */}
          </BannerContent>
        </BannerContentContainer>
      </BannerImage>
    </BannerContainer>
  );
}
