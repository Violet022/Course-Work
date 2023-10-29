import {AppStateType} from '../store'

export const selectPositions = (state: AppStateType) => {
    return state.positions.positions
}

export const selectArePositionsFetching = (state: AppStateType) => {
    return state.positions.arePositionsFetching
}

export const selectArePositionsWithApplicationsFetching = (state: AppStateType) => {
    return state.positions.arePositionsWithApplicationsFetching
}

export const selectPositionsWithApplications = (state: AppStateType) => {
    return state.positions.positionsWithApplications
}

