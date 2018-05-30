/**
 * Created by shenlin on 7/12/17.
 */

export function setDocumentModal() {
    return {
        type: 'SET_DOCUMENT_MODAL',
        payload: {},
    }
}


export function setCarteNationalModal() {
    return {
        type: 'SET_CARTE_NATIONAL_MODAL',
        payload: {},
    }
}


export function setJustificatifDomicile(src) {
    return {
        type: 'SET_JUSTIFICATIF_DOMICILE',
        payload: src,
    }
}

export function setPassport(src) {
    return {
        type: 'SET_PASSPORT',
        payload: src,
    }
}


export function setRecto(src) {
    return {
        type: 'SET_RECTO',
        payload: src,
    }
}


export function setVerso(src) {
    return {
        type: 'SET_VERSO',
        payload: src,
    }
}
