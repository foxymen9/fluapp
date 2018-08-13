// symtoms
export const AllSymtoms = {
  Fever_over_100__c: "Fever over 100.4 F (38 C)",
  Aching_muscles__c: "Aching muscles, \nespecially in your back, arms and legs",
  Chills_and_sweats__c: "Chills and sweats",
  Headache__c: "Headache",
  Dry_persistent_cough__c: "Dry, persistent cough",
  Fatigue_and_weakness__c: "Fatigue and weakness",
  Nasal_congestion__c: "Nasal congestion",
  Sore_throat__c: "Sore throat",
};


// local storage
export const SHOW_TUTORIAL = 'ShowedTutorial';
export const AUTH2_INFO = 'Auth2Info'
export const USER_INFO = 'UserInfo'

// attachment types

export const INSURANCE_CARD_FRONT_IMAGE = 'CardFront';
export const INSURANCE_CARD_BACK_IMAGE = 'CardBack';
export const USER_AVATAR_IMAGE = 'Avatar';


// salesforce
export const CLIENT_ID = '3MVG9_zfgLUsHJ5qV.lbH2377gYgrNxNEbxb1KxWkFgYbcWTgc91Qz18sddv2Dy2V0UxV_oC9FRFsIiY841RS';
export const CLIENT_SECRET = '4186855178316477303';
export const USERNAME = 'intergation@flulab.com';
export const PASSWORD = 'Cloudadv2018!';
export const API_VERSION = 'v43.0'


// api urls
export const API_AUTH2_URL = 'https://login.salesforce.com/services/oauth2/token';
export const API_SIGNIN_URL = `/services/data/${API_VERSION}/query/?q=SELECT+id,name,phone,website,patient_email__c,photourl+from+account+where+Patient_Email__c=`;
export const API_SIGNUP_URL = `/services/data/${API_VERSION}/sobjects/Account/`;
export const API_GET_USER_DETAIL_URL = `/services/data/${API_VERSION}/sobjects/Account/`;
export const API_GET_RQUESTS_URL = `/services/data/${API_VERSION}/query/?q=SELECT+id,casenumber,status,accountid,Fever_over_100__c,Aching_muscles__c,Chills_and_sweats__c,Headache__c,Dry_persistent_cough__c,Fatigue_and_weakness__c,Nasal_congestion__c,Sore_throat__c+from+case+where+AccountId+=+`;
export const API_CREATE_NEW_CASE_URL = `/services/data/${API_VERSION}/sobjects/Case/`;
export const API_ATTACHMENT_URL = `/services/data/${API_VERSION}/sobjects/Attachment/`;
export const API_GET_ATTACHMENTS_URL = `/services/data/${API_VERSION}/query/?q=SELECT+id,parentid,name,contenttype,bodylength,body,description+from+attachment+where+ParentId+=+`;

