import { useContext, createContext, useReducer } from 'react';
import {
  auth,
  socialAuth,
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
  UpdateDoc,
  Collection,
  Doc,
  GetDoc,
  SetDoc,
  timeStamp,
} from '../../firebase';

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
        userRolef: '',
      };
    default:
      return state;
  }
}

function GeneralProvider({ children }) {
  let currentUser;
  const loading = true;
  const loggedIn = false;
  let airFreightAdd;
  let seaFreightAdd;

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

  // sign up user
  const signup = (currentstate, payload) => {
    // retuns a promise
    return CreateUserWithEmailAndPassword(auth, currentstate.email, currentstate.password)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
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
        const user = result.user;
        const payloadf = { ...payload, currentUser: user, loading: false };
        return payloadf;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(error.code);
        if (errorCode === 'auth/user-not-found' || 'auth/wrong-password' || 'auth/invalid-email') {
          return 'Email / Password Incorrect';
        }

        if (errorCode === 'auth/network-request-failed' || 'auth/internal-error') {
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
        const user = result.user;
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
        return null;
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
      .catch((error) => {
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
        return null;
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
      .catch((error) => {
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
        return null;
      });
  };

  const logout = function logout(payload) {
    // retuns a promise
    payload.loggedIn = false;
    SignOut(auth)
      .then(() => {
        payload.currentUser = null;
        console.log('dispatching logout');
        dispatch({
          type: 'logout_user',
          payload,
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
    // return res;
  };

  const resetPassword = function resetPassword(email) {
    // retuns a promise
    return SendPasswordResetEmail(auth, email)
      .then((res) => {
        // Password reset email sent!
        // ..
        console.log(res);
        return res;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  const userHasRole = async function userHasRole(uid, payload, newUserPosition) {
    let userRole = {};
    // console.log("User id is: ");
    // console.log(uid);
    // console.log("fetching user role");
    const docRef = Doc(db, 'UsersInRoles', uid);
    const docSnap = await GetDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data()); //console.log("user role exist");
      // console.log(doc.data());
      // console.log("what is inside payload");
      // console.log(payload);
      // Convert to City object
      userRole = docSnap.data();
      // console.log("user in role res:");
      // console.log(userRole);
      if (userRole !== null) {
        const rolesRef = Doc(db, 'Roles', userRole.roleId);
        const rolesSnap = await GetDoc(rolesRef);
        if (rolesSnap.exists()) {
          const res = rolesSnap.data();
          // console.log("Role Exists is?");
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
        console.log('enabled is: ', null);
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
          .then((doc) => {
            // console.log("User info  successfully written!");
            return true;
          })
          .catch((error) => {
            // console.error("Error writing user info: ", error);
            return false;
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
      console.log(err);
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
    // console.log("mbox b4 update", payloadf.mailbox_Num);
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
        mailbox_Num: payloadf.mailbox_Num !== null && payloadf.mailbox_Num !== undefined ? payloadf.mailbox_Num : '',
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
        mailbox_Num: payloadf.mailbox_Num !== null && payloadf.mailbox_Num !== undefined ? payloadf.mailbox_Num : '',
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
      payloadf.clientInfo.mailbox_Num =
        user.mailbox_Num !== null && user.mailbox_Num !== undefined ? '' : user.mailbox_Num;

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
    userRolef,
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
  });

  return <GeneralContext.Provider value={{ value }}>{children}</GeneralContext.Provider>;
}

export default GeneralProvider;
