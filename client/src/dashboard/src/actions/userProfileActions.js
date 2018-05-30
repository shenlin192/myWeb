/**
 * Created by shenlin on 11/06/2017.
 */

import axios from "axios";
import {getCookie} from "./getCookie";
import {serverName, nameCheck, lang} from "../global";
import iziToast from 'izitoast'


//phone check
import {parse, isValidNumber} from 'libphonenumber-js'

axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


// this is necessary for authenticated user when using DRF
// DFR will not deal with the csrf Token of un-authenticated user by default,
// thus a self costumed authentication is needed
axios.defaults.headers.put['X-CSRFToken'] = getCookie("csrftoken");
axios.defaults.headers.post['X-CSRFToken'] = getCookie("csrftoken");
// axios.defaults.xsrfHeaderName = "X-CSRFToken";


export function fetchUserProfile() {
    return function (dispatch) {
        dispatch({type: "provenance_revenu"});
        axios.get(`${serverName}api/investisseur/investor_info/`)
            .then((response) => {
                let result = response.data.results[0];
                let birthday = result.basicInfo.birthday;
                let date = new Date(birthday);

                birthday = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                result.basicInfo.birthday = birthday;

                //convert birthday
                result.basicInfo.birthdayDate = date.getDate();
                result.basicInfo.birthdayMonth = date.getMonth() + 1;
                result.basicInfo.birthdayYear = date.getFullYear();

                //convert default country
                if (!result.basicInfo.country) {
                    result.basicInfo.country = "FRA"
                }

                //convert default telephone
                if (result.basicInfo.telephone === "0") {
                    result.basicInfo.telephone = "+33"
                }

                let exp = ["type_investisseur", "net_annual_income", "provenance_revenu",
                    "patrimoine", "isf", "fond_invest", "secteurAct", "motivInv",
                    "defiscalisation", "montantInvCetteAnnee", "expInv", "dureeInv", "montantInvFinancier"
                ];


                for (let key in result) {
                    // key not from prototype
                    if (result.hasOwnProperty(key)) {
                        // key in exp
                        if (exp.indexOf(key) !== -1) {
                            // key value is null
                            if ((!result[key]) || (result[key] === "NULL")) {
                                result[key] = ""
                            }
                        }
                    }
                }

                console.log(result)


                //information validation
                dispatch({type: "SET_FIRST_NAME_VALIDATION_STATUS", payload: nameCheck(result.basicInfo.firstName)});
                dispatch({type: "SET_LAST_NAME_VALIDATION_STATUS", payload: nameCheck(result.basicInfo.lastName)});
                dispatch({
                    type: "SET_TELEPHONE_VALIDATION_STATUS",
                    payload: isValidNumber(parse(result.basicInfo.telephone))
                });

                //initialize store
                dispatch({type: "FETCH_USER_PROFILE_FULFILLED", payload: result});
                dispatch({type: "INITIAL_PROGRESS_BAR", payload: result});
                dispatch({type: "INITIAL_EXPERIENCE", payload: result});
            })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}


export function setModifyMode() {
    return {
        type: 'SET_MODIFY_MODE',
        payload: {},
    }
}


// change basic Info
export function setUserPhoto(photo, userProfileId) {
    return function (dispatch) {
        let formData = new FormData();
        formData.append("image", photo);
        formData.append("userProfileId", userProfileId);
        axios.post(`${serverName}dashboard/addUserProfilePhoto/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {

            dispatch({type: "SET_UPLOAD_AVATAR_STATUS", payload: false})
            dispatch({type: "SET_USER_PHOTO", payload: response.data})

        }).catch((err) => {

            console.error(err)

            dispatch({type: "SET_UPLOAD_AVATAR_STATUS", payload: false})

            let content = lang["action.setAvatar"];

            if (err.response.data === "type1") {
                iziToast.error({
                    title: 'Error',
                    message: content[0],
                    position: 'topCenter',
                });
            } else {
                iziToast.error({
                    title: 'Error',
                    message: content[1],
                    position: 'topCenter',
                });
            }
            // dispatch({type: "SET_USER_PHOTO_REJECTED", payload: err.response.data})
        })
    }
}


export function setUserEmail(email) {
    return {
        type: 'SET_USER_EMAIL',
        payload: email,
    }
}

export function setUserFirstName(firstName) {
    return {
        type: 'SET_USER_FIRST_NAME',
        payload: firstName,
    }
}

export function setUserLastName(lastName) {
    return {
        type: 'SET_USER_LAST_NAME',
        payload: lastName,
    }
}

export function setUserProfession(profession) {
    return {
        type: 'SET_USER_PROFESSION',
        payload: profession,
    }
}

export function setUserCompanyName(CompanyName) {
    return {
        type: 'SET_USER_COMPANY_NAME',
        payload: CompanyName,
    }
}


export function setUserBirthdayDate(date) {
    return {
        type: 'SET_USER_BIRTHDAY_DATE',
        payload: date,
    }
}


export function setUserBirthdayMonth(month) {
    return {
        type: 'SET_USER_BIRTHDAY_MONTH',
        payload: month,
    }
}


export function setUserBirthdayYear(year) {
    return {
        type: 'SET_USER_BIRTHDAY_YEAR',
        payload: year,
    }
}


export function setUserTelephone(telephone) {
    return {
        type: 'SET_USER_TELEPHONE',
        payload: telephone,
    }
}


export function setUserAddress(address) {
    return {
        type: 'SET_USER_ADDRESS',
        payload: address,
    }
}

export function setUserCity(city) {
    return {
        type: 'SET_USER_CITY',
        payload: city,
    }
}


export function setUserZip(zip) {
    return {
        type: 'SET_USER_ZIP',
        payload: zip,
    }
}


export function setCountry(country) {
    return {
        type: 'SET_USER_COUNTRY',
        payload: country,
    }
}


export function setUserDescription(des) {
    return {
        type: 'SET_USER_DES',
        payload: des,
    }
}

export function cancelChange() {
    return {
        type: 'CANCEL_CHANGE',
        payload: {},
    }
}


export function validBasicInfoChange(basicInfo, basciInfoBackUp) {


    return function (dispatch) {
        axios.all([
            axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
                "firstname": basicInfo.firstName,
                "lastname": basicInfo.lastName,
                "city": basicInfo.city,
                "address": basicInfo.address,
                "profession": basicInfo.profession,
                "company_name": basicInfo.company_name,
                "birthday": `${basicInfo.birthdayDate}/${basicInfo.birthdayMonth}/${basicInfo.birthdayYear}`,
                "telephonemobile": basicInfo.telephone,
                "zip_code": basicInfo.zip_code,
                "description": basicInfo.description,
                "country": basicInfo.country
            }),

            axios.post(`${serverName}dashboard/modify_user/`, {
                "firstname": basicInfo.firstName,
                "lastname": basicInfo.lastName,
                "email": basicInfo.email,
            }),

        ]).then(axios.spread(function (userProfileResponse, userResponse) {

            console.log(userProfileResponse);
            console.log(userResponse);

            if(userResponse.data==="alreadyInDatabase"){
                iziToast.error({
                    title: 'Error',
                    message: lang["action.setBasicInfo"][3],
                    position: 'topCenter',
                });
                dispatch({type: "SET_USER_EMAIL", payload: basciInfoBackUp.email})
            }else{

                if(basciInfoBackUp.email!==basicInfo.email){
                    iziToast.success({
                        title: 'OK',
                        message: lang["action.setBasicInfo"][2],
                    });
                }

                iziToast.success({
                    title: 'OK',
                    message: lang["action.setBasicInfo"][0],
                });
            }




            // update Lemonway info
            axios.post(`${serverName}dashboard/lemonway_management/`, {
                "type": "updateInv"
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.error(err)
            })


        })).catch(axios.spread(function (userProfileErr, userErr) {

            console.log("updateUserProfileErr",userProfileErr);
            console.log("updateUserErr", userErr);

            iziToast.error({
                title: 'error',
                message: lang["action.setBasicInfo"][1],
            });

        }));
    }
}


// social media
export function ajouterLinkedin() {
    return {
        type: 'SET_LINKEDIN_COMPTE',
        payload: {},
    }
}

export function ajouterFacebook() {
    return {
        type: 'SET_FACEBOOK_COMPTE',
        payload: {},
    }
}

export function ajouterTwitter() {
    return {
        type: 'SET_TWITTER_COMPTE',
        payload: {},
    }
}

export function addLinkedin(linkedinCompte) {
    return {
        type: 'CHANGE_LINKEDIN',
        payload: linkedinCompte,
    }
}

export function addFacebook(FacebookCompte) {
    return {
        type: 'CHANGE_FACEBOOK',
        payload: FacebookCompte,
    }
}

export function addTwitter(TwitterCompte) {
    return {
        type: 'CHANGE_TWITTER',
        payload: TwitterCompte,
    }
}

export function viderLk(basicInfo) {
    return function (dispatch) {

        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });

        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "linkedinpage": "",
            "linkedin": "",
        }).then((response) => {
            dispatch({type: "CLEAN_LINKEDIN_COMPTE", payload: ""})
        })
        .catch((err) => {
            dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
        })
    }
}

export function viderFb(basicInfo) {
    return function (dispatch) {


        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });

        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "facebookpage": "",
        }).then((response) => {
            dispatch({type: "CLEAN_FACEBOOK_COMPTE", payload: ""})
        })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}


export function viderTw(basicInfo) {
    return function (dispatch) {


        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });

        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "twitterpage": "",
        }).then((response) => {
            dispatch({type: "CLEAN_TWITTER_COMPTE", payload: ""})
        })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}


export function validerLk(basicInfo, linkedin) {
    return function (dispatch) {


        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "linkedinpage": linkedin,
        }).then((response) => {
            dispatch({type: "SET_LINKEDIN_COMPTE_SUCCESS", payload: linkedin})
        })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}

export function validerFb(basicInfo, facebook) {
    return function (dispatch) {
        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });

        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "facebookpage": facebook,
        }).then((response) => {
            dispatch({type: "SET_FACEBOOK_COMPTE_SUCCESS", payload: facebook})
        })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}

export function validerTw(basicInfo, twitter) {

    return function (dispatch) {
        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        axios.put(`${serverName}api/user_management/${basicInfo.userProfileId}/edit/`, {
            "firstname": basicInfo.firstName,
            "lastname": basicInfo.lastName,
            "city": basicInfo.city,
            "address": basicInfo.address,
            "twitterpage": twitter,
        }).then((response) => {
            dispatch({type: "SET_TWITTER_COMPTE_SUCCESS", payload: twitter})
        })
            .catch((err) => {
                dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
            })
    }
}


//experienceOne
export function changeType(answer) {

    return {
        type: 'SET_TYPE',
        payload: answer,
    }
}


export function changeRevenu(income) {

    return {
        type: 'SET_REVENU',
        payload: income,
    }
}

export function changeProvenance(ob, userId) {
    return {
        type: 'SET_PROVENANCE_REVENU',
        payload: ob,
    }
}

export function changePatrimoine(patrimoine) {

    return {
        type: 'SET_PATRIMOINE',
        payload: patrimoine,
    }
}

export function changeFontInvest(answer, userId) {
    return {
        type: "SET_FOND_INVEST",
        payload: answer,
    }
}

export function changeOriginesPatrimoine(array, userId) {
    let newArray = array.sort();
    let answer = newArray.toString();

    return {
        type: "SET_ORIGINES_PATRIMOINE",
        payload: answer,
    }
}


export function changeISF(answer, userId) {

    return {
        type: "SET_ISF",
        payload: answer,
    }
}

//experienceTwo
export function changeSecteur(ob, userId) {
    return {
        type: 'SET_SECTEUR',
        payload: ob,
    }
}

export function changeObject(ob, userId) {
    return {
        type: 'SET_OBJECT',
        payload: ob,
    }
}

export function changeOption(ob, userId) {
    return {
        type: 'SET_OPTION',
        payload: ob,
    }
}

// export function changeMontantInv(montant) {
//       return {
//         type: 'SET_MONTANT_INV',
//         payload: montant,
//     }
// }
export function changeInvCetteAnnee(montant) {

    return {
        type: 'SET_MONTANT_INV',
        payload: montant,
    }
}

//experienceThree
export function changeDuree(answer) {
    return {
        type: 'SET_DUREE',
        payload: answer,
    }
}

export function changeExp(ob, userId) {
    return {
        type: 'SET_EXP',
        payload: ob,
    }
}

// export function changeMontantF(montant) {
//       return {
//         type: 'SET_MONTANT_F',
//         payload: montant,
//     }
// }
export function changeInvFinancier(answer) {
    return {
        type: 'SET_MONTANT_F',
        payload: answer,
    }
}


export function changeCheckCondition(checkedValues) {
    return {
        type: 'SET_CONDITION',
        payload: checkedValues,
    }
}


// After termination of experience or quitter et enregister
export function sendAllData(user, userId, type, kyc) {

    return function (dispatch) {
        iziToast.info({
            title: 'info',
            message: "Your changes will not be saved in this demo",
            position: 'topCenter',
        });
        return 0;
        axios.put(`${serverName}api/investisseur/${userId}/edit/`, {
            // page 1
            "type_investisseur": user.type_investisseur,
            "net_annual_income": user.net_annual_income,
            "provenance_revenu": user.provenance_revenu,
            "patrimoine": user.patrimoine,
            "fond_invest": user.fond_invest,
            "origines_patrimoine": user.origines_patrimoine,
            "isf": user.isf,

            // page 2
            "secteurAct": user.secteurAct,
            "motivInv": user.motivInv,
            "defiscalisation": user.defiscalisation,
            "montantInvCetteAnnee": user.montantInvCetteAnnee,

            // page 3
            "dureeInv": user.dureeInv,
            "expInv": user.expInv,
            "montantInvFinancier": user.montantInvFinancier,
        }).then((reponse) => {

            dispatch({type: "SET_All_DATA", payload: false});

            iziToast.success({
                title: 'Success',
                message: lang["action.setExperience"][0],
                position: 'topCenter',
            });


            if (type === "terminate" && kyc !== "kyc2" && kyc !== "kyc1") {
                //  After termination of experience (create lemonWay)
                axios.post(`${serverName}dashboard/lemonway_management/`, {
                    "type": "finishExp"
                }).then((res) => {
                    console.log("first sent" + res);
                    // solve the delay problem of Lenom Way
                    setTimeout(function () {
                        axios.post(`${serverName}dashboard/lemonway_management/`, {
                            "type": "finishExp"
                        }).then((res) => {
                            console.log("second sent" + res)
                        }).catch((err) => {
                            console.error("second sent" + err)
                        })
                    }, 10000);
                }).catch((err) => {
                    console.error("first sent" + err);
                    // solve the delay problem of Lenom Way
                    setTimeout(function () {
                        axios.post(`${serverName}dashboard/lemonway_management/`, {
                            "type": "finishExp"
                        }).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.error(err)
                        })
                    }, 10000);
                })
            }
        })
            .catch((err) => {
                console.error(err)
                // dispatch({type: "FETCH_USER_PROFILE_REJECTED", payload: err})
                iziToast.error({
                    title: 'Error',
                    message: lang["action.setExperience"][1],
                    position: 'topCenter',
                });

            })
    }
}


//experienceStep
export function sendConfirmAll() {
    return {
        type: 'SEND_CONFIRMATION',
        payload: {},
    }
}

//experienceProgress
export function setFirstNub(nub) {
    return {
        type: 'SET_FIRST_NUB',
        payload: nub,
    }
}
export function setSecondNub(nub) {
    return {
        type: 'SET_SECOND_NUB',
        payload: nub,
    }
}
export function setThridNub(nub) {
    return {
        type: 'SET_THIRD_NUB',
        payload: nub,
    }
}
