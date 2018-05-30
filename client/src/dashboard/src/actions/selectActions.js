/**
 * Created by shenlin on 7/26/17.
 */
export function setSelectLocation(value) {
    return {
        type: 'SET_SELECT_LOCATION',
        payload: value
    }
}


export function setSelectDomain(value) {
    return {
        type: 'SET_SELECT_DOMAIN',
        payload: value
    }
}


export function setSelectName(value) {
    return {
        type: 'SET_SELECT_NAME',
        payload: value
    }
}

export function initializeInvestements() {
    return {
        type: 'INITIALIZE_INVESTEMENTS',
        payload: {}
    }
}


export function filterByNameInv(name) {
    return {
        type: 'FILTER_BY_NAME_INV',
        payload: name
    }
}


export function filterByLocationInv(location) {
    return {
        type: 'FILTER_BY_LOCATION_INV',
        payload: location
    }
}

export function filterByDomainInv(domain) {
    return {
        type: 'FILTER_BY_DOMAIN_INV',
        payload: domain
    }
}


export function initializeResa() {
    return {
        type: 'INITIALIZE_RESA',
        payload: {}
    }
}


export function filterByLocationResa(location) {
    return {
        type: 'FILTER_BY_LOCATION_RESA',
        payload: location
    }
}

export function filterByDomainResa(domain) {
    return {
        type: 'FILTER_BY_DOMAIN_RESA',
        payload: domain
    }
}

export function filterByNameResa(name) {
    return {
        type: 'FILTER_BY_NAME_RESA',
        payload: name
    }
}