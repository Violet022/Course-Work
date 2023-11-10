import { companyServiceAPI } from "../../api/company-service-api";
import { curatorServiceAPI } from "../../api/curator-service-api";
import { userServiceAPI } from "../../api/user-service-api";
import { CompanyDtoType, CompanyWithCuratorsType, ShortCuratorType } from "../../utils/types/types";
import { AppStateType, GetStateType } from "../store";

let initialState = {
    companies: [] as Array<CompanyDtoType>,
    companiesWithCurators: [] as Array<CompanyWithCuratorsType>,
    areCompaniesFetching: false as boolean
};

const companiesReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_COMPANIES':
            return {
                ...state,
                companies: action.companies
            };
        case 'SET_COMPANIES_WITH_CURATORS':
            return {
                ...state,
                companiesWithCurators: action.companies
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
export const setCompaniesWithCurators = (companies: Array<CompanyWithCuratorsType>) => {
    return {
        type: 'SET_COMPANIES_WITH_CURATORS',
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

export const getCuratorCompanies = () => (dispatch: any, getState: GetStateType) => {
    const curatorCompanyIds = getState().auth.additionalCuratorInfo.companies.map(company => company.id)
    dispatch(setAreCompaniesFetching(true))
    Promise.all(curatorCompanyIds.map((curatorCompanyId: string) => {
        return companyServiceAPI.getCompanyById(curatorCompanyId)
               .then(companyData => companyData)
    }))
    .then((curatorCompaniesArray) => {
        dispatch(setCompanies(curatorCompaniesArray))
        dispatch(setAreCompaniesFetching(false))
    })

}

export const getAllCompaniesWithCurators = () => (dispatch: any) => {
    dispatch(setAreCompaniesFetching(true))
    companyServiceAPI.getAllCompanies()
        .then(companies => {
            Promise.all(companies.map((company: CompanyDtoType) => {
                return curatorServiceAPI.getCuratorsByCompanyId(company.id)
                    .then((curatorsIds: Array<string>) => {
                        return Promise.all(curatorsIds.map((curatorId: string) => {
                            return userServiceAPI.getUserById(curatorId)
                                .then(userData => {
                                    return {
                                        id: curatorId,
                                        name: `${userData.lastName} ${userData.firstName} ${userData.patronym === null ? '' : userData.patronym}`
                                    }
                                })

                        }))
                        .then((curatorsArray) => {
                            return {
                                id: company.id,
                                name: company.name,
                                curators: curatorsArray
                            }
                        })
                    })
            }))
            .then((companiesWithCurators) => {
                dispatch(setCompaniesWithCurators(companiesWithCurators))
                dispatch(setAreCompaniesFetching(false))
            })  
        }) 

}

export const addCuratorsToCompany = (companyId: string, curatorIds: Array<string>) => (dispatch: any) => {
    if(curatorIds.length !== 0) {
        Promise.all(curatorIds.map((curatorId: string) => {
            return curatorServiceAPI.addACompanyToCurator(curatorId, companyId)
        }))
        .then(() => {
            dispatch(getAllCompaniesWithCurators())
        })
    }
}

export const removeACuratorFromCompany = (curatorId: string, companyId: string) => (dispatch: any) => {
    curatorServiceAPI.removeACompanyFromCurator(curatorId, companyId)
    .then(() => {
        dispatch(getAllCompaniesWithCurators())
    })
}

export type InitialStateType = typeof initialState

export default companiesReducer;
