import { useContext, createContext, useReducer } from 'react';
import Moment from 'moment';
import {
  auth,
  googleAuthProvider,
  SignInWithPopup,
  SignInWithEmailAndPassword,
  CreateUserWithEmailAndPassword,
  SendPasswordResetEmail,
  SignOut,
  facebookAuthProvider,
  twitterAuthProvider,
  db,
  AddDoc,
  DeleteDoc,
  GetDocs,
  OnSnapshot,
  Where,
  Query,
  UpdateDoc,
  Collection,
  Doc,
  GetDoc,
  SetDoc,
  timeStamp,
} from '../../firebase';
import sendEmail, { sendEmailForm } from '../../email';

export const GeneralContext = createContext();

export function useGeneral() {
  return useContext(GeneralContext);
}

function generalReducer(state, action) {
  switch (action.type) {
    // case "login_user":
    //   // console.log("returning login reducer result.");
    //   return {
    //     ...state,
    //     loggedIn: action.payload.loggedIn
    //   };
    case 'fetch_userinfo':
      // console.log("dispatching fetch user info action");
      // console.log(action);
      return {
        ...state,
        clientInfo: action.payload.clientInfo,
        loggedIn: action.payload.loggedIn,
        userRolef: action.payload.userRolef,
        currentUser: action.payload.currentUser,
      };
    case 'auth_change':
      // console.log("Auth listener dispatch results.");
      // console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: action.payload.loading,
        loggedIn: action.payload.loggedIn,
      };
    case 'gauth_change':
      // console.log("Auth listener dispatch google auth results.");
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: action.payload.loading,
        loggedIn: action.payload.loggedIn,
      };
    case 'fauth_change':
      // console.log("Auth listener dispatch facebook auth results.");
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: action.payload.loading,
        loggedIn: action.payload.loggedIn,
      };
    case 'tauth_change':
      // console.log("Auth listener dispatch twitter auth results.");
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loading: action.payload.loading,
        loggedIn: action.payload.loggedIn,
      };
    case 'logout_user':
      // console.log("dispatching logout action");
      // console.log(action);

      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        currentUser: action.payload.currentUser,
        clientInfo: action.payload.clientInfo,
        mailboxNum: action.payload.mailboxNum,
        userRolef: '',
        packages: action.payload.packages,
        readyPack: action.payload.readyPack,
        warehouse: action.payload.warehouse,
        balance: action.payload.balance,
        rangeOfPackages: action.payload.rangeOfPackages,
      };
    case 'fetch_packages':
      return {
        ...state,
        packages: action.payload.packages,
        readyPack: action.payload.readyPack,
        warehouse: action.payload.warehouse,
        balance: action.payload.balance,
      };
    case 'fetch_address':
      return {
        ...state,
        airFreightAdd: action.payload.airFreightAdd,
        seaFreightAdd: action.payload.seaFreightAdd,
        mailboxNum: action.payload.mailboxNum,
      };
    case 'find_packages_by_daterange':
      // console.log("dispatching single package by tracking number result");
      // console.log(action);
      return {
        ...state,
        rangeOfPackages: action.payload.rangeOfPackages,
      };
    case 'FIND_AUDITED_PACKAGES_BY_DATERANGE':
      // console.log("dispatching single package by tracking number result");
      // console.log(action);
      return {
        ...state,
        rangeauditedOfPackages: action.payload.rangeauditedOfPackages,
      };
    case 'fetch_user_dashboard':
      // console.log("dispatching fetch_user_dashboard action");
      // console.log(action);
      return {
        ...state,
        singleUser: action.payload.singleUser,
      };
    case 'fetchRates':
      return {
        ...state,
        ratesArr: action.payload.ratesArr,
      };
    case 'fetchPopup':
      return {
        ...state,
        popupSetting: action.payload.popupSetting,
      };
    default:
      return state;
  }
}

function GeneralProvider({ children }) {
  // const [loop, setLoop] = useState('failed');
  const emailServiceId = process.env.REACT_APP_emailServiceId;
  const emailUserId = process.env.REACT_APP_emailUserId;
  const emailNewPackageTemplate = process.env.REACT_APP_emailNewPackageTemplate;
  const emailContactTemplate = process.env.REACT_APP_emailContactTemplate;
  const emailNewInvoiceUploadTemplate = process.env.REACT_APP_emailNewInvoiceUploadTemplate;
  const welcomeEmailTemplate = process.env.REACT_APP_emailWelcomeTemplate;
  let currentUser;
  const loading = true;
  const loggedIn = false;
  let airFreightAdd;
  let seaFreightAdd;
  let ratesArr;

  const mailboxNum = '';
  let packages;
  const clientInfo = {
    contactNumber: '',
    email: '',
    fullName: '',
    verified: false,
    verifiedemailsent: false,
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    stateOrparish: '',
    dateCreated: '',
    mailboxNum,
  };

  const userRolef = '';
  const clientRole = '';
  let rangeOfPackages;
  let rangeauditedOfPackages;
  const balance = 0;
  const warehouse = 0;
  const readyPack = undefined;

  let popupSetting;

  // sign up user
  const signup = function signup(currentstate, payload) {
    return CreateUserWithEmailAndPassword(auth, currentstate.email, currentstate.password)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        const payloadf = {
          ...payload,
          currentUser: user,
          loading: false,
          clientInfo: {
            ...clientInfo,
            fullName: currentstate.fullname,
            email: currentstate.email,
            contactNumber: currentstate.contact,
          },
        };
        return payloadf;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(error.code);
        if (errorCode === 'auth/email-already-exists' || errorCode === 'auth/email-already-in-use') {
          return 'The email address is already in use by another account.';
        }

        if (errorCode === 'auth/network-request-failed' || 'auth/internal-error') {
          return 'Unable to signup at this time';
        }

        return 'Unable to signup at this time';

        // var errorMessage = error.message;
        // console.log(error.message);
        // The email of the user's account used.
        // var email = error.email;
        // console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // console.log(error.credential);
        // ...
        // return error.message;
      });
  };

  const login = function login(email, password, payload) {
    // retuns a promise
    // console.log("about to log the user in.")
    return SignInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        const payloadf = { ...payload, currentUser: user, loading: false };
        return payloadf;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(error.code);
        if (
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/invalid-email'
        ) {
          return 'Email / Password Incorrect';
        }

        if (errorCode === 'auth/network-request-failed' || errorCode === 'auth/internal-error') {
          return 'Unable to login at this time';
        }

        return 'Unable to login at this time';

        // var errorMessage = error.message;
        // console.log(error.message);
        // The email of the user's account used.
        // var email = error.email;
        // console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // console.log(error.credential);
        // ...
        // return "success";
      });
  };

  const gLogin = async function gLogin(payload) {
    // retuns a promise
    // console.log("about to log the user in using google.")
    return SignInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        const payloadf = {
          ...payload,
          currentUser: user,
          loading: false,
          clientInfo: {
            ...clientInfo,
            fullName: user.displayName !== null && user.displayName !== undefined ? user.displayName : '',
            email: user.email !== null && user.email !== undefined ? user.email : '',
          },
        };
        return payloadf;
      })
      .catch(() => {
        return null;
        // Handle Errors here.
        // const errorCode = error.code;
        // console.log(error.code);
        // const errorMessage = error.message;
        // console.log(error.message);
        // The email of the user's account used.
        // const email = error.email;
        // console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // console.log(error.credential);
        // ...
      });
  };

  const fLogin = function fLogin(payload) {
    // retuns a promise
    // console.log("about to log the user in using facebook.")
    return SignInWithPopup(auth, facebookAuthProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return { ...payload, currentUser: user, loading: false };
      })
      .catch(() => {
        return null;
        // Handle Errors here.
        // var errorCode = error.code;
        // console.log(error.code);
        // var errorMessage = error.message;
        // console.log(error.message);
        // The email of the user's account used.
        // var email = error.email;
        // console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // console.log(error.credential);
        // ...
      });
  };

  const tLogin = function tLogin(payload) {
    // retuns a promise
    // console.log("about to log the user in using twitter.")
    return SignInWithPopup(auth, twitterAuthProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        return { ...payload, currentUser: user, loading: false };
      })
      .catch(() => {
        return null;
        // Handle Errors here.
        // var errorCode = error.code;
        // console.log(error.code);
        // var errorMessage = error.message;
        // console.log(error.message);
        // The email of the user's account used.
        // var email = error.email;
        // console.log(error.email);
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // console.log(error.credential);
        // ...
      });
  };

  const logout = function logout(payload) {
    let noval;
    // retuns a promise
    const clientInfo = {
      contactNumber: '',
      email: '',
      fullName: '',
      verified: false,
      verifiedemailsent: false,
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      stateOrparish: '',
      dateCreated: '',
      mailboxNum,
    };

    payload.loggedIn = false;
    payload.clientInfo = { ...clientInfo };
    payload.mailboxNum = '';
    payload.packages = noval;
    payload.readyPack = noval;
    payload.warehouse = 0;
    payload.balance = 0;
    payload.rangeOfPackages = noval;
    SignOut(auth)
      .then(() => {
        payload.currentUser = null;
        // console.log('dispatching logout');
        dispatch({
          type: 'logout_user',
          payload,
        });
      })
      .catch(() => {
        // An error happened.
        // console.log(error);
      });
    // return res;
  };

  const resetPassword = function resetPassword(email) {
    // retuns a promise
    return SendPasswordResetEmail(auth, email)
      .then((res) => {
        // Password reset email sent!
        // ..
        // console.log(res);
        return res;
      })
      .catch(() => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(errorMessage);
        // ..
      });
  };

  const userHasRole = async function userHasRole(uid, payload, newUserPosition) {
    let userRole = {};
    // console.log('User id is: ');
    // console.log(uid);
    // console.log("fetching user role");
    const docRef = Doc(db, 'UsersInRoles', uid);
    const docSnap = await GetDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data()); //console.log("user role exist");
      // console.log(doc.data());
      // console.log('what is inside payload');
      // console.log(payload);
      // Convert to City object
      userRole = docSnap.data();
      // console.log('user in role res:');
      // console.log(userRole);
      if (userRole !== null) {
        const rolesRef = Doc(db, 'Roles', userRole.roleId);
        const rolesSnap = await GetDoc(rolesRef);
        if (rolesSnap.exists()) {
          const res = rolesSnap.data();
          // console.log('Role Exists is?');
          // console.log(res);
          payload.userRolef = res.role;
        }
      }

      return payload;
    }
    // console.log("No such user role!")
    // console.log("creating new userinrole");
    let userInRole = null;
    if (newUserPosition === undefined) {
      userInRole = {
        roleId: process.env.REACT_APP_Customer_Role,
      };
    } else if (newUserPosition === 'Staff') {
      userInRole = {
        roleId: process.env.REACT_APP_Staff_Role,
      };
    } else if (newUserPosition === 'Admin') {
      userInRole = {
        roleId: process.env.REACT_APP_Admin_Role,
      };
    }
    try {
      await SetDoc(Doc(db, 'UsersInRoles', uid), userInRole);
      payload.userRolef = 'Customer';
    } catch {
      // console.log("What is in payload after creating role: ");
      // console.log(payload);
    }
    return payload;
  };

  const fetchUserInfo = async function fetchUserInfo(uid, payloadf) {
    let user = {};
    // console.log("User id is: ");
    // console.log(uid);
    // console.log("fetching user");
    // let enabled = undefined
    const docRef = Doc(db, 'Users', uid);
    const docSnap = await GetDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      user = docSnap.data(); // console.log("verify email sent fetch user check ? " + user.verifiedemailsent);

      if (user !== null) {
        // console.log(user.enabled)
        if (user.enabled === undefined || user.enabled === true) {
          payloadf.clientInfo.contactNumber = user.contactNumber;
          payloadf.clientInfo.email = user.email;
          payloadf.clientInfo.fullName = user.fullName;
          payloadf.loggedIn = true;
          payloadf.clientInfo.addressLine1 =
            user.addressLine1 !== null && user.addressLine1 !== undefined ? user.addressLine1 : '';
          payloadf.clientInfo.addressLine2 =
            user.addressLine2 !== null && user.addressLine2 !== undefined ? user.addressLine2 : '';
          payloadf.clientInfo.city = user.city !== null && user.city !== undefined ? user.city : '';
          payloadf.clientInfo.postalCode =
            user.postalCode !== null && user.postalCode !== undefined ? user.postalCode : '';
          payloadf.clientInfo.stateOrparish =
            user.stateOrparish !== null && user.stateOrparish !== undefined ? user.stateOrparish : '';
          payloadf.clientInfo.verifiedemailsent =
            user.verifiedemailsent !== null && user.verifiedemailsent !== undefined ? user.verifiedemailsent : true;
          payloadf.clientInfo.verified = user.verified !== null && user.verified !== undefined ? user.verified : true;
          payloadf.clientInfo.dateCreated =
            user.dateCreated !== null && user.dateCreated !== undefined ? user.dateCreated : '';
          payloadf.clientInfo.mailboxNum =
            user.mailboxNum !== null && user.mailboxNum !== undefined ? user.mailboxNum : '';

          return userHasRole(uid, payloadf).then((userRoleRes) => {
            // console.log("Final user ref is: ");
            // console.log(userRoleRes);
            dispatch({
              type: 'fetch_userinfo',
              payload: userRoleRes,
            });
            return true;
          });
        }

        // enabled = null;
        // console.log('enabled is: ', null);
        return false;
      }

      return payloadf;
    }

    // console.log("No such user!")
    // console.log("creating new user");
    // console.log(payloadf)
    user = {
      contactNumber: payloadf.clientInfo.contactNumber !== null ? payloadf.clientInfo.contactNumber : '',
      email: payloadf.clientInfo.email !== null ? payloadf.clientInfo.email : '',
      fullName: payloadf.clientInfo.fullName !== null ? payloadf.clientInfo.fullName.toLowerCase() : '',
      verified: false,
      verifiedemailsent: false,
      addressLine1: '',
      addressLine2: '',
      city: '',
      postalCode: '',
      stateOrparish: '',
      dateCreated: timeStamp.fromDate(new Date()),
    };
    // console.log(user);
    await SetDoc(Doc(db, 'Users', uid), user);

    payloadf.clientInfo.contactNumber = user.contactNumber;
    payloadf.clientInfo.email = user.email;
    payloadf.clientInfo.fullName = user.fullName;
    payloadf.clientInfo.verified = user.verified;
    payloadf.clientInfo.verifiedemailsent = user.verifiedemailsent;
    payloadf.loggedIn = true;
    payloadf.clientInfo.addressLine1 =
      user.addressLine1 !== null && user.addressLine1 !== undefined ? user.addressLine1 : '';
    payloadf.clientInfo.addressLine2 =
      user.addressLine2 !== null && user.addressLine2 !== undefined ? user.addressLine2 : '';
    payloadf.clientInfo.city = user.city !== null && user.city !== undefined ? user.city : '';
    payloadf.clientInfo.postalCode = user.postalCode !== null && user.postalCode !== undefined ? user.postalCode : '';
    payloadf.clientInfo.stateOrparish =
      user.stateOrparish !== null && user.stateOrparish !== undefined ? user.stateOrparish : '';
    payloadf.clientInfo.dateCreated =
      user.dateCreated !== null && user.dateCreated !== undefined ? user.dateCreated : '';

    await userHasRole(uid, payloadf).then((userRoleRes) => {
      // console.log("Final user ref is: ");
      // console.log(userRoleRes);
      dispatch({
        type: 'fetch_userinfo',
        payload: userRoleRes,
      });
    });
    return true;
  };

  const fetchUserInfoForSignUp = async function fetchUserInfoForSignUp(uid, payload, currentState) {
    try {
      let user = {};
      // console.log("User id is: ");
      // console.log(uid);
      // console.log("the currentState is: ");
      // console.log(currentState);
      // console.log("fetching user");
      const docRef = Doc(db, 'Users', uid);
      const docSnap = await GetDoc(docRef);

      if (docSnap.exists()) {
        // console.log("user exist");
        // console.log(docSnap.data());
        // console.log("what is inside payload");
        // console.log(payload);
        // Convert to City object
        user = docSnap.data();

        if (user !== null) {
          payload.clientInfo.contactNumber = user.contactNumber;
          payload.clientInfo.email = user.email;
          payload.clientInfo.fullName = user.fullName;
          payload.clientInfo.verified = user.verified;
          payload.clientInfo.verifiedemailsent = user.verifiedemailsent;
          payload.loggedIn = true;
          payload.clientInfo.addressLine1 =
            user.addressLine1 !== null && user.addressLine1 !== undefined ? user.addressLine1 : '';
          payload.clientInfo.addressLine2 =
            user.addressLine2 !== null && user.addressLine2 !== undefined ? user.addressLine2 : '';
          payload.clientInfo.city = user.city !== null && user.city !== undefined ? user.city : '';
          payload.clientInfo.postalCode =
            user.postalCode !== null && user.postalCode !== undefined ? user.postalCode : '';
          payload.clientInfo.stateOrparish =
            user.stateOrparish !== null && user.stateOrparish !== undefined ? user.stateOrparish : '';
          payload.clientInfo.dateCreated =
            user.dateCreated !== null && user.dateCreated !== undefined ? user.dateCreated : '';
          payload.clientInfo.mailboxNum =
            user.mailboxNum !== null && user.mailboxNum !== undefined ? user.mailboxNum : '';
        }
      } else {
        // console.log("No such user!")
        // console.log("creating new user");
        // console.log("contact number is: " + currentState.contact);
        const user2 = {
          contactNumber: payload.clientInfo.contactNumber !== null ? payload.clientInfo.contactNumber : '',
          email: payload.clientInfo.email !== null ? payload.clientInfo.email : '',
          fullName: payload.clientInfo.fullName !== null ? payload.clientInfo.fullName.toLowerCase() : '',
          verified: false,
          verifiedemailsent: false,
          addressLine1: '',
          addressLine2: '',
          city: '',
          postalCode: '',
          stateOrparish: currentState.parish,
          dateCreated: timeStamp.fromDate(new Date()),
        };

        // console.log(user2);

        const storeRes = await SetDoc(Doc(db, 'Users', uid), user2)
          .then(() => {
            return true;
            // console.log("User info  successfully written!");
          })
          .catch(() => {
            return false;
            // console.error("Error writing user info: ", error);
          });

        if (await storeRes) {
          payload.clientInfo.contactNumber = user2.contactNumber;
          payload.clientInfo.email = user2.email;
          payload.clientInfo.fullName = user2.fullName;
          payload.clientInfo.verifiedemailsent = user2.verifiedemailsent;
          payload.clientInfo.verified = user2.verified;
          payload.loggedIn = true;
          payload.clientInfo.addressLine1 =
            user2.addressLine1 !== null && user2.addressLine1 !== undefined ? user2.addressLine1 : '';
          payload.clientInfo.addressLine2 =
            user2.addressLine2 !== null && user2.addressLine2 !== undefined ? user2.addressLine2 : '';
          payload.clientInfo.city = user2.city !== null && user2.city !== undefined ? user2.city : '';
          payload.clientInfo.postalCode =
            user2.postalCode !== null && user2.postalCode !== undefined ? user2.postalCode : '';
          payload.clientInfo.stateOrparish =
            user2.stateOrparish !== null && user2.stateOrparish !== undefined ? user2.stateOrparish : '';
          payload.clientInfo.dateCreated =
            user2.dateCreated !== null && user2.dateCreated !== undefined ? user2.dateCreated : '';
        }
      }
      return await userHasRole(uid, await payload).then((userRoleRes) => {
        // console.log("Final user ref after fetch role is: ");
        console.log(userRoleRes);
        dispatch({
          type: 'fetch_userinfo',
          payload: userRoleRes,
        });
        return true;
      });
    } catch (err) {
      // console.log(err);
      return false;
    }
  };

  // update user info
  const updateUserInfo = async function updateUserInfo(uid, payloadf, currentState) {
    // console.log("User id is: ");
    // console.log(uid);
    // console.log(payloadf);
    // console.log(currentState);
    // console.log("updating  user");
    // console.log("mbox b4 update", payloadf.mailboxNum);
    let user = null;
    // console.log(payloadf);
    if (currentState !== null) {
      user = {
        contactNumber:
          currentState.contact !== null && currentState.contact !== undefined
            ? currentState.contact
            : payloadf.clientInfo.contactNumber,
        email:
          currentState.email !== null && currentState.email !== undefined
            ? currentState.email
            : payloadf.clientInfo.email,
        fullName:
          currentState.fullname !== null && currentState.fullname !== undefined
            ? currentState.fullname.toLowerCase()
            : payloadf.clientInfo.fullName,
        verified: payloadf.clientInfo.verified,
        verifiedemailsent: payloadf.clientInfo.verifiedemailsent,
        addressLine1:
          currentState.addressLine1 !== null && currentState.addressLine1 !== undefined
            ? currentState.addressLine1
            : payloadf.clientInfo.addressLine1,
        addressLine2:
          currentState.addressLine2 !== null && currentState.addressLine2 !== undefined
            ? currentState.addressLine2
            : payloadf.clientInfo.addressLine2,
        city: currentState.city !== null && payloadf.clientInfo.city !== undefined ? payloadf.clientInfo.city : '',
        postalCode:
          currentState.postalCode !== null && currentState.postalCode !== undefined
            ? currentState.postalCode
            : payloadf.clientInfo.postalCode,
        stateOrparish:
          currentState.parish !== null && currentState.parish !== undefined
            ? currentState.parish
            : payloadf.clientInfo.stateOrparish,
        dateCreated:
          currentState.dateCreated !== null && currentState.dateCreated !== undefined
            ? currentState.dateCreated
            : payloadf.clientInfo.dateCreated,
        mailboxNum: payloadf.mailboxNum !== null && payloadf.mailboxNum !== undefined ? payloadf.mailboxNum : '',
      };
    } else {
      // console.log("what is user info carrying in payloadf");
      // console.log(payloadf);
      user = {
        contactNumber:
          payloadf.clientInfo.contactNumber != null && payloadf.clientInfo.contactNumber !== undefined
            ? payloadf.clientInfo.contactNumber
            : '',
        email: payloadf.clientInfo.email,
        fullName: payloadf.clientInfo.fullName.toLowerCase(),
        verified: payloadf.clientInfo.verified,
        verifiedemailsent: payloadf.clientInfo.verifiedemailsent,
        addressLine1: payloadf.clientInfo.addressLine1,
        addressLine2: payloadf.clientInfo.addressLine2,
        city: payloadf.clientInfo.city,
        postalCode: payloadf.clientInfo.postalCode,
        stateOrparish: payloadf.clientInfo.stateOrparish,
        dateCreated: payloadf.clientInfo.dateCreated,
        mailboxNum: payloadf.mailboxNum !== null && payloadf.mailboxNum !== undefined ? payloadf.mailboxNum : '',
      };
    } // console.log("User data is: ");
    // console.log(user);
    try {
      const updateUserRef = Doc(db, 'Users', uid);
      await UpdateDoc(updateUserRef, user);
      payloadf.clientInfo.contactNumber = user.contactNumber;
      payloadf.clientInfo.email = user.email;
      payloadf.clientInfo.fullName = user.fullName;
      payloadf.clientInfo.verified = user.verified;
      payloadf.clientInfo.verifiedemailsent = user.verifiedemailsent;
      payloadf.loggedIn = true;
      payloadf.clientInfo.addressLine1 = user.addressLine1;
      payloadf.clientInfo.addressLine2 = user.addressLine2;
      payloadf.clientInfo.city = user.city;
      payloadf.clientInfo.postalCode = user.postalCode;
      payloadf.clientInfo.stateOrparish = user.stateOrparish;
      payloadf.clientInfo.dateCreated = user.dateCreated;
      payloadf.clientInfo.mailboxNum = user.mailboxNum !== null && user.mailboxNum !== undefined ? '' : user.mailboxNum;

      dispatch({
        type: 'fetch_userinfo',
        payload: payloadf,
      });
      return true;
    } catch {
      // console.error("Error updating user info: ", error);
      return false;
    }
  };

  // Count packages per for status
  const checkPackages = function checkPackages(packages, status) {
    let count = 0;

    if (packages !== null && packages !== undefined) {
      packages.forEach((pac) => {
        // console.log(pac);
        const res = pac;

        if (res.ItemStatus === status) {
          count += 1;
        }
      });
    }

    return count;
  };

  const checkBalance = function checkBalance(packages, status) {
    let balance = 0.0;

    if (packages !== null && packages !== undefined) {
      packages.forEach((pac) => {
        // console.log(pac);
        const res = pac;

        if (res.Total !== null && res.Total !== undefined) {
          if (res.ItemStatus === status) {
            const add = res.Total !== null && res.Total !== undefined ? parseFloat(res.Total) : 0;
            balance += add;
          }
        }
      });
    }

    // console.log(balance);
    return balance;
  };

  // Fetch packages
  const fetchPackages = async function fetchPackages(uid, payload) {
    try {
      // console.log('User id is: ');
      // console.log(uid);
      // console.log("Payload is: ");
      // console.log(payload);
      // console.log("getting ref for packages")
      // console.log("querying packages");
      const packArr = [];
      const packagesRef = Collection(db, 'Packages');
      // Create a query against the Collection.
      const q = Query(packagesRef, Where('UID', '==', uid));

      const fetchPackUnsubscribe = await OnSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          const res = doc.data();
          packArr.push(res.PackageDetails);
        });

        payload.packages = packArr;
        payload.readyPack = checkPackages(packArr, 'Ready For Pickup');
        // console.log("Checked Transit");
        payload.balance = checkBalance(packArr, 'Ready For Pickup');
        // console.log("Checked Balance");
        payload.warehouse = checkPackages(packArr, 'Arrived At Warehouse');
        // console.log("Checked Points");
      });

      setTimeout(() => {
        // console.log(fetchPackUnsubscribe);
        payload.FetchPackUnsubscribe = fetchPackUnsubscribe;
        dispatch({
          type: 'fetch_packages',
          payload,
        });
      }, 4000);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchMailBoxNumberByUserId = async function fetchMailBoxNumberByUserId(uid, payload) {
    const packArr = [];
    const q = Query(Collection(db, 'MailBoxes'), Where('Uid', '==', uid));

    const querySnapshot = await GetDocs(q);
    querySnapshot.forEach((doc) => {
      const res = doc.id;
      packArr.push(res);
    });

    if (packArr !== null && packArr !== undefined) {
      if (packArr.length > 0) {
        payload.mailboxNum = packArr[0];
      } else {
        payload.mailboxNum = 'None';
      }
    } else {
      payload.mailboxNum = 'None';
    }
    return payload.mailboxNum;
  };

  const mailBoxExist = async function mailBoxExist(number) {
    const docRef = Doc(db, 'MailBoxes', number);
    const docSnap = await GetDoc(docRef);

    if (docSnap.exists()) {
      return true;
    }
    return false;
  };

  const storeMailBoxNumber = async function storeMailBoxNumber(number, uid) {
    const mailboxDetails = {
      Status: 'O',
      Uid: uid,
    };

    const res = await mailBoxExist(number);

    if (!res) {
      try {
        await SetDoc(Doc(db, 'MailBoxes', number), mailboxDetails);
        return true;
      } catch (err) {
        return false;
      }
    }

    return false;
  };

  const generate = function generate(uid) {
    let number = 0;
    // console.log("inside generate method")
    try {
      number = Math.floor(Math.random() * 90000) + 10000;
      // console.log(number);
      try {
        const storedNumber = storeMailBoxNumber(number.toString(), uid);
        // console.log("result from store method: " + res);
        if (!storedNumber) {
          return 'failed';
        } // console.log("returning number")

        return number.toString();
      } catch (error) {
        // console.log(error);
        return 'failed';
      }
    } catch (err) {
      // console.log("UNABLE TO GENERATE NUM", err)
      return 'failed';
    }
  };

  const fetchAddress = async function fetchAddress(uid, payload) {
    await fetchMailBoxNumberByUserId(uid, payload).then(async (res1) => {
      // console.log(res1);
      if (res1 !== null && res1 !== undefined && res1 !== 'None') {
        payload.mailboxNum = res1;
        const shippingAddRef = Doc(db, 'ShippingAddress', 'DefaultAddress');
        const shipAddSnap = await GetDoc(shippingAddRef);
        if (shipAddSnap.exists()) {
          const addresses = shipAddSnap.data();
          // console.log(addresses);
          if (addresses !== null) {
            payload.airFreightAdd = addresses.AirFreight1;
            payload.seaFreightAdd = addresses.AirFreight2;
            dispatch({
              type: 'fetch_address',
              payload,
            });
          } else {
            // console.log('No such address!');
          }
        } else {
          // console.log('No such address!');
        }
      } else {
        // console.log('creating new mailbox address');
        let loop = 'run';
        let genMBox = '';
        do {
          // console.log('inside generate loop');
          // eslint-disable-next-line no-loop-func
          try {
            const genRes = generate(uid);
            // console.log('check if mbox failed: ', genRes);
            if (genRes !== 'failed' && loop !== 'stop') {
              genMBox = genRes;
              // console.log(genMBox);
              loop = 'stop';
            } else {
              loop = 'run';
            }
          } catch (error) {
            // console.log('unable to generate mailbox number at this time', error);
          }
        } while (loop === 'run');

        // console.log('what is genmbox? ', genMBox);
        if (genMBox !== '') {
          // console.log('New user mailbox number is: ' + genMBox);
          // console.log('fetching addresses');
          payload.mailboxNum = genMBox;
          const docRef = Doc(db, 'Users', uid);
          const docSnap = await GetDoc(docRef);
          if (docSnap.exists()) {
            const user = docSnap.data();
            // console.log(user);
            if (user !== null) {
              const user2 = {
                addressLine1: user.addressLine1 !== null && user.addressLine1 !== undefined ? user.addressLine1 : '',
                addressLine2: user.addressLine2 !== null && user.addressLine2 !== undefined ? user.addressLine2 : '',
                city: user.city !== null && user.city !== undefined ? user.city : '',
                contactNumber: user.contactNumber,
                dateCreated: user.dateCreated,
                email: user.email,
                fullName: user.fullName,
                postalCode: user.postalCode !== null && user.postalCode !== undefined ? user.postalCode : '',
                stateOrparish:
                  user.stateOrparish !== null && user.stateOrparish !== undefined ? user.stateOrparish : '',
                verified: user.verified !== null && user.verified !== undefined ? user.verified : true,
                verifiedemailsent:
                  user.verifiedemailsent !== null && user.verifiedemailsent !== undefined
                    ? user.verifiedemailsent
                    : true,
                mailboxNum: genMBox,
              };
              // console.log(user2);
              // update user mailboxnum
              const usersRef = Doc(db, 'Users', uid);
              await UpdateDoc(usersRef, user2);
              const shippingAddRef = Doc(db, 'ShippingAddress', 'DefaultAddress');
              const shipAddSnap = await GetDoc(shippingAddRef);
              if (shipAddSnap.exists()) {
                // console.log("Document data:", shipAddSnap.data());
                const addresses = shipAddSnap.data();
                // console.log(addresses);
                if (addresses !== null) {
                  payload.airFreightAdd = addresses.AirFreight1;
                  payload.seaFreightAdd = addresses.AirFreight2;
                  dispatch({
                    type: 'fetch_address',
                    payload,
                  });
                }
              } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
              }
            }
          }
        } else {
          // doc.data() will be undefined in this case
          // console.log('No such document!');
        }
      }
    });
  };

  // FindPackages Within date range
  const findPackagesByDateRange = async function findPackagesByDateRange(start, end, payloadf, screen, parish) {
    const newSDate = new Date(start);
    newSDate.setHours(0, 0, 0, 0);
    const newEDate = new Date(end);
    newEDate.setHours(23, 59, 59, 999);
    // console.log(newSDate);
    // console.log(newEDate);
    const tstartstamp = timeStamp.fromDate(new Date(newSDate));
    const tendstamp = timeStamp.fromDate(new Date(newEDate));

    try {
      const q =
        screen === null
          ? Query(
              Collection(db, 'Packages'),
              Where('PackageDetails.OrderDate', '>=', tstartstamp),
              Where('PackageDetails.OrderDate', '<=', tendstamp)
            )
          : Query(
              Collection(db, 'Packages'),
              Where('PackageDetails.ModifiedDate', '>=', tstartstamp),
              Where('PackageDetails.ModifiedDate', '<=', tendstamp),
              Where('PackageInfo.ItemStatus', '==', 'Delivered'),
              Where('clientParish', '==', parish)
            );
      OnSnapshot(q, (querySnapshot) => {
        const fpackArr = [];
        querySnapshot.forEach((doc) => {
          // console.log("data found");
          // console.log(doc.data());
          const packDocData = doc.data();

          fpackArr.push({ ...packDocData });
          // console.log("Single package id is:" + doc.id);
        });
        // console.log("Array contents");
        // console.log(fpackArr);

        if (fpackArr !== null && fpackArr !== undefined) {
          if (fpackArr.length > 0) {
            // console.log("Package with Tracking number exist.")

            if (screen === null) {
              payloadf.rangeOfPackages = [];
              payloadf.rangeOfPackages = fpackArr;
            } else {
              payloadf.rangeauditedOfPackages = [];
              payloadf.rangeauditedOfPackages = fpackArr;
            }
            // console.log(fpackArr);
            // console.log("dispatching data");
            dispatch({
              type: screen === null ? 'find_packages_by_daterange' : 'FIND_AUDITED_PACKAGES_BY_DATERANGE',
              payload: payloadf,
            });
            // return payloadf;
          }
          // console.log("Package with Tracking number does not exist.")
          // return false;
        }
        // console.log("Package with Tracking number does not exist.")
        // return false;
      });
    } catch (err) {
      console.log(err);
      if (screen !== null) {
        payloadf.rangeauditedOfPackages = [];
        dispatch({
          type: 'FIND_AUDITED_PACKAGES_BY_DATERANGE',
          payload: payloadf,
        });
      }
    }
  };

  const fetchCustomerInfo = async function fetchCustomerInfo(uid, payload) {
    // console.log("fetching user");

    const docRef = Doc(db, 'Users', uid);
    const docSnap = await GetDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();

      if (user !== null) {
        payload.clientInfo.email = user.email;
        payload.clientInfo.fullName = user.fullName;
      }
      return payload;
    }
    return payload;
  };

  const getUserByMailboxNumber = async function getUserByMailboxNumber(MailBoxNumber) {
    // console.log("querying mailboxes");
    const MailBoxesRef = Doc(db, 'MailBoxes', MailBoxNumber);
    const docSnap = await GetDoc(MailBoxesRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const Uid = docSnap.data();
      return Uid.Uid;
    }
    // doc.data() will be undefined in this case
    // console.log("No such MailBoxNumber!");
    return 'failed';
  };

  const sendNewPackageEmail = async function sendNewPackageEmail(formVals) {
    // console.log("Wtf is in formVals");
    // console.log(formVals);
    const RequestParams = {
      user_name: formVals.user_name,
      user_email: formVals.user_email,
      message: `Your package with tracking number 
        ${formVals.trackingNum} from ${formVals.merchant} 
        was updated to the status: ${formVals.status}.`,
    }; // var data2 = {event: 'staff add package',
    //                       value:{"What is in this package b4 email sent for user: " : "What is in this package b4 email sent for user", RequestParams: RequestParams}
    // };
    // var entry2 = log.entry(METADATA, data2);
    // log.write(entry2);
    // console.log("What is in this package b4 emails sent");
    // console.log(RequestParams);

    const fianlRes = await sendEmail(emailServiceId, emailNewPackageTemplate, RequestParams, emailUserId)
      .then((res) => {
        if (res) {
          return true;
        }
        return false;
      })
      .catch(() => {
        // console.log("Send email error");
        // console.log(err);
        return false;
      });
    return fianlRes;
  };

  const editPackageStaff = async function editPackageStaff(packageZip, packageTnum, payloadf, packIndex) {
    // console.log('package zip is:');
    // console.log(packageZip);
    // console.log('package tracking num is');
    // console.log(packageTnum);

    const tstamp = timeStamp.fromDate(packageZip.order_date.toDate());
    const modifiedDate = timeStamp.fromDate(new Date());
    // console.log(typeof packageZip.order_date);

    // console.log(packageZip.order_date);

    // const tstamp = packageZip.order_date;

    const payload = {
      clientInfo: {
        email: '',
        fullName: '',
      },
    };
    const RequestParams = {
      user_email: '',
      user_name: '',
      merchant: packageZip.merchant !== null && packageZip.merchant !== undefined ? packageZip.merchant : '',
      status: packageZip.status !== null && packageZip.status !== undefined ? packageZip.status : '',
      trackingNum:
        packageZip.tracking_number !== null && packageZip.tracking_number !== undefined
          ? packageZip.tracking_number
          : '',
    };
    const resUid = await getUserByMailboxNumber(packageZip.mailbox_number).then((res) => {
      return res;
    });

    let Firstname = '';
    // console.log("checking for the users full name");
    if (
      payloadf.clientInfo.fullName == null ||
      payloadf.clientInfo.fullName === undefined ||
      payloadf.clientInfo.fullName === ''
    ) {
      Firstname = '';
    } else {
      // console.log("User has name");
      Firstname = payloadf.clientInfo.fullName;
    }

    const packageDetails = {
      PackageDetails:
        packageZip.status === 'Delivered'
          ? {
              Cost: packageZip.cost,
              Courier: packageZip.courier,
              ItemName: packageZip.item_name,
              ItemStatus: packageZip.status,
              MBoxNumber: packageZip.mailbox_number,
              MerchantName: packageZip.merchant,
              OrderDate: tstamp,
              Total: packageZip.fcost,
              TrackingNumber: packageZip.tracking_number,
              Weight: packageZip.weight,
              Staff: Firstname,
              ModifiedDate: modifiedDate,
            }
          : {
              Cost: packageZip.cost,
              Courier: packageZip.courier,
              ItemName: packageZip.item_name,
              ItemStatus: packageZip.status,
              MBoxNumber: packageZip.mailbox_number,
              MerchantName: packageZip.merchant,
              OrderDate: tstamp,
              Total: packageZip.fcost,
              TrackingNumber: packageZip.tracking_number,
              Weight: packageZip.weight,
              Staff: Firstname,
            },
      UID: '',
      clientName: packageZip.fullName,
      clientParish:
        packageZip.clientParish !== null && packageZip.clientParish !== undefined ? packageZip.clientParish : '',
    };

    let currentPInfo;
    const q = Query(Collection(db, 'Packages'), Where('PackageDetails.TrackingNumber', '==', packageTnum));

    const querySnapshot = await GetDocs(q);
    // console.log("Logging packages");
    let result1;

    querySnapshot.forEach((doc) => {
      result1 = doc.id;
      currentPInfo = doc.data();
      // console.log(`Single package id is: ${doc.id}`);
    });

    if (result1 === undefined) {
      result1 = false;
    }
    // console.log('User by mailbox returned');
    // console.log(resUid);

    // console.log("package id is");
    // console.log(checkIfPackageExists);

    if (resUid === 'failed') {
      return 'Mailbox or package doesnot exist';
    }

    if (resUid !== false && result1 !== false) {
      packageDetails.UID = resUid;
      // console.log("Abbout to update package");
      // console.log(packageDetails);
      // console.log(packageTnum);
      const packagesNewRef = Doc(db, 'Packages', result1);
      const storeRes = await UpdateDoc(packagesNewRef, packageDetails)
        .then(async () => {
          // console.log("New Package Details  successfully written!");
          // console.log(doc);
          const finalResult = await fetchCustomerInfo(packageDetails.UID, payload)
            .then(async (cusInfoResult) => {
              // console.log(cusInfoResult);
              if (
                cusInfoResult !== null &&
                cusInfoResult !== undefined &&
                cusInfoResult.fullName !== '' &&
                cusInfoResult.email !== ''
              ) {
                RequestParams.user_email = cusInfoResult.clientInfo.email;
                RequestParams.user_name = cusInfoResult.clientInfo.fullName; // console.log("Params going to sendNewPackageMethod");
                // console.log(RequestParams);
                // console.log(packageDetails.PackageDetails);
                if (
                  packageDetails.PackageDetails.ItemStatus === 'Ready For Pickup' ||
                  packageDetails.PackageDetails.ItemStatus === 'Arrived At Warehouse' ||
                  packageDetails.PackageDetails.ItemStatus === 'In Transit' ||
                  packageDetails.PackageDetails.ItemStatus === 'In Jamaica'
                ) {
                  const emailRes = await sendNewPackageEmail(RequestParams)
                    .then((emailSentRes) => {
                      if (emailSentRes) {
                        if (
                          payloadf !== undefined &&
                          payloadf !== null &&
                          packIndex !== undefined &&
                          packIndex !== null
                        ) {
                          // console.log(payloadf);
                          // console.log(payloadf.rangeOfPackages);
                          // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);
                          payloadf.rangeOfPackages[packIndex].PackageDetails.status = packageZip.status;
                          // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);

                          // dispatch({
                          //   type: 'find_packages_by_daterange',
                          //   payload: payloadf,
                          // });
                        }
                        return true;
                      }

                      if (
                        payloadf !== undefined &&
                        payloadf !== null &&
                        packIndex !== undefined &&
                        packIndex !== null
                      ) {
                        // console.log(payloadf);
                        // console.log(payloadf.rangeOfPackages);
                        // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);
                        payloadf.rangeOfPackages[packIndex].PackageDetails.status = packageZip.status;
                        // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);

                        // dispatch({
                        //   type: 'find_packages_by_daterange',
                        //   payload: payloadf,
                        // });
                      }
                      // console.log("Unable to send add package email at this time.")
                      return true;
                    })
                    .catch((err) => {
                      // console.log("Unable to send add package email at this time.")
                      console.log(err);
                      if (
                        payloadf !== undefined &&
                        payloadf !== null &&
                        packIndex !== undefined &&
                        packIndex !== null
                      ) {
                        payloadf.rangeOfPackages[packIndex].PackageDetails.status = packageZip.status;
                        // dispatch({
                        //   type: 'find_packages_by_daterange',
                        //   payload: payloadf,
                        // });
                        // console.log(payloadf.rangeOfPackages[packIndex]);
                      }
                      return true;
                    });
                  return emailRes;
                }

                if (payloadf !== undefined && payloadf !== null && packIndex !== undefined && packIndex !== null) {
                  // console.log(payloadf);
                  // console.log(payloadf.rangeOfPackages);
                  // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);
                  payloadf.rangeOfPackages[packIndex].PackageDetails.status = packageZip.status;
                  // console.log(payloadf.rangeOfPackages[packIndex].PackageDetails.status);

                  // dispatch({
                  //   type: 'find_packages_by_daterange',
                  //   payload: payloadf,
                  // });
                }

                return true;
              }
              return true;
            })
            .catch((err) => {
              // console.log("error fetching user info to send email")
              console.log(err);
              return false;
            });
          return finalResult;
        })
        .catch((error) => {
          console.error('Error writing New Package Details: ', error);
          return false;
        });
      return storeRes;
    }
    return false;
  };

  // Add Package

  const addPackageStaff = async function addPackageStaff(packageZip) {
    const tstamp = timeStamp.fromDate(new Date(packageZip.order_date));
    const packageDetails = {
      PackageDetails: {
        Cost: packageZip.cost,
        Courier: packageZip.courier,
        ItemName: packageZip.item_name,
        ItemStatus: packageZip.status,
        MBoxNumber: packageZip.mailbox_number,
        MerchantName: packageZip.merchant,
        OrderDate: tstamp,
        Total: packageZip.fcost,
        TrackingNumber: packageZip.tracking_number,
        Weight: packageZip.weight,
      },
      UID: '',
      clientName: '',
      clientParish: '',
    };
    const payload = {
      clientInfo: {
        email: '',
        fullName: '',
      },
    };
    const RequestParams = {
      user_email: '',
      user_name: '',
      merchant: packageZip.merchant !== null && packageZip.merchant !== undefined ? packageZip.merchant : '',
      status: packageZip.status !== null && packageZip.status !== undefined ? packageZip.status : '',
      trackingNum:
        packageZip.tracking_number !== null && packageZip.tracking_number !== undefined
          ? packageZip.tracking_number
          : '',
    };
    const packArr = [];

    const checkIfPackageExists = Query(
      Collection(db, 'PackagesNew'),
      Where('PackageInfo.TrackingNumber', '==', packageZip.tracking_number)
    );
    try {
      const querySnapshot = await GetDocs(checkIfPackageExists);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const res = doc.data();
        packArr.push(res.PackageInfo);
      });

      // console.log("Array contents");
      // console.log(packArr);

      if (packArr !== null && packArr !== undefined && packArr.length > 0) {
        // console.log("Package with Tracking number exist.")
        return `Tracking number exist. ${packageZip.tracking_number}`;
      }
      const res = await getUserByMailboxNumber(packageZip.mailbox_number).then(async (resUser) => {
        // var data1 = {event: 'getUserByMailboxNumber staff add package',
        //     value:{"User by mailbox returned for mailbox: " : packageZip.mailbox_number, result: res}
        // };
        // var entry1 = log.entry(METADATA, data1);
        // log.write(entry1);
        if (resUser === 'failed') {
          return 'Mailbox doesnot exist';
        }

        if (resUser !== false) {
          packageDetails.UID = resUser;
          const getUserRef = Doc(db, 'Users', packageDetails.UID);
          const docSnap = await GetDoc(getUserRef);

          if (docSnap.exists()) {
            const userpack = docSnap.data();
            packageDetails.clientName = userpack.fullName;
            packageDetails.clientParish =
              userpack.stateOrparish !== null && userpack.stateOrparish !== undefined ? userpack.stateOrparish : '';
            try {
              // console.log("New Package Details  successfully written!");
              // Store Package details
              await AddDoc(Collection(db, 'Packages'), packageDetails);
              const finalResult = await fetchCustomerInfo(packageDetails.UID, payload)
                .then(async (cusInfoResult) => {
                  if (
                    cusInfoResult !== null &&
                    cusInfoResult !== undefined &&
                    cusInfoResult.clientInfo.fullName !== '' &&
                    cusInfoResult.clientInfo.email !== ''
                  ) {
                    RequestParams.user_email = cusInfoResult.clientInfo.email;
                    RequestParams.user_name = cusInfoResult.clientInfo.fullName;
                    // console.log("Params going to sendNewPackageMethod");
                    // console.log(RequestParams);

                    const emailRes = await sendNewPackageEmail(RequestParams)
                      .then((emailSentRes) => {
                        if (emailSentRes) {
                          return true;
                        }

                        // console.log("Unable to send add package email at this time.")
                        return true;
                      })
                      .catch(() => {
                        // console.log("Unable to send add package email at this time.")
                        // console.log(err);
                        return true;
                      });
                    return emailRes;
                  }
                  return true;
                })
                .catch(() => {
                  // console.log("error fetching user info to send email")
                  // console.log(err);
                  return false;
                });
              return finalResult;
            } catch (err) {
              // console.error("Error writing New Package Details: ", err);
              return false;
            }
          }
        }
        console.log('made it to false return');
        return false;
      });
      return res;
    } catch {
      return false;
    }
  };

  // DELETE PACKAGE
  const deletePackage = async function deletePackage(trackingNumb) {
    try {
      let packDockId = '';
      // console.log("Track numb is: " + tracking_numb);
      const q = Query(Collection(db, 'Packages'), Where('PackageDetails.TrackingNumber', '==', trackingNumb));

      const querySnapshot = await GetDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        packDockId = doc.id;
        // console.log("Single package id is:" + doc.id);
      });
      if (packDockId.length > 3) {
        await DeleteDoc(Doc(db, 'Packages', packDockId));
        return true;
      }
      // console.log("no doc id");
      return false;
    } catch (error) {
      // console.error("Error removing document: ", error);
      return false;
    }
  };

  const sendUserContactEmail = async function sendUserContactEmail(formVals) {
    // var RequestParams = {
    //   user_name: userName !== null ? userName : "",
    //   user_email: userEmail !== null? userEmail : "",
    //   message: "Please verify email address by clicking the link below"
    // }
    const fianlRes = await sendEmailForm(emailServiceId, emailContactTemplate, formVals, emailUserId)
      .then((res) => {
        if (res) {
          return true;
        }
        return false;
      })
      .catch(() => {
        // console.log("Send email error");
        // console.log(err);
        return false;
      });
    return fianlRes;
  };

  const uploadInvoiceEmail = async function uploadInvoiceEmail(formVals, filetype, mailboxNum) {
    // console.log("Wtf is in formVals");
    // console.log(formVals);
    // console.log(mailboxNum);
    const RequestParams = {
      from_name: formVals.user_name,
      user_email: formVals.user_email,
      message: `A new Invoice was Uploaded by: ${formVals.user_name}
         Tracking Number: ${formVals.tracking_number}
         Mailbox#: ${mailboxNum}
         Merchant: ${formVals.merchant}
         Amout Declared: $${formVals.amount}`,
      content_pdf: undefined,
      content_svg: undefined,
      content_jpeg: undefined,
      content_png: undefined,
      todays_date: Moment().format('YYYY-MM-DD hh:mm').toString(),
    };

    if (filetype.toLowerCase() === 'application/pdf') {
      RequestParams.content_pdf = formVals.content;
    } else if (filetype.toLowerCase() === 'image/png') {
      RequestParams.content_png = formVals.content;
    } else if (filetype.toLowerCase() === 'image/svg+xml') {
      RequestParams.content_svg = formVals.content;
    } else if (filetype.toLowerCase() === 'image/jpeg') {
      RequestParams.content_jpeg = formVals.content;
    }
    // console.log("What is in this package b4 emails sent");
    // console.log(RequestParams);

    const fianlRes = await sendEmail(emailServiceId, emailNewInvoiceUploadTemplate, RequestParams, emailUserId)
      .then((res) => {
        if (res) {
          return true;
        }
        return res;
      })
      .catch(() => {
        // console.log("Send email error");
        // console.log(err);
        return false;
      });
    return fianlRes;
  };

  const uploadInvoice = async function uploadInvoice(packageZip, file, UserInfo, mailboxNum) {
    const fileType = packageZip.content.type;
    const RequestParams = {
      user_email: '',
      user_name: '',
      content: file,
      tracking_number: packageZip.tracking_number,
      merchant: packageZip.merchant,
      amount: packageZip.amount,
    };

    // console.log(RequestParams);

    if (UserInfo !== null && UserInfo !== undefined && UserInfo.fullName !== '' && UserInfo.email !== '') {
      RequestParams.user_email = UserInfo.email;
      RequestParams.user_name = UserInfo.fullName;
      // console.log("Params going to sendNewPackageMethod");
      // console.log(RequestParams)
      // console.log(mailboxNum);
      // return true;
      const emailRes = await uploadInvoiceEmail(RequestParams, fileType, mailboxNum)
        .then((emailSentRes) => {
          if (emailSentRes) {
            return true;
          }
          // console.log("Unable to send add package email at this time.")
          return true;
        })
        .catch(() => {
          return true;
        }); // console.log("Unable to send add package email at this time.") // console.log(err);
      return emailRes;
    }
    return false;
  };

  // Send Emails
  const sendCostomerVerificationEmail = async function sendCostomerVerificationEmail(userEmail, userName, value) {
    // email enabled
    if (value.clientInfo.verifiedemailsent !== true) {
      // console.log("Username b4 send email is:" + userName);
      if (
        value.airFreightAdd !== null &&
        value.airFreightAdd !== undefined &&
        value.seaFreightAdd !== null &&
        value.seaFreightAdd !== undefined
      ) {
        const RequestParams = {
          username: userName !== null && userName !== undefined ? userName : '',
          user_email: userEmail !== null && userEmail !== undefined ? userEmail : '',
          message: value.mailboxNum,
          air_line1:
            value.airFreightAdd.addressLine1 !== null &&
            value.airFreightAdd.addressLine1 !== undefined &&
            value.clientInfo.stateOrparish === 'Kingston'
              ? value.airFreightAdd.addressLine1
              : value.seaFreightAdd.addressLine1 !== null &&
                value.seaFreightAdd.addressLine1 !== undefined &&
                value.clientInfo.stateOrparish === 'St. Catherine'
              ? value.seaFreightAdd.addressLine1
              : '',
          air_line2:
            value.airFreightAdd.addressLine2 !== null &&
            value.airFreightAdd.addressLine2 !== undefined &&
            value.clientInfo.stateOrparish === 'Kingston'
              ? value.airFreightAdd.addressLine2
              : value.seaFreightAdd.addressLine2 !== null &&
                value.seaFreightAdd.addressLine2 !== undefined &&
                value.clientInfo.stateOrparish === 'St. Catherine'
              ? value.seaFreightAdd.addressLine2
              : '',
          air_city:
            value.airFreightAdd.city !== null &&
            value.airFreightAdd.city !== undefined &&
            value.clientInfo.stateOrparish === 'Kingston'
              ? value.airFreightAdd.city
              : value.seaFreightAdd.city !== null &&
                value.seaFreightAdd.city !== undefined &&
                value.clientInfo.stateOrparish === 'St. Catherine'
              ? value.seaFreightAdd.city
              : '',
          air_state:
            value.airFreightAdd.state !== null &&
            value.airFreightAdd.state !== undefined &&
            value.clientInfo.stateOrparish === 'Kingston'
              ? value.airFreightAdd.state
              : value.seaFreightAdd.state !== null &&
                value.seaFreightAdd.state !== undefined &&
                value.clientInfo.stateOrparish === 'St. Catherine'
              ? value.seaFreightAdd.state
              : '',
          air_zip:
            value.airFreightAdd.zipCode !== null &&
            value.airFreightAdd.zipCode !== undefined &&
            value.clientInfo.stateOrparish === 'Kingston'
              ? value.airFreightAdd.zipCode
              : value.seaFreightAdd.zipCode !== null &&
                value.seaFreightAdd.zipCode !== undefined &&
                value.clientInfo.stateOrparish === 'St. Catherine'
              ? value.seaFreightAdd.zipCode
              : '',
        };

        // console.log("Request params username is: " + RequestParams.username);

        await sendEmail(emailServiceId, welcomeEmailTemplate, RequestParams, emailUserId)
          .then(async (res) => {
            // console.log("Send Email Success " + res);
            if (res) {
              value.clientInfo.verifiedemailsent = true;
              console.log('aBout to call update user info ');

              await updateUserInfo(value.currentUser.uid, value, null);
              // dispatch({type: "sent_verify_email", payload: value});
            }
          })
          .catch(() => {
            // console.log("Send email error");
            // console.log(err);
          });
      }
    }

    return value;
    // disable after email is reenabled
    // value.clientInfo.verifiedemailsent = true;
    // value.clientInfo.verified = false;
    // console.log("aBout to call update user info ");
    // await updateUserInfo(value.currentUser.uid, value, null);
  };

  const findUserForDashboard = async function findUserForDashboard(payload, searchvalue) {
    console.log('i made it');
    const userArr = [];
    const finalArr = [];

    // console.log(searchvalue);
    if (searchvalue !== null && searchvalue !== undefined) {
      const docRef = Doc(db, 'Users', searchvalue);
      const docSnap = await GetDoc(docRef);
      // console.log('Logging users');
      if (docSnap.exists()) {
        // console.log(docSnap.id);
        // console.log(docSnap.data());
        const res = docSnap.data();
        userArr.push(res);
        // console.log(userArr);
        for (let f = 0; f < userArr.length; ) {
          const obj = {
            ...userArr[f],
          };
          finalArr.push(obj);
          f += 1;
        }
        // console.log("Fianl arrayyy is? ");
        // console.log(finalArr);
        payload.singleUser = finalArr;
        dispatch({
          type: 'fetch_user_dashboard',
          payload,
        });
      } else {
        // console.log("none was found.");
        payload.singleUser = [];
        dispatch({
          type: 'fetch_user_dashboard',
          payload,
        });
      }
    } else {
      // console.log("none was found2.");
      payload.singleUser = [];
      dispatch({
        type: 'fetch_user_dashboard',
        payload,
      });
    }
  };

  const fetchShippingRates = async function fetchShippingRates(payload) {
    const q = Query(Collection(db, 'Rates'));
    const q2 = Query(Collection(db, 'Additional_Rates'));
    const ratesPack = [];
    const ratesPack2 = [];
    const querySnapshot = await GetDocs(q);
    const querySnapshot2 = await GetDocs(q2);

    querySnapshot.forEach((doc) => {
      ratesPack.push(doc.data());
      // console.log("Single package id is:" + doc.id);
    });

    querySnapshot2.forEach((doc) => {
      ratesPack2.push(doc.data());
      // console.log("Single package id is:" + doc.id);
    });

    // console.log('1', ratesPack);
    // console.log('2', ratesPack2);
    if (ratesPack.length > 0) {
      payload.ratesArr = ratesPack;
      if (ratesPack2.length > 0) {
        payload.addRatesArr = ratesPack2;
      }
      dispatch({ type: 'fetchRates', payload });
    }
  };

  const fetchPopupSettings = async function fetchPopupSettings(payload) {
    const popupRef = Doc(db, 'PopUp', 'settings');
    const popupSnap = await GetDoc(popupRef);
    if (popupSnap.exists()) {
      const res = popupSnap.data();
      // console.log('Popupsettings Exists is?');
      // console.log(res);
      payload.popupSetting = res.display;
    }
    if (payload.popupSetting !== undefined) {
      dispatch({ type: 'fetchPopup', payload });
    }
  };

  const [value, dispatch] = useReducer(generalReducer, {
    currentUser,
    loggedIn,
    loading,
    airFreightAdd,
    seaFreightAdd,
    packages,
    clientInfo,
    clientRole,
    mailboxNum,
    rangeOfPackages,
    rangeauditedOfPackages,
    userRolef,
    balance,
    readyPack,
    warehouse,
    ratesArr,
    popupSetting,
    fetchUserInfo,
    fetchUserInfoForSignUp,
    signup,
    login,
    logout,
    resetPassword,
    gLogin,
    fLogin,
    tLogin,
    updateUserInfo,
    fetchPackages,
    fetchAddress,
    findPackagesByDateRange,
    editPackageStaff,
    deletePackage,
    addPackageStaff,
    sendUserContactEmail,
    uploadInvoice,
    sendCostomerVerificationEmail,
    findUserForDashboard,
    fetchShippingRates,
    fetchPopupSettings,
  });

  return <GeneralContext.Provider value={{ value }}>{children}</GeneralContext.Provider>;
}

export default GeneralProvider;
