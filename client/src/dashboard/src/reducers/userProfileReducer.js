/**
 * Created by shenlin on 6/13/17.
 */

export default function reducer(state = {
    user: {
        id: null,
        basicInfo: {
            firstName: null,
            lastName: null,
            projectSuiviNum: 1,
            telephone: "+33698625433"
        },

        // kyc
        kyc: "no wallet",

        // document
        justificatif_domicile_valid: false,
        papier_identite_valid: 0,
        passport_valid: 0,

        // experiment
        net_annual_income: "",
        provenance: "",
        montantInvCetteAnnee: "",
        montantInvFinancier: "",
        motivInv: "",
        origines_patrimoine: "",
        provenance_revenu: "",


    },
    basicInfoBackUp: {},
    modifyMode: false,
    uploadingAvatar: false,

    firstNub: 0,
    secondNub: 0,
    thirdNub: 0,


    // validation
    // 0 no error; 1 empty string; 2 no alpha; 3 too long
    firstNameValidateStatus: 0,
    lastNameValidateStatus: 0,
    emailValidateStatus: 0,
    birthdayValidateStatus: true,
    telephoneValidateStatus: true,
    professionValidateStatus: true,
    companyNameValidateStatus: true,
    addressValidateStatus: true,
    locationValidateStatus: true,
    countryValidateStatus: true,
    zipCodeValidateStatus: true,
    descriptionValidateStatus: true,

    // social media
    ajouterCompte: false,
    ajouterLinkedinFlag: false,
    ajouterFacebookFlag: false,
    ajouterTwitterFlag: false,
    linkedin: '',
    facebook: '',
    twitter: '',

    // experience control
    experienceControl: {
        income: [25, 50],
        isfValue: null,
        situation: [false, false, false, false, false],
        secteur: [false, false, false, false],
        object: [false, false, false, false, false, false, false],
        option: [false, false, false, false, false, false],
        exp: [false, false, false, false, false],
        showConfirmation: false,
        confirmValue: [],
    },

    // document control
    documentControl: {
        showModal: false,
        showModal2: false,
        idDocType: 'passport',
    },

    fetching: false,
    fetched: false,
    error: null,
}, action) {


    switch (action.type) {
        case "FETCH_USER_PROFILE": {
            return {...state, fetching: true}
        }

        case "FETCH_USER_PROFILE_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }

        case "FETCH_USER_PROFILE_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: action.payload,
                basicInfoBackUp: action.payload.basicInfo
            }
        }

        case "SET_MODIFY_MODE": {
            return {
                ...state,
                modifyMode: !state.modifyMode,
            }
        }


        // validations
        case "SET_UPLOAD_AVATAR_STATUS": {
            return {
                ...state,
                uploadingAvatar: action.payload,
            }
        }


        case "SET_FIRST_NAME_VALIDATION_STATUS": {
            return {
                ...state,
                firstNameValidateStatus: action.payload,
            }
        }

        case "SET_LAST_NAME_VALIDATION_STATUS": {
            return {
                ...state,
                lastNameValidateStatus: action.payload,
            }
        }


        case "SET_EMAIL_VALIDATION_STATUS": {
            return {
                ...state,
                emailValidateStatus: action.payload,
            }
        }

        case "SET_BIRTHDAY_VALIDATION_STATUS": {
            return {
                ...state,
                birthdayValidateStatus: action.payload,
            }
        }

        case "SET_TELEPHONE_VALIDATION_STATUS": {
            return {
                ...state,
                telephoneValidateStatus: action.payload,
            }
        }


        case "SET_PROFESSION_VALIDATION_STATUS": {
            return {
                ...state,
                professionValidateStatus: action.payload,
            }
        }

        case "SET_COMPANY_NAME_VALIDATION_STATUS": {
            return {
                ...state,
                companyNameValidateStatus: action.payload,
            }
        }


        case "SET_ADDRESS_VALIDATION_STATUS": {
            return {
                ...state,
                addressValidateStatus: action.payload,
            }
        }


        case "SET_LOCATION_VALIDATION_STATUS": {
            return {
                ...state,
                locationValidateStatus: action.payload,
            }
        }

        case "SET_COUNTRY_VALIDATION_STATUS": {
            return {
                ...state,
                countryValidateStatus: action.payload,
            }
        }


        case "SET_ZIP_CODE_VALIDATION_STATUS": {
            return {
                ...state,
                zipCodeValidateStatus: action.payload,
            }
        }


        case "SET_DESCRIPTION_VALIDATION_STATUS": {
            return {
                ...state,
                descriptionValidateStatus: action.payload,
            }
        }








        // set basic info
        case "SET_USER_PHOTO": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, photo: action.payload
                    }
                }
            }
        }
        case "SET_USER_EMAIL": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, email: action.payload
                    }
                }
            }
        }
        case "SET_USER_FIRST_NAME": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, firstName: action.payload
                    }
                },
            }
        }
        case "SET_USER_LAST_NAME": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, lastName: action.payload
                    }
                },
            }
        }
        case "SET_USER_PROFESSION": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, profession: action.payload
                    }
                },
            }
        }
        case "SET_USER_COMPANY_NAME": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, company_name: action.payload
                    }
                },
            }
        }
        case "SET_USER_BIRTHDAY": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, birthday: action.payload
                    }
                },
            }
        }
        case "SET_USER_BIRTHDAY_DATE": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, birthdayDate: action.payload
                    }
                },
            }
        }

        case "SET_USER_BIRTHDAY_MONTH": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, birthdayMonth: action.payload
                    }
                },
            }
        }

        case "SET_USER_BIRTHDAY_YEAR": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, birthdayYear: action.payload
                    }
                },
            }
        }

        case "SET_USER_TELEPHONE": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, telephone: action.payload
                    }
                },
            }
        }
        case "SET_USER_ADDRESS": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, address: action.payload
                    }
                },
            }
        }
        case "SET_USER_CITY": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, city: action.payload
                    }
                },
            }
        }
        case "SET_USER_ZIP": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, zip_code: action.payload
                    }
                },
            }
        }
        case "SET_USER_COUNTRY": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, country: action.payload
                    }
                },
            }
        }
        case "SET_USER_DES": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: {
                        ...state.user.basicInfo, description: action.payload
                    }
                },
            }
        }
        case "CANCEL_CHANGE": {
            return {
                ...state, user: {
                    ...state.user, basicInfo: state.basicInfoBackUp
                },
            }
        }








        // Social media
        case "SET_LINKEDIN_COMPTE": {
            return {
                ...state,
                ajouterLinkedinFlag: true,
            }
        }

        case "SET_FACEBOOK_COMPTE": {
            return {
                ...state,
                ajouterFacebookFlag: true,
            }
        }

        case "SET_TWITTER_COMPTE": {
            return {
                ...state,
                ajouterTwitterFlag: true,
            }
        }

        case "CHANGE_LINKEDIN": {
            return {
                ...state,
                linkedin: action.payload,
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    linkedinpage: action.payload
                }

            }
        }

        case "CHANGE_FACEBOOK": {
            return {
                ...state,
                facebook: action.payload,
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    facebookpage: action.payload
                }

            }
        }

        case "CHANGE_TWITTER": {
            return {
                ...state,
                twitter: action.payload,
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    twitterpage: action.payload
                }
            }
        }

        case "CLEAN_LINKEDIN_COMPTE": {
            return {
                ...state,
                linkedin: action.payload,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        linkedinpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    linkedinpage: action.payload
                }
            }
        }

        case "CLEAN_FACEBOOK_COMPTE": {
            return {
                ...state,
                facebook: action.payload,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        facebookpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    facebookpage: action.payload
                }
            }
        }

        case "CLEAN_TWITTER_COMPTE": {
            return {
                ...state,
                twitter: action.payload,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        twitterpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    twitterpage: action.payload
                }
            }
        }

        case "SET_LINKEDIN_COMPTE_SUCCESS": {
            return {
                ...state,
                ajouterLinkedinFlag: false,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        linkedinpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    linkedinpage: action.payload
                }
            }
        }

        case "SET_FACEBOOK_COMPTE_SUCCESS": {
            return {
                ...state,
                ajouterFacebookFlag: false,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        facebookpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    facebookpage: action.payload
                }
            }
        }

        case "SET_TWITTER_COMPTE_SUCCESS": {
            return {
                ...state,
                ajouterTwitterFlag: false,
                user: {
                    ...state.user,
                    basicInfo: {
                        ...state.user.basicInfo,
                        twitterpage: action.payload
                    }
                },
                basicInfoBackUp: {
                    ...state.basicInfoBackUp,
                    twitterpage: action.payload
                }
            }
        }

        // documents
        case "SET_DOCUMENT_MODAL": {
            return {
                ...state,
                documentControl: {
                    ...state.documentControl, showModal: !state.documentControl.showModal
                }
            }
        }

        case "SET_CARTE_NATIONAL_MODAL": {
            return {
                ...state,
                documentControl: {
                    ...state.documentControl, showModal2: !state.documentControl.showModal2
                }
            }
        }


        case "SET_JUSTIFICATIF_DOMICILE": {
            return {
                ...state,
                user: {
                    ...state.user,
                    justificatif_domicile_valid: 1,
                    justificatif_domicile: action.payload,
                }
            }
        }


        case "SET_PASSPORT": {
            return {
                ...state,
                user: {
                    ...state.user,
                    passport_valid: 1,
                    papier_identite_passport: action.payload,
                }
            }
        }

        case "SET_RECTO": {
            let flag = 0;
            if (state.user.papier_identite_idCard_verso) {
                flag = 1
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    papier_identite_valid: flag,
                    papier_identite_idCard_recto: action.payload,
                }
            }
        }

        case "SET_VERSO": {
            let flag = 0;
            if (state.user.papier_identite_idCard_recto) {
                flag = 1
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    papier_identite_valid: flag,
                    papier_identite_idCard_verso: action.payload,
                }
            }
        }

        //initial
        case 'INITIAL_EXPERIENCE': {
            let result = action.payload;

            let situationNew = {...state.experienceControl.situation};
            let provenance_revenu = result.provenance_revenu;
            let provenance_revenu_array = provenance_revenu.split(',');
            for (let a = 0; a < provenance_revenu_array.length; a++) {
                situationNew[parseInt(provenance_revenu_array[a], 10)] = true;
            }

            let secteurNew = {...state.experienceControl.secteur};
            let secteurAct = result.secteurAct;
            let secteurAct_array = secteurAct.split(',');
            for (let b = 0; b < secteurAct_array.length; b++) {
                secteurNew[parseInt(secteurAct_array[b], 10)] = true;
            }

            let objectNew = {...state.experienceControl.object};
            let motivInv = result.motivInv;
            let motivInv_array = motivInv.split(',');
            for (let c = 0; c < motivInv_array.length; c++) {
                objectNew[parseInt(motivInv_array[c], 10)] = true;
            }

            let optionNew = {...state.experienceControl.option};
            let defiscalisation = result.defiscalisation;
            let defiscalisation_array = defiscalisation.split(',');
            for (let d = 0; d < defiscalisation_array.length; d++) {
                optionNew[parseInt(defiscalisation_array[d], 10)] = true;
            }

            let expNew = {...state.experienceControl.exp};
            let expInv = result.expInv;
            let expInv_array = expInv.split(',');
            for (let e = 0; e < expInv_array.length; e++) {
                expNew[parseInt(expInv_array[e], 10)] = true;
            }

            return {
                ...state,
                experienceControl: {
                    ...state.experienceControl,
                    situation: situationNew,
                    secteur: secteurNew,
                    object: objectNew,
                    option: optionNew,
                    exp: expNew
                }
            }
        }

        case 'INITIAL_PROGRESS_BAR': {
            let result = action.payload;

            let obj = [result.basicInfo.city, result.basicInfo.description, result.basicInfo.firstName, result.basicInfo.profession, result.basicInfo.photo,
                result.basicInfo.address, result.basicInfo.telephone, result.basicInfo.twitterpage,
                result.basicInfo.birthday, result.basicInfo.company_name, result.basicInfo.lastName,
                result.basicInfo.facebookpage, result.basicInfo.linkedinpage, result.basicInfo.country, result.basicInfo.email,
                result.basicInfo.zip_code];

            // const arr = Object.values(obj);

            let first = 0;
            for (let i = 0; i < obj.length; i++) {
                if ((typeof obj[i] === "string" && obj[i] !== "" && obj[i] !== "NULL" && obj[i] !== "non rempli") || (typeof obj[i] === "number")) {
                    first = first + 1;
                }
            }

            let second = 0;

            if ((typeof result.papier_identite_passport === "string" && result.papier_identite_passport !== "" && result.papier_identite_passport !== "NULL" && result.papier_identite_passport !== "non rempli")
                || ((typeof result.papier_identite_idCard_recto === "string" && result.papier_identite_idCard_recto !== "" && result.papier_identite_idCard_recto !== "NULL" && result.papier_identite_idCard_recto !== "non rempli")
                && (typeof result.papier_identite_idCard_verso === "string" && result.papier_identite_idCard_verso !== "" && result.papier_identite_idCard_verso !== "NULL" && result.papier_identite_idCard_verso !== "non rempli"))) {
                second = second + 1;
            }
            if (result.papier_identite_valid === 1) {
                second = second + 1;
            }
            if (result.justificatif_domicile === "string" && result.justificatif_domicile !== "" && result.justificatif_domicile !== "NULL" && result.justificatif_domicile !== "non rempli") {
                second = second + 1;
            }
            if (result.justificatif_domicile_valid === 1) {
                second = second + 1;
            }

            let obj2 = [result.type_investisseur, result.net_annual_income, result.provenance_revenu, result.patrimoine,
                result.origines_patrimoine, result.isf, result.fond_invest, result.secteurAct,
                result.motivInv, result.defiscalisation, result.montantInvCetteAnnee,
                result.expInv, result.dureeInv, result.montantInvFinancier];

            let third = 0;
            for (let j = 0; j < obj2.length; j++) {
                if ((typeof obj2[j] === "string" && obj2[j] !== "" && obj2[j] !== "NULL" && obj2[j] !== "non rempli") || (typeof obj2[j] === "number")) {
                    third = third + 1;
                }
            }
            return {
                ...state,
                firstNub: first,
                secondNub: second,
                thirdNub: third,
            }
        }

        //experienceOne
        case 'SET_TYPE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    type_investisseur: action.payload
                }
            }
        }

        case 'SET_REVENU': {
            return {
                ...state,
                user: {
                    ...state.user,
                    net_annual_income: action.payload
                }
            }
        }

        case 'SET_PROVENANCE_REVENU': {
            return {
                ...state,
                user: {
                    ...state.user,
                    provenance_revenu: action.payload.answer
                },
                experienceControl: {
                    ...state.experienceControl,
                    situation: action.payload.array
                }
            }
        }

        case 'SET_PATRIMOINE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    patrimoine: action.payload
                }
            }
        }

        case 'SET_FOND_INVEST': {

            return {
                ...state,
                user: {
                    ...state.user,
                    fond_invest: action.payload
                }
            }
        }

        case 'SET_ORIGINES_PATRIMOINE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    origines_patrimoine: action.payload
                }
            }
        }

        case 'SET_ISF': {
            return {
                ...state,
                user: {
                    ...state.user,
                    isf: action.payload
                }
            }
        }

        //experienceTwo
        case 'SET_SECTEUR': {
            return {
                ...state,
                user: {
                    ...state.user,
                    secteurAct: action.payload.answer
                },
                experienceControl: {
                    ...state.experienceControl,
                    secteur: action.payload.array
                }
            }
        }

        case 'SET_OBJECT': {
            return {
                ...state,
                user: {
                    ...state.user,
                    motivInv: action.payload.answer
                },
                experienceControl: {
                    ...state.experienceControl,
                    object: action.payload.array
                }
            }
        }

        case 'SET_OPTION': {
            return {
                ...state,
                user: {
                    ...state.user,
                    defiscalisation: action.payload.answer
                },
                experienceControl: {
                    ...state.experienceControl,
                    option: action.payload.array
                }
            }
        }

        case 'SET_MONTANT_INV': {
            return {
                ...state,
                user: {
                    ...state.user,
                    montantInvCetteAnnee: action.payload
                }
            }
        }

        //experienceThree
        case 'SET_DUREE': {
            return {
                ...state,
                user: {
                    ...state.user,
                    dureeInv: action.payload
                }
            }
        }

        case 'SET_EXP': {
            return {
                ...state,
                user: {
                    ...state.user,
                    expInv: action.payload.answer
                },
                experienceControl: {
                    ...state.experienceControl,
                    exp: action.payload.array
                }
            }
        }

        case 'SET_MONTANT_F': {
            return {
                ...state,
                user: {
                    ...state.user,
                    montantInvFinancier: action.payload
                }
            }
        }

        case "SET_CONDITION": {
            return {
                ...state,
                experienceControl: {
                    ...state.experienceControl,
                    confirmValue: action.payload
                }
            }
        }

        case "SEND_CONFIRMATION": {
            return {
                ...state,
                experienceControl: {
                    ...state.experienceControl,
                    showConfirmation: !state.experienceControl.showConfirmation
                }
            }
        }
        case "SET_All_DATA": {
            return {
                ...state,
                experienceControl: {
                    ...state.experienceControl,
                    showConfirmation: action.payload
                }
            }
        }

        //experienceProgress
        case "SET_FIRST_NUB": {
            return {
                ...state,
                firstNub: action.payload
            }
        }
        case "SET_SECOND_NUB": {
            return {
                ...state,
                secondNub: action.payload
            }
        }
        case "SET_THIRD_NUB": {
            return {
                ...state,
                thirdNub: action.payload
            }
        }

    }

    return state
}