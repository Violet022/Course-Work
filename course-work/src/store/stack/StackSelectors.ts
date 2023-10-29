import {AppStateType} from '../store'

export const selectIsSLTFetching = (state: AppStateType) => {
    return state.stack.isSLTFetching
}

export const selectStacksLanguagesAndTechnologies = (state: AppStateType) => {
    return {
        stacks: state.stack.stacks,
        languages: state.stack.languages,
        technologies: state.stack.technologies
    }
}

export const selectAllStacks = (state: AppStateType) => {
    return state.stack.stacks
}

export const selectAllLanguages = (state: AppStateType) => {
    return state.stack.languages
}

export const selectAllTechnologies = (state: AppStateType) => {
    return state.stack.technologies
}




