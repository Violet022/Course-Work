import { UserType, AdditionalCuratorInfoType } from '../../utils/types/types'
import { userServiceAPI } from '../../api/user-service-api';
import { curatorServiceAPI } from '../../api/curator-service-api';

let initialState = {
    user: {} as UserType, 
    additionalCuratorInfo: {
        isAttachedToCompany: false as boolean,
        companies: []
    } as AdditionalCuratorInfoType,
    isAuth: false,
    loginFormData: {
        email: '' as string ,
        password: '' as string 
    },
    isAuthSuccess: false as boolean,
    isLogoutSuccess: false as boolean,
    isUserTryingToLogin: false as boolean   
}

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.user
            }
        case 'SET_ADDITIONAL_CURATOR_INFO':
            return {
                ...state,
                additionalCuratorInfo: action.additionalCuratorInfo
            }
        case 'SET_IS_AUTH':
            return {
                ...state,
                isAuth: action.isAuth
            }
        case 'SET_LOGIN_FORM_DATA':
            return {
                ...state,
                loginFormData: action.payload
            }
        case 'CLEAR_LOGIN_FORM_DATA':
            return {
                ...state,
                loginFormData : {
                    email: '',
                    password: ''
                }
            }
        case 'SET_IS_AUTH_SUCCESS':
            return {
                ...state,
                isAuthSuccess: action.isSuccess
            }
        case 'SET_IS_LOGOUT_SUCCESS':
            return {
                ...state,
                isLogoutSuccess: action.isSuccess
            }
        case 'SET_IS_USER_TRYING_TO_LOGIN':
            return {
                ...state,
                isUserTryingToLogin: action.isTryingToLogin
            }
        default:
            return state
    }
}

export const setUserData = (user: UserType) => {
    return {
        type: 'SET_USER_DATA',
        user }
};
export const setAdditionalCuratorInfo = (additionalCuratorInfo: AdditionalCuratorInfoType) => {
    return {
        type: 'SET_ADDITIONAL_CURATOR_INFO',
        additionalCuratorInfo }
};
export const setIsAuth = (isAuth: boolean) => {
    return {
        type: 'SET_IS_AUTH',
        isAuth }
};
export const setToken = (token: string) => {
    return {
        type: 'SET_TOKEN',
        token }
};
export const setLoginFormData = (formData: LoginDataFormType) => {
    return {
        type: 'SET_LOGIN_FORM_DATA',
        payload: formData }
};
export const clearLoginFormData = () => {
    return { type: 'CLEAR_LOGIN_FORM_DATA'}
};
export const setIsAuthSuccess = (isSuccess: boolean) => {
    return { type: 'SET_IS_AUTH_SUCCESS', isSuccess}
};
export const setIsLogoutSuccess = (isSuccess: boolean) => {
    return { type: 'SET_IS_LOGOUT_SUCCESS', isSuccess}
};
export const setIsUserTryingToLogin = (isTryingToLogin: boolean) => {
    return { type: 'SET_IS_USER_TRYING_TO_LOGIN', isTryingToLogin}
};

export const login = (loginData: LoginDataFormType) => (dispatch: any) => {
    dispatch(setIsAuth(false))
    dispatch(setIsAuthSuccess(false))
    dispatch(setIsUserTryingToLogin(true))
    userServiceAPI.authenticate(loginData.email, loginData.password)
        .then(data => {
            let token = data.jwtToken
            localStorage.setItem('token', `Bearer ${token}`)
            dispatch(clearLoginFormData())
        })
        .then(() => {
            userServiceAPI.getUserByEmail(loginData.email)
                .then(userData => {
                    dispatch(setUserData(userData))
                    if (userData.role === 'CURATOR') {
                        curatorServiceAPI.getCuratorById(userData.userId)
                            .then((data) => {
                                if(data.companies.length !== 0) {
                                    dispatch(setAdditionalCuratorInfo({
                                        isAttachedToCompany: true,
                                        companies: data.companies
                                    }))
                                }
                                dispatch(setIsUserTryingToLogin(false))
                                dispatch(setIsAuth(true))
                                dispatch(setIsAuthSuccess(true))
                            })
                    }
                    else {
                        dispatch(setIsUserTryingToLogin(false))
                        dispatch(setIsAuth(true))
                        dispatch(setIsAuthSuccess(true))
                    }
                })
        })
}

export const logout = () => (dispatch: any) => {
    dispatch(setIsLogoutSuccess(false))
    dispatch(setUserData({
        userId: '',
        firstName: '',
        lastName: '',
        patronym: '',
        role: '',
        email: '',
        groupNumber: null,
        companyId: null
    }))
    dispatch(setIsAuth(false))
    localStorage.setItem('token', '')
    dispatch(setIsLogoutSuccess(true))
    dispatch(setIsAuthSuccess(false))
}

export default authReducer;

export type InitialStateType = typeof initialState
export type LoginDataFormType = typeof initialState.loginFormData