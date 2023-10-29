import {AppStateType} from '../store'

export const selectCompanies = (state: AppStateType) => {
    return state.companies.companies
}

export const selectAreCompaniesFetching = (state: AppStateType) => {
    return state.companies.areCompaniesFetching
}
