/**
 * Created by shenlin on 7/6/17.
 */

export function checkFirstName(code) {
    return {
        type: 'SET_FIRST_NAME_VALIDATION_STATUS',
        payload: code,
    }
}

export function checkLastName(code) {
    return {
        type: 'SET_LAST_NAME_VALIDATION_STATUS',
        payload: code,
    }
}


export function checkEmail(code) {
    return {
        type: 'SET_EMAIL_VALIDATION_STATUS',
        payload: code,
    }
}

export function checkBirthday(flag) {
    return {
        type: 'SET_BIRTHDAY_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkTelephone(flag) {
    return {
        type: 'SET_TELEPHONE_VALIDATION_STATUS',
        payload: flag,
    }
}


export function checkProfession(flag) {
    return {
        type: 'SET_PROFESSION_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkCompanyName(flag) {
    return {
        type: 'SET_COMPANY_NAME_VALIDATION_STATUS',
        payload: flag,
    }
}


export function checkAddress(flag) {
    return {
        type: 'SET_ADDRESS_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkLocation(flag) {
    return {
        type: 'SET_LOCATION_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkCountry(flag) {
    return {
        type: 'SET_COUNTRY_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkZipCode(flag) {
    return {
        type: 'SET_ZIP_CODE_VALIDATION_STATUS',
        payload: flag,
    }
}

export function checkDescription(flag) {
    return {
        type: 'SET_DESCRIPTION_VALIDATION_STATUS',
        payload: flag,
    }
}


export function uploadingAvatar(flag) {
    return {
        type: 'SET_UPLOAD_AVATAR_STATUS',
        payload: flag
    }
}

