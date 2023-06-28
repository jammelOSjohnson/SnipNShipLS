import emailjs from 'emailjs-com';
// import emailJsApi from "./apis/emailJsApi.js";

const sendEmail = async function sendEmail(SERVICE_ID, TEMPLATE_ID, RequestParams, USER_ID) {
  const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, RequestParams, USER_ID).then(
    (result) => {
      // console.log(result.text);
      return true;
    },
    (error) => {
      // console.log(error.text);
      return false;
    }
  );

  return res;
};

export const sendEmailForm = async function (SERVICE_ID, TEMPLATE_ID, RequestParams, USER_ID) {
  const res = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, RequestParams, USER_ID).then(
    (result) => {
      // console.log(result.text);
      return true;
    },
    (error) => {
      // console.log(error.text);
      return false;
    }
  );

  return res;
};

// var sendEmail = async function sendEmail(SERVICE_ID,TEMPLATE_ID, RequestParams, USER_ID) => {

//     var reqDetails = {
//         service_id: SERVICE_ID,
//         template_id: TEMPLATE_ID,
//         template_params: {
//             user_name: RequestParams.user_name,
//             user_email: RequestParams.user_email,
//             message: RequestParams.message
//         },
//         user_id: USER_ID
//     }

//     var res = emailJsApi
//     .post("/email/send", reqDetails)
//     .then(function(res){
//       //console.log("Success: ");
//       //console.log(res);
//       return true;
//     })
//     .catch(function(err){
//       //console.log("Failure :" + err);
//       return false;
//     });

//     return res;
// }

export default sendEmail;
