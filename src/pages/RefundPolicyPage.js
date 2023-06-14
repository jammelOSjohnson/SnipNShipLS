import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const StyledGridItem = styled(Grid)(() => ({
  padding: '1.5% 0 1.5% 0',
}));
export default function RefundPolicyPage() {
  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={10} textAlign={'center'}>
          <Typography variant="h2">Refund Policy</Typography>
        </Grid>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            Last updated:&nbsp;
            <b>3-6-2023</b>
            <br />
            At Snip And Ship Logistics Services, we strive to provide excellent customer service and ensure your
            satisfaction with our services. This refund policy outlines the guidelines and procedures for requesting
            refunds for services provided by Snip And Ship Logistics Services. By using our services, you agree to the
            terms and conditions of this refund policy.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">1. Eligibility for Refunds</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.1.</b> Refunds may be considered under the following circumstances:
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.1.1.</b> Service Failure: In the event of service failure, where we are unable to deliver your package
            within the agreed-upon timeframe due to our fault or negligence, you may be eligible for a refund. Service
            failure does not include delays caused by factors beyond our control, such as weather conditions, customs
            inspections, or transportation disruptions.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>1.1.2.</b> Package Damage or Loss: If your package is damaged or lost during the shipping process due to
            our fault or negligence, you may be eligible for a refund. Please note that proper packaging and adherence
            to our packaging guidelines are essential for ensuring the safety of your items during transit.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">2. Refund Request Process</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.</b> To request a refund, please follow these steps:
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.1.</b> Contact our customer service team within 5 days of the service failure, package damage, or
            loss.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.2.</b> Provide all relevant information, including your order details, tracking number, and a
            detailed description of the issue.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.3.</b> Our customer service team will review your request and may require additional documentation or
            evidence to process your refund.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>2.1.4.</b> If your refund request is approved, we will initiate the refund process as per our standard
            procedures.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">3. Refund Methods</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.1.</b> Refunds will be issued using the original payment method used for the transaction, unless
            otherwise agreed upon between Snip And Ship Logistics Services and the customer.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>3.2.</b> Depending on your payment provider or financial institution, it may take 5 - 10 days for the
            refund to be credited to your account.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">4. Non-Refundable Charges</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.1.</b> The following charges are non-refundable:
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.1.1.</b> Shipping charges: Shipping charges paid for the transportation of your packages are
            non-refundable, except in cases of service failure, package damage, or loss caused by our fault or
            negligence.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>4.1.2.</b> Additional services: Charges for additional services, such as insurance coverage or special
            handling, are non-refundable.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">5. Policy Modifications</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>5.1.</b> Snip And Ship Logistics Services reserves the right to modify or update this refund policy at
            any time without prior notice. The updated policy will be posted on our website, and the revised "Last
            updated" date will reflect the most recent changes.
          </Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="h4">6. Contact Us</Typography>
        </StyledGridItem>
        <StyledGridItem item xs={10} textAlign={'left'}>
          <Typography variant="body1">
            <b>6.1.</b> If you have any questions or need further assistance regarding our refund policy, please contact
            our customer service team by clicking <NavLink to="/home/#contactus">here</NavLink>. We are here to help you
            and address any concerns you may have.
          </Typography>
        </StyledGridItem>
      </Grid>
    </>
  );
}
