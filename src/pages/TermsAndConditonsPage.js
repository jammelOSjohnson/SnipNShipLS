import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGridItem = styled(Grid)(() => ({
  padding: '1.5% 0 1.5% 0',
}));
export default function TermsAndConditonsPage() {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={10} textAlign={'center'}>
          <Typography variant="h2">Terms and Conditions</Typography>
        </Grid>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            Welcome to Snip And Ship Logistics Services! Please carefully review the following terms and conditions that
            govern your use of our website and services. By accessing or using our website or engaging our services, you
            acknowledge and agree to comply with these terms. If you do not agree with any part of these terms, please
            refrain from using our website or services.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">1. Service Agreement</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.1.</b> Snip And Ship Logistics Services provides package delivery and logistics services for customers
            shipping packages from the USA to Jamaica.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.2.</b> By engaging our services, you confirm that you are the rightful owner of the packages being
            shipped or have obtained the necessary authorization from the owner to act on their behalf.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.3.</b> All shipments are subject to our shipping rates, which are based on package dimensions, weight,
            destination, and any additional services requested by the customer.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">2. Shipment Acceptance and Delivery</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.</b> We reserve the right to refuse the acceptance of any package that violates our prohibited items
            list, which includes but is not limited to hazardous materials, illegal substances, and items restricted for
            transportation.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.2.</b> Delivery times provided are estimates and not guaranteed. While we strive to deliver packages
            within the specified timeframe, delays may occur due to circumstances beyond our control, including but not
            limited to customs inspections, weather conditions, and transportation disruptions.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.3.</b> Once a package is delivered to the designated recipient or their authorized representative, our
            responsibility for the package ceases.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">3. Liability and Insurance</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.1.</b> Snip And Ship Logistics Services takes reasonable care in handling and transporting packages;
            however, we are not liable for any loss, damage, or delay that may occur during the shipping process, except
            as otherwise required by applicable law.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.2.</b> Customers are advised to purchase adequate insurance coverage for their packages to safeguard
            against potential loss or damage. Insurance options may be available and can be discussed with our customer
            service representatives.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">4. Privacy and Data Protection</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.1.</b> We respect your privacy and handle personal information in accordance with our Privacy Policy.
            By using our website and services, you consent to the collection, use, and disclosure of personal
            information as described in our Privacy Policy.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">5. Modifications and Termination</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>5.1.</b> Snip And Ship Logistics Services reserves the right to modify, suspend, or terminate any part of
            our website or services without prior notice.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>5.2.</b> We may update these terms and conditions from time to time. It is your responsibility to review
            this page periodically for any changes. Continued use of our website or services after any modifications
            signifies your acceptance of the revised terms.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">6. Governing Law and Dispute Resolution</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>6.1.</b> These terms and conditions are governed by the laws of [Jurisdiction]. Any disputes arising from
            the use of our website or services shall be subject to the exclusive jurisdiction of the courts in Jamaica.
          </Typography>
        </StyledGridItem>
      </Grid>
    </>
  );
}
