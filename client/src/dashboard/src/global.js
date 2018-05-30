/**
 * Created by shenlin on 7/3/17.
 */
import fr from './translate/fr';
import en_US from './translate/en_US';

export const serverName = '/';
export const lang = getLanguage();

export function emptyCheck(input) {
    // check null undefined
    try {
        if (input) {
            //check white space
            if (input.replace(/\s/g, '')) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    catch (err) {
        return false
    }
}

export function hasDocument(input) {
    if (emptyCheck(input)) {
        return input !== "http://www.hoolders.com";
    } else {
        return false
    }
}

export function alphaCheck(input) {
    let letterNumber = /^[a-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ'\-\s]+$/i;
    return Boolean(input.match(letterNumber))
}


export function nameCheck(input, maxLen) {
    if (emptyCheck(input)) {
        if (alphaCheck(input)) {
            if (input.length > maxLen) {
                // too long error
                return 3
            }
            // success
            return 0
        } else {
            // not alpha error
            return 2
        }
    } else {
        // empty error
        return 1
    }
}


export function emailCheck(email) {
    if (emptyCheck(email)) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            // success
            return 0
        } else {
            // email format error
            return 2
        }
    } else {
        // empty error
        return 1
    }
}


export function zipCodeCheck(zipCode) {
    if (emptyCheck(zipCode)) {
        return /(^\d{5}$)|(^\d{6}$)|(^\d{4}$)/.test(zipCode);
    } else {
        // can be empty
        return true
    }
}


export function birthdayCheck(birthday) {
    if (emptyCheck(birthday)) {
        let bits = birthday.split('/');
        let d = new Date(bits[2], bits[1] - 1, bits[0]);
        return d && (d.getMonth() + 1) === parseInt(bits[1]);
    } else {
        // empty error
        return false
    }
}


export function lengthCheck(input, maxLen) {
    try {
        if (input.length < maxLen) {
            return true
        } else {
            return false
        }
    }
    catch (err) {
        return false
    }
}

export function addSpace(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1 $2');
    }
    return x1 + x2 + " ";
}


export function checkUrl(input) {
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    return Boolean(input.match(regex));
}

export function checkFaceBook(input) {
    if (!emptyCheck(input)) {
        return true
    }

    if (checkUrl(input)) {
        if (input.search("facebook") !== -1) {
            return true
        }
    }
    return false
}

export function checkTwitter(input) {
    if (!emptyCheck(input)) {
        return true
    }

    if (checkUrl(input)) {
        if (input.search("twitter") !== -1) {
            return true
        }
    }
    return false
}

export function checkLinkedin(input) {
    if (!emptyCheck(input)) {
        return true
    }

    if (checkUrl(input)) {
        if (input.search("linkedin") !== -1) {
            return true
        }
    }
    return false
}


export function getLanguage() {
    let language = fr;
    switch (navigator.language.split('-')[0]) {
        case 'en':
            language = en_US;
            break;
        case 'fr':
            language = fr;
            break;
        default:
            language = fr;
    }
    // return language
    // for test only
    return fr;
}


