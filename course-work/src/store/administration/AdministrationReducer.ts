import type {InferActionsTypes} from '../store';
import type {ApplicationType, CreateUpdateCompanyType, CreateUpdateGroupType, CreateUpdatePositionType, 
    CreateUserType, 
    IntershipPositionDtoType,
    LanguageType,
    StackType,
    TechnologyType
} from '../../utils/types/types';
import { companyServiceAPI } from '../../api/company-service-api';
import { getAllCompanyPositions } from '../positions/PositionsReducer';
import { applicationServiceAPI } from '../../api/intership-application-service-api';
import { stackServiceAPI } from '../../api/stack-service-api';
import { userServiceAPI } from '../../api/user-service-api';

let initialState = {
    newUserTemplate: {
        companyId: null,
        email: '',
        firstName: '',
        groupNumber: null,
        lastName: '',
        password: '',
        patronym: '',
        role: ''
    } as CreateUserType,
    newUser: {
        companyId: null,
        email: '',
        firstName: '',
        groupNumber: null,
        lastName: '',
        password: '',
        patronym: '',
        role: ''
    } as CreateUserType,

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

}

const administrationReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_NEW_USER':
            return {
                ...state,
                newUser: action.newUser
            };
        case 'CLEAR_NEW_USER':
            return {
                ...state,
                newUser: {
                    companyId: null,
                    email: '',
                    firstName: '',
                    groupNumber: null,
                    lastName: '',
                    password: '',
                    patronym: '',
                    role: ''
                }
            };
        case 'SET_NEW_COMPANY':
            return {
                ...state,
                newCompany: action.newCompany
            };
        default:
            return state;
    }
}

// ACTIONS
export const setNewUser = (newUser: CreateUserType) => {
    return {
        type: 'SET_NEW_USER',
        newUser
    }
}
export const clearNewUser = () => {
    return {type: 'CLEAR_NEW_USER'}
}
export const setNewCompany = (newCompany: CreateUpdateCompanyType) => {
    return {
        type: 'SET_NEW_COMPANY',
        newCompany
    }
}

// THUNKS
export const createNewUser = () => (dispatch: any, getState: any) => {
    const newUser = getState().administration.newUser
    userServiceAPI.createUser(newUser.companyId, newUser.email, newUser.firstName, newUser.groupNumber, 
        newUser.lastName, newUser.password, newUser.patronym, newUser.role)
        .then(() => dispatch(clearNewUser()))
}



export type InitialStateType = typeof initialState

export default administrationReducer;