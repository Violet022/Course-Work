import type {CreateUpdateCompanyType, CreateUserType} from '../../utils/types/types';
import { userServiceAPI } from '../../api/user-service-api';
import { getAllCurators } from '../curators/CuratorsReducer';
import { GetStateType } from '../store';

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
    } as CreateUserType
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

// THUNKS
export const createNewUser = () => (dispatch: any, getState: GetStateType) => {
    const newUser = getState().administration.newUser
    userServiceAPI.createUser(newUser.companyId, newUser.email, newUser.firstName, newUser.groupNumber, 
        newUser.lastName, newUser.password, newUser.patronym, newUser.role)
        .then(() => {
            if(newUser.role === 'CURATOR')
                dispatch(getAllCurators())
            dispatch(clearNewUser())
        })
}

export type InitialStateType = typeof initialState

export default administrationReducer;