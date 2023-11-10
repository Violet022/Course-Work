import {AppStateType} from '../store'

export const selectCompanies = (state: AppStateType) => {
    return state.companies.companies
}

export const selectCompaniesWithCurators = (state: AppStateType) => {
    return state.companies.companiesWithCurators
}

export const selectAreCompaniesFetching = (state: AppStateType) => {
    return state.companies.areCompaniesFetching
}
