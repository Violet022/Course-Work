import {AppStateType} from '../store'

export const selectProfileCompanyInfo = (state: AppStateType) => {
    return state.profile.companyInfo
}

export const selectIsProfileCompanyInfoFetching = (state: AppStateType) => {
    return state.profile.isCompanyInfoFetching
}

export const selectUpdatedCompanyInfo = (state: AppStateType) => {
    return state.profile.updatedCompanyInfo
}

export const selectProfileInfo= (state: AppStateType) => {
    return state.profile.profileInfo
}

export const selectIsProfileInfoFetching = (state: AppStateType) => {
    return state.profile.isProfileInfoFetching
}

export const selectUpdatedProfileInfo = (state: AppStateType) => {
    return state.profile.updatedProfileInfo
}

export const selectAdditionalStudentInfo= (state: AppStateType) => {
    return state.profile.additionalStudentInfo
}

export const selectIsAdditionalStudentInfoFetching = (state: AppStateType) => {
    return state.profile.isAdditionalStudentInfoFetching
}

export const selectUpdatedAdditionalStudentInfo = (state: AppStateType) => {
    return state.profile.updatedAdditionalStudentInfo
}
