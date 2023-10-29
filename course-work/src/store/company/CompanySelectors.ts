import {AppStateType} from '../store'

export const selectCompanyInfo = (state: AppStateType) => {
    return state.company.companyInfo
}

export const selectIsCompanyInfoFetching = (state: AppStateType) => {
    return state.company.isCompanyInfoFetching
}

export const selectCompanyPositions = (state: AppStateType) => {
    return state.company.companyInfo.positions
}

export const selectIsCompanyPositionsFetching = (state: AppStateType) => {
    return state.company.isPositionsFetching
}

export const selectNewCompanyTemplate = (state: AppStateType) => {
    return state.company.newCompanyTemplate
}