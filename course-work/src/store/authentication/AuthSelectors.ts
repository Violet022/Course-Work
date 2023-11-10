import { CuratorCompanyType, UserRoleType } from '../../utils/types/types'
import {AppStateType} from '../store'

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const selectUserId = (state: AppStateType) => {
    return state.auth.user.userId
}

export const selectUserEmail = (state: AppStateType) => {
    return state.auth.user.email
}

export const selectUserRole = (state: AppStateType): UserRoleType => {
    return state.auth.user.role
}

export const selectAdditionalCuratorInfo = (state: AppStateType) => {
    return state.auth.additionalCuratorInfo
}

export const selectCuratorCompanies = (state: AppStateType) => {
    return state.auth.additionalCuratorInfo.companies
}

export const selectIsCuratorAttachedToCompany = (state: AppStateType) => {
    return state.auth.additionalCuratorInfo.isAttachedToCompany
}

export const selectCuratorCompanyIds = (state: AppStateType) => {
    return state.auth.additionalCuratorInfo.companies.map((company: CuratorCompanyType) => company.id)
}

export const selectGroupNumber = (state: AppStateType) => {
    return state.auth.user.groupNumber
}

export const selectCompanyId = (state: AppStateType) => {
    return state.auth.user.companyId
}

export const selectIsAuthSuccess = (state: AppStateType) => {
    return state.auth.isAuthSuccess
}

export const selectIsLogoutSuccess = (state: AppStateType) => {
    return state.auth.isLogoutSuccess
}

export const selectIsUserTryingToLogin = (state: AppStateType) => {
    return state.auth.isUserTryingToLogin
}
