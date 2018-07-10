export const TestRequestReceived = "Test Request Received";
export const DriverEnrouteToPatient = "Driver Enroute to Patient";
export const DriverEnrouteToLab = "Driver Enroute to Lab";
export const TestingInProgress = "Testing in progress";
export const TestsComplete = "Tests Complete";

// export const statusArray = [TestRequestReceived, DriverEnrouteToPatient, DriverEnrouteToLab, TestingInProgress, TestsComplete];

export const ActiveRequests = "Active Requests";
export const CompletedRequests = "Completed Requests";

export const symptom1 = "Fever over 100.4 F (38 C)";
export const symptom2 = "Aching muscles, \nespecially in your back, arms and legs";
export const symptom3 = "Chills and sweats";
export const symptom4 = "Headache";
export const symptom5 = "Dry, persistent cough";
export const symptom6 = "Fatigue and weakness";
export const symptom7 = "Nasal congestion";
export const symptom8 = "Sore throat";

export const symptomArray = [symptom1, symptom2, symptom3, symptom4, symptom5, symptom6, symptom7, symptom8];


//salesforce
export const CLIENT_ID = '3MVG9_zfgLUsHJ5qV.lbH2377gYgrNxNEbxb1KxWkFgYbcWTgc91Qz18sddv2Dy2V0UxV_oC9FRFsIiY841RS';
export const CLIENT_SECRET = '4186855178316477303';
export const API_VERSION = 'v43.0'

export const API_SIGNIN_URL = 'https://login.salesforce.com/services/oauth2/token';
export const API_PROFILE_URL = `/services/data/${API_VERSION}/chatter/users/me`;
export const API_GET_DOCTORS_URL = `/services/data/${API_VERSION}/query/?q=SELECT+id,name+from+account`;
export const API_GET_DOCTOR_DETAIL_URL = `/services/data/${API_VERSION}/sobjects/Account/`;
export const API_GET_RQUESTS_URL = `/services/data/${API_VERSION}/query/?q=SELECT+id,casenumber,status,accountid+from+case`;