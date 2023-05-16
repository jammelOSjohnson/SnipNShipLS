import { Typography } from '@mui/material';
import {
  BannerDescription,
  BannerTitle,
  BannerContainer,
  BannerContent,
  BannerContentContainer,
  BannerImage,
  BannerButton,
} from '../../styles/banner';

export default function Banner() {
  return (
    <BannerContainer>
      <BannerImage src="/assets/images/covers/deliverytruck.png" />
      {/* <BannerContentContainer> */}
      <BannerContent>
        <Typography variant={'h2'} color={'primary'}>
          Delivering Convenience, One Package at a Time!
        </Typography>

        <BannerDescription variant="subtitle">
          Welcome to Snip & Ship, your reliable partner for hassle-free package delivery. With fast, secure, and
          reliable services, we simplify shipping. Experience convenience at your fingertips with easy scheduling,
          tracking, and management. Trust our dedicated team for efficient and transparent deliveries. Start shipping
          today and enjoy peace of mind as we handle your packages with precision and care.
        </BannerDescription>
        <BannerButton>START TODAY!</BannerButton>
      </BannerContent>
      {/* </BannerContentContainer> */}
      {/* </BannerImage> */}
    </BannerContainer>
  );
}
