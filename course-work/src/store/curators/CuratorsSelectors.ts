import {AppStateType} from '../store'

export const selectCurators = (state: AppStateType) => {
    return state.curators.curators
}

export const selectAreCuratorsFetching = (state: AppStateType) => {
    return state.curators.areCuratorsFetching
}