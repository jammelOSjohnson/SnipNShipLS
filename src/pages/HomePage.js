import { Helmet } from 'react-helmet-async';
import Banner from '../components/banner';
import ContactUs from '../components/contactus';
import Services from '../components/services';
import Rates from '../components/rates';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | Snip & Ship </title>
      </Helmet>
      <Banner />
      <Services />
      <ContactUs />
      <Rates />
    </>
  );
}
