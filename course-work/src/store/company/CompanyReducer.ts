import { companyServiceAPI } from "../../api/company-service-api";
import { stackServiceAPI } from "../../api/stack-service-api";
import {
    IntershipPositionDtoType, 
    CompanyDtoType, 
    CreateUpdateCompanyType
} from "../../utils/types/types";
import { GetStateType } from "../store";

let initialState = {
    companyInfo: {} as CompanyDtoType,
    isCompanyInfoFetching: false as boolean,

    positions: [] as Array<IntershipPositionDtoType>,
    isPositionsFetching: false as boolean, 

    newCompanyTemplate: {
        address: '',
        contacts: '',
        description: '',
        logoURL: '',
        name: '',
        websiteURL: ''
    } as CreateUpdateCompanyType,
    newCompany: {
        address: '',
        contacts: '',
        description: '',
        logoURL: '',
        name: '',
        websiteURL: ''
    } as CreateUpdateCompanyType,

    updatedCompanyInfo: {
        address: '',
        contacts: '',
        description: '',
        logoURL: '',
        name: '',
        websiteURL: ''
    } as CreateUpdateCompanyType,
};

const companyReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_COMPANY_INFO':
            return {
                ...state,
                companyInfo: action.company
            };
        case 'SET_IS_COMPANY_INFO_FETCHING':
            return {
                ...state,
                isCompanyInfoFetching: action.isFetching
            };
        case 'SET_POSITIONS':
            return {
                ...state,
                positions: action.positions
            };
        case 'SET_IS_POSITIONS_FETCHING':
            return {
                ...state,
                isPositionsFetching: action.isFetching
            };
        case 'SET_NEW_COMPANY':
            return {
                ...state,
                newCompany: action.newCompany
            };
        case 'CLEAR_NEW_COMPANY':
            return {
                ...state,
                newCompany: {
                    address: '',
                    contacts: '',
                    description: '',
                    logoURL: '',
                    name: '',
                    websiteURL: ''
                }
            };
        case 'SET_UPDATED_COMPANY_INFO':
            return {
                ...state,
                updatedCompanyInfo: action.updatedCompanyInfo
            };
        case 'CLEAR_UPDATED_COMPANY_INFO':
            return {
                ...state,
                updatedCompanyInfo: {
                    address: '',
                    contacts: '',
                    description: '',
                    logoURL: '',
                    name: '',
                    websiteURL: ''
                }
            };
        default:
            return state;
    }
}

export const setCompanyInfo = (company: CompanyDtoType) => {
    return {
        type: 'SET_COMPANY_INFO',
        company }
};
export const setIsCompanyInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_COMPANY_INFO_FETCHING',
        isFetching }
};
export const setPositions = (positions: Array<IntershipPositionDtoType>) => {
    return {
        type: 'SET_POSITIONS',
        positions }
};
export const setIsPositionsFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_POSITIONS_FETCHING',
        isFetching }
};
export const setNewCompany = (newCompany: CreateUpdateCompanyType) => {
    return {
        type: 'SET_NEW_COMPANY',
        newCompany }
};
export const clearNewCompany = () => {
    return {type: 'CLEAR_NEW_COMPANY'}
};
export const setUpdatedCompanyInfo = (updatedCompanyInfo: CreateUpdateCompanyType) => {
    return {
        type: 'SET_UPDATED_COMPANY_INFO',
        updatedCompanyInfo }
};
export const clearUpdatedCompanyInfo = () => {
    return {type: 'CLEAR_UPDATED_COMPANY_INFO'}
};

// THUNKS
const convertPositionStackIdToName = async(positionsWithStackId: Array<IntershipPositionDtoType>) => {
    let positions: Array<IntershipPositionDtoType> = []
    await Promise.all(positionsWithStackId.map(positionWithStackId => {
        if(positionWithStackId.stack !== null && positionWithStackId.stack !== "") {
            return stackServiceAPI.getStackNamesByIds([Number(positionWithStackId.stack)])
                .then(stackNameArray => {
                    positions.push({...positionWithStackId, stack: stackNameArray[0]})
                })
        }
        else
            positions.push(positionWithStackId)
    }))

    return positions
}

export const getCompanyInfo = (companyId: string | null) => (dispatch: any) => {
    dispatch(setIsCompanyInfoFetching(true))
    companyServiceAPI.getCompanyById(companyId)
        .then(data => {
            dispatch(setCompanyInfo(data))
            return data
        })
        .then(data => {
            dispatch(setUpdatedCompanyInfo({
                address: data.address,
                contacts: data.contacts,
                description: data.description,
                logoURL: data.logoURL,
                name: data.name,
                websiteURL: data.websiteURL
            }))
            dispatch(setIsCompanyInfoFetching(false))
        })
}

export const updateCompanyInfo = () => (dispatch: any, getState: GetStateType) => {
    const userRole = getState().auth.user.role
    const companyId = userRole === 'COMPANY' ? getState().auth.user.companyId : getState().company.companyInfo.id
    const updatedCompany = getState().company.updatedCompanyInfo
    companyServiceAPI.editCompany(
        companyId, updatedCompany.address, updatedCompany.contacts, updatedCompany.description, 
        updatedCompany.logoURL, updatedCompany.name, updatedCompany.websiteURL)
        .then((updatedCompanyInfo) => {
            dispatch(clearUpdatedCompanyInfo())
            dispatch(setIsCompanyInfoFetching(true))
            dispatch(setCompanyInfo(updatedCompanyInfo))
            dispatch(setUpdatedCompanyInfo({
                address: updatedCompanyInfo.address,
                contacts: updatedCompanyInfo.contacts,
                description: updatedCompanyInfo.description,
                logoURL: updatedCompanyInfo.logoURL,
                name: updatedCompanyInfo.name,
                websiteURL: updatedCompanyInfo.websiteURL
            }))
            dispatch(setIsCompanyInfoFetching(false))
        })
}

export const createNewCompany = () => (dispatch: any, getState: GetStateType) => {
    const newCompany = getState().company.newCompany
    companyServiceAPI.createCompany(newCompany.address, newCompany.contacts, newCompany.description, 
            newCompany.logoURL, newCompany.name, newCompany.websiteURL
    )
        .then(() => dispatch(clearNewCompany()))
}

export type InitialStateType = typeof initialState

export default companyReducer;
