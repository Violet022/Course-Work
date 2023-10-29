import { companyServiceAPI } from "../../api/company-service-api";
import { CompanyDtoType } from "../../utils/types/types";

let initialState = {
    companies: [] as Array<CompanyDtoType>,
    areCompaniesFetching: false as boolean
};

const companiesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return {
                ...state,
                companies: action.companies
            };
        case 'SET_ARE_COMPANIES_FETCHING':
            return {
                ...state,
                areCompaniesFetching: action.areFetching
            };
        default:
            return state;
    }
}

export const setCompanies = (companies: Array<CompanyDtoType>) => {
    return {
        type: 'SET_COMPANIES',
        companies }
};
export const setAreCompaniesFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_COMPANIES_FETCHING',
        areFetching }
};

export const getAllCompanies = () => (dispatch: any) => {
    dispatch(setAreCompaniesFetching(true))
    companyServiceAPI.getAllCompanies()
        .then(data => {
            dispatch(setCompanies(data))
            dispatch(setAreCompaniesFetching(false))
        })
}

export type InitialStateType = typeof initialState

export default companiesReducer;
