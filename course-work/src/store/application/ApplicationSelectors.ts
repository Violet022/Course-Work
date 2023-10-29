import {AppStateType} from '../store'

export const selectApplicationInfo = (state: AppStateType) => {
    return state.application.applicationInfo
}

export const selectIsApplicationInfoFetching = (state: AppStateType) => {
    return state.application.isApplicationInfoFetching
}

export const selectStudentApplicationInfo = (state: AppStateType) => {
    return state.application.studentApplicationInfo
}

export const selectNewInterviewTemplate = (state: AppStateType) => {
    return state.application.newInterviewTemplate
}

