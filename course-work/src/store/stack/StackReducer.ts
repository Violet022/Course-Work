import { stackServiceAPI } from "../../api/stack-service-api";
import { StackType, LanguageType, TechnologyType } from "../../utils/types/types";

let initialState = {
    stacks: [] as Array<StackType>,
    areStacksFetching: false as boolean,

    languages: [] as Array<LanguageType>,
    areLanguagesFetching: false as boolean,

    technologies: [] as Array<TechnologyType>,
    areTechnologiesFetching: false as boolean,
};

const stackReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_STACKS':
            return {
                ...state,
                stacks: action.stacks
            };
        case 'SET_ARE_STACKS_FETCHING':
            return {
                ...state,
                areStacksFetching: action.areFetching
            };
        case 'SET_LANGUAGES':
            return {
                ...state,
                languages: action.languages
            };
        case 'SET_ARE_LANGUAGES_FETCHING':
            return {
                ...state,
                areLanguagesFetching: action.areFetching
            };
        case 'SET_TECHNOLOGIES':
            return {
                ...state,
                technologies: action.technologies
            };
        case 'SET_ARE_TECHNOLOGIES_FETCHING':
            return {
                ...state,
                areTechnologiesFetching: action.areFetching
            };
        default:
            return state;
    }
}

export const setStacks = (stacks: Array<StackType>) => {
    return {
        type: 'SET_STACKS',
        stacks }
};
export const setAreStacksFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_STACKS_FETCHING',
        areFetching }
};
export const setLanguages = (languages: Array<LanguageType>) => {
    return {
        type: 'SET_LANGUAGES',
        languages }
};
export const setAreLanguagesFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_LANGUAGES_FETCHING',
        areFetching }
};
export const setTechnologies = (technologies: Array<StackType>) => {
    return {
        type: 'SET_TECHNOLOGIES',
        technologies }
};
export const setAreTechnologiesFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_TECHNOLOGIES_FETCHING',
        areFetching }
};

export const getAllStacks = () => (dispatch: any) => {
    dispatch(setAreStacksFetching(true))
    stackServiceAPI.getAllStacks()
        .then(data => {
            dispatch(setStacks(data))
            dispatch(setAreStacksFetching(false))
        })
}

export const getAllLanguages = () => (dispatch: any) => {
    dispatch(setAreLanguagesFetching(true))
    stackServiceAPI.getAllLanguages()
        .then(data => {
            dispatch(setLanguages(data))
            dispatch(setAreLanguagesFetching(false))
        })
}

export const getAllTechnologies = () => (dispatch: any) => {
    dispatch(setAreTechnologiesFetching(true))
    stackServiceAPI.getAllTechnologies()
        .then(data => {
            dispatch(setTechnologies(data))
            dispatch(setAreTechnologiesFetching(false))
        })
}

export type InitialStateType = typeof initialState

export default stackReducer;
