import {AppStateType} from '../store'

export const selectAllStacks = (state: AppStateType) => {
    return state.stack.stacks
}
export const selectAreStacksFetching = (state: AppStateType) => {
    return state.stack.areStacksFetching
}

export const selectAllLanguages = (state: AppStateType) => {
    return state.stack.languages
}
export const selectAreLanguagesFetching = (state: AppStateType) => {
    return state.stack.areLanguagesFetching
}

export const selectAllTechnologies = (state: AppStateType) => {
    return state.stack.technologies
}
export const selectAreTechnologiesFetching = (state: AppStateType) => {
    return state.stack.areTechnologiesFetching
}




