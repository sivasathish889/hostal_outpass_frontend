

export default env = {
    CLIENT_URL : 'https://hostal-outpass-backend.onrender.com/',
    // CLIENT_URL: "http://192.168.149.1:5000/",

    studentRegister: 'student/register',
    studentRegisterVerify: 'student/register/verify',
    studentLogin: 'student/login',
    studentLoginForgetPassword: 'student/forgetPassword',
    studentLoginVerify: 'student/forgetPassword/verify',
    studentChangePassword: 'student/changePassword',
    studentNewRequest: 'student/newRequest',
    studentPreRequest: 'student/preRequests',
    studentEditingPass: 'student/passUpdate',
    studentDeletePass: 'student/passDelete',
    studentPendingPasses: 'student/pendingRequests',
    studentAllPasses: 'student/AllRequests',
    studentData: 'student/',


    wardenLogin: "warden/login",
    wardenLoginVerify: "warden/login/verify",
    wardenPassAccept: "warden/passAccept",
    wardenPassReject: "warden/passReject",
    wardenPendingPass: "warden/pendingPasses",
    wardenAllAcceptPass: "warden/acceptPasses",
    wardenAllRejectPass: "warden/rejectPasses",
    wardenData: "warden/",
    wardenForgetPassword: "warden/forgetPassword",
    wardenForgetOtpVerify: "warden/forgetPassword/Verify",
    wardenChangePassword: "warden/changePassword",


    securityLogin: "security/login",
    securityLoginVerify: "security/login/verify",
    securityForgetPassword: "security/forgetPassword",
    securityForgetOtpVerify: "security/forgetPassword/Verify",
    securityChangePassword: "security/changePassword",
    securityData: "security",
    securityUpdateOutTime : "security/updateOutTime",
    securityUpdateInTime : "security/updateInTime",
    securityAcceptPass : "security/finishedPasses"
}