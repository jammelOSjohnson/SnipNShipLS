import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const StyledGridItem = styled(Grid)(() => ({
  padding: '1.5% 0 1.5% 0',
}));
export default function PrivacyPolicyPage() {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={10} textAlign={'center'}>
          <Typography variant="h2">Privacy Policy</Typography>
        </Grid>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            Last updated:&nbsp;
            <b>6-5-2023</b>
            <br />
            At Snip And Ship Logistics Services, we are committed to protecting your privacy and ensuring the security
            of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your
            information when you use our website or engage our services. By accessing our website or using our services,
            you consent to the collection and use of your information as described in this Privacy Policy.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">1. Information We Collect</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.1.</b> Personal Information: We may collect personal information, such as your name, address, email
            address, phone number, and payment details, when you voluntarily provide it to us during the registration or
            order placement process.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.2.</b> Log Data: When you access our website, we may automatically collect certain information,
            including your IP address, browser type, operating system, and pages visited, to analyze trends, administer
            the website, and track user activities.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">2. Use of Information</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.</b> We may use the information we collect to:
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.1.</b> Provide and deliver the services you request, including package delivery and logistics
            services.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.2.</b> Process payments and complete transactions.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.3.</b> Communicate with you about your shipments, updates, promotions, and other relevant
            information.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.4.</b> Improve and personalize our website, services, and customer experience.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.5.</b> Comply with legal obligations and enforce our terms and conditions.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">3. Information Sharing and Disclosure</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.1.</b> We may share your personal information with trusted third-party service providers who assist us
            in delivering our services, such as shipping carriers, customs brokers, and payment processors. These third
            parties are obligated to maintain the confidentiality and security of your information.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.2.</b> We may also disclose your personal information if required by law or to protect our rights,
            property, or safety, or the rights, property, or safety of others.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">4. Data Security</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.1.</b> We implement appropriate technical and organizational measures to protect your personal
            information from unauthorized access, use, disclosure, alteration, or destruction.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.2.</b> While we strive to protect your information, no method of transmission over the internet or
            electronic storage is completely secure. Therefore, we cannot guarantee absolute security of your
            information.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">5. Third-Party Websites</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>5.1.</b> Our website may contain links to third-party websites. We have no control over the content or
            privacy practices of these websites and are not responsible for their actions. We encourage you to review
            the privacy policies of these websites before providing any personal information.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">6. Children's Privacy</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>6.1.</b> Our website and services are not intended for individuals under the age of 13. We do not
            knowingly collect personal information from children. If we become aware that we have inadvertently
            collected personal information from a child under the age of 13, we will take steps to delete it as soon as
            possible.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">7. Changes to this Privacy Policy</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>7.1.</b> We may update this Privacy Policy from time to time. The updated version will be posted on our
            website with the revised "Last updated" date. We encourage you to review this Privacy Policy periodically to
            stay informed about how we collect, use, and protect your information.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">8. Contact Us</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>8.1.</b> If you have any questions or concerns regarding this Privacy Policy or the privacy practices of
            Snip And Ship Logistics Services, please contact us at <NavLink to="/home">contact us</NavLink>.
          </Typography>
        </StyledGridItem>
      </Grid>
    </>
  );
}
