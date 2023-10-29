import { getUserDataByTokenWhileInitializing } from '../authentication/AuthReducer';
import {InferActionsTypes} from '../store';

let initialState = {
    initialized: false as boolean,
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    if (localStorage.getItem('token') === null)
        localStorage.setItem('token', '')
    
    if (localStorage.getItem('token') !== '') {
        let promise = dispatch(getUserDataByTokenWhileInitializing());

        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            });
    }
    else 
        dispatch(actions.initializedSuccess())
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default appReducer;
