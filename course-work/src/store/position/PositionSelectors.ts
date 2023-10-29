import {AppStateType} from '../store'

export const selectPositionInfo = (state: AppStateType) => {
    return state.position.positionInfo
}

export const selectPositionName = (state: AppStateType) => {
    return state.position.positionInfo.title
}

export const selectIsPositionInfoFetching = (state: AppStateType) => {
    return state.position.positionInfoIsFetching
}

export const selectIsStudentAppliedAnApplication = (state: AppStateType) => {
    return state.position.isStudentAppliedAnApplication
}
export const selectIsStudentAppliedAnApplicationFetching = (state: AppStateType) => {
    return state.position.isStudentAppliedAnApplicationFetching
}

export const selectUpdatedPositionInfo = (state: AppStateType) => {
    return state.position.updatedPositionInfo
}

export const selectUpdatedPositionInfoTemplate = (state: AppStateType) => {
    return state.position.updatedPositionInfoTemplate
}

export const selectNewPosition = (state: AppStateType) => {
    return state.position.newPosition
}

export const selectNewPositionTemplate = (state: AppStateType) => {
    return state.position.newPositionTemplate
}
