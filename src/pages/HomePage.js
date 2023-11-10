import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '../components/banner';
import ContactUs from '../components/contactus';
import Services from '../components/services';
import Rates from '../components/rates';
import Popup from '../components/popup';
import { useGeneral } from '../context/general';
// firebase
import { auth } from '../firebase';

export default function HomePage() {
  const navigate = useNavigate();
  const urlLocation = useLocation().pathname;
  const prevUrl = useLocation();
  const { value } = useGeneral();
  const { fetchUserInfo } = value;

  const fetchUserDetails = async function fetchUserDetails(payload) {
    // console.log("Is current user null");
    // console.log(value);
    if (payload.currentUser !== null && payload.currentUser !== undefined) {
      if (payload.currentUser.uid !== null && payload.currentUser.uid !== undefined) {
        // console.log("Fetching user info");
        // console.log(state);
        return fetchUserInfo(payload.currentUser.uid, payload);
      }
    }
    return false;
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (urlLocation !== '/signup' && urlLocation !== '/login') {
        let signonStatus = false;
        if (user !== null) {
          signonStatus = user.uid !== null && user.uid !== undefined;

          const payload = {
            ...value,
            currentUser: user,
            loading: false,
            loggedIn: signonStatus,
          };
          if (value.clientInfo.email === '') {
            fetchUserDetails(payload);
          }
        }

        if (value.loggedIn && value.userRolef === 'Customer') {
          // console.log("About to customer navigate to dashboard.");
          navigate('/dashboard/app');
        } else if (value.loggedIn && value.userRolef === 'Staff') {
          // console.log("About to navigate to staff dashboard.");
          navigate('/admindashboard/app');
        } else if (value.loggedIn && value.userRolef === 'Admin') {
          // console.log("About to navigate to staff dashboard.");
          navigate('/admindashboard/app');
        }
      }

      // console.log(prevUrl.state);
      if (prevUrl.state !== null && prevUrl.state !== undefined) {
        let signonStatus = false;
        if (user !== null) {
          signonStatus = user.uid !== null && user.uid !== undefined;

          const payload = {
            ...value,
            currentUser: user,
            loading: false,
            loggedIn: signonStatus,
          };
          if (value.clientInfo.email === '') {
            fetchUserDetails(payload);
          }
        }

        navigate(prevUrl.state);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    });
  });

  return (
    <>
      <Helmet>
        <title> Home | Snip & Ship </title>
      </Helmet>
      <Banner />
      <Services />
      <ContactUs />
      <Rates />
      <Popup />
    </>
  );
}
