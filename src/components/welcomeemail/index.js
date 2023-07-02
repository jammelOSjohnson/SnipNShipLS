import { useEffect, useState } from 'react';
import { useGeneral } from '../../context/general';

export default function WelcomeEmail() {
  const { value } = useGeneral();
  const { clientInfo, sendCostomerVerificationEmail, mailboxNum, airFreightAdd, seaFreightAdd } = value;
  const [verified, setVerified] = useState(
    clientInfo.verified === false ? 'Please check your email inbox, spam and junk to verify account' : null
  );

  const onload = async function onload() {
    // console.log("What the hell is in value");
    // console.log(value);
    if (value.clientInfo.verfied) {
      setVerified('');
    }

    // console.log("Email was sent? " + value.clientInfo.verifiedemailsent);
    // console.log("User name is: " + value.clientInfo.fullName);
    if (
      value.clientInfo.verifiedemailsent !== true &&
      clientInfo.fullName != null &&
      clientInfo.fullName !== undefined &&
      airFreightAdd !== null &&
      airFreightAdd !== undefined &&
      seaFreightAdd !== null &&
      seaFreightAdd !== undefined
    ) {
      // console.log("About to send verification email.")
      if (mailboxNum !== null && mailboxNum !== undefined && mailboxNum !== '') {
        await sendCostomerVerificationEmail(clientInfo.email, value.clientInfo.fullName, value);
      }
    }
  };
  useEffect(() => {
    onload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailboxNum, airFreightAdd, seaFreightAdd, clientInfo]);
  return <></>;
}
