import {AppStateType} from '../store'

export const selectApplications = (state: AppStateType) => {
    return state.applications.applications
}

export const selectApplicationsWithStudentInfo = (state: AppStateType) => {
    return state.applications.applicationsWithStudentInfo
}

export const selectAreApplicationsFetching = (state: AppStateType) => {
    return state.applications.areApplicationsFetching
}