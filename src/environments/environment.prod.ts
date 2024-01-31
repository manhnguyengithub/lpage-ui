export const environment = {
    production: true,

    // OTP
    CUSTOMER_REGISTER: '/dob/contract/register',
    VERIFY_OTP: '/dob/verify/verify-otp',
    RESEND_OTP: '/dob/verify/resend-otp',
    CHECK_PHONE_NUMBER: '/dob/contract/check-phone',

    GEN_OTP: '/dob/verify/gen-otp',

    //paso
    CHECK_PHONE: '/dob/partner/check-phone-paso',
    NEXT_STEP: '/dob/next-step',
    GET_FULL_STEP: '/config/full-step/:id',
    GET_LIST_AREA: '/dob/areas',
    GET_LIST_DISTRICT: '/dob/districts',
    GET_LIST_WARD: '/dob/wards',

    POST_QR_INFO: '/dob/qr-info',
    INIT_PROFILE: '/dob/contract/unknow-init',
    DROP_LIST_MULTIPLE: '/config/value-category/:id',
    GET_CONTRACT_BY_ID: '/dob/contract/:id',
    GET_VEKYC_URL_BY_ID: '/dob/contract/:id/vekyc/get',
    UPLOAD_DOCUMENT: '/dob/partner/upload-document',
    SUBMIT_OCR_INFO_FIRST_TIME: '/dob/contract/submit-ocr',
    SUBMIT_OCR_INFO: '/dob/contract/submit-info-paso',
    GET_FINAL_OFFER: '/dob/contract/:id/final_offer',
    INFO_VERIFY_PAIR: '/dob/contract/submit-info-verify-pair',
    GET_FATCA_INFOR: '/config/category/condition',
    VERIFY_USER_INFO: '/dob/verify/user-info',
    APPROVE_POLICY: '/dob/policy/approve',
};
