import { Typography } from '@mui/material';
import { BannerContainer, BannerContent, BannerContentContainer, BannerImage } from '../../styles/banner';

export default function Banner() {
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
