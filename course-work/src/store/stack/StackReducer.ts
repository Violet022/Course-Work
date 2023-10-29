import { stackServiceAPI } from "../../api/stack-service-api";
import { StackType, LanguageType, TechnologyType } from "../../utils/types/types";

let initialState = {
    stacks: [] as Array<StackType>,
    languages: [] as Array<LanguageType>,
    technologies: [] as Array<TechnologyType>,
    isSLTFetching: false as boolean
};

const stackReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_STACKS':
            return {
                ...state,
                stacks: action.stacks
            };
        case 'SET_LANGUAGES':
            return {
                ...state,
                languages: action.languages
            };
        case 'SET_TECHNOLOGIES':
            return {
                ...state,
                technologies: action.technologies
            };
        case 'SET_IS_SLT_FETCHING':
            return {
                ...state,
                isSLTFetching: action.areFetching
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
export const setLanguages = (languages: Array<LanguageType>) => {
    return {
        type: 'SET_LANGUAGES',
        languages }
};
export const setTechnologies = (technologies: Array<StackType>) => {
    return {
        type: 'SET_TECHNOLOGIES',
        technologies }
};
export const setIsSLTFetching = (areFetching: boolean) => {
    return {
        type: 'SET_IS_SLT_FETCHING',
        areFetching }
};

export const getStacksLanguagesAndTechnologies = () => (dispatch: any) => {
    dispatch(setIsSLTFetching(true))
    Promise.all([
        stackServiceAPI.getAllStacks().then(data => dispatch(setStacks(data))),
        stackServiceAPI.getAllLanguages().then(data => dispatch(setLanguages(data))),
        stackServiceAPI.getAllTechnologies().then(data => dispatch(setTechnologies(data)))
    ])
    .then(() => {
        dispatch(setIsSLTFetching(false))
    })
}

export type InitialStateType = typeof initialState

export default stackReducer;
