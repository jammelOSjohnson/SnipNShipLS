import { Helmet } from 'react-helmet-async';
import Banner from '../components/banner';
import ContactUs from '../components/contactus';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | Snip & Ship </title>
      </Helmet>
      <Banner />
      <ContactUs />
    </>
  );
}
