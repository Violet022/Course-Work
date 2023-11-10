import { curatorServiceAPI } from '../../api/curator-service-api';
import { userServiceAPI } from '../../api/user-service-api';
import { setAdditionalCuratorInfo, setIsAuth, setIsAuthSuccess, setUserData } from '../authentication/AuthReducer';
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
        dispatch(setIsAuth(false))
        dispatch(setIsAuthSuccess(false))

        userServiceAPI.getUserByToken()
            .then((userData) => {
                dispatch(setUserData(userData))
                if (userData.role === 'CURATOR') {
                    curatorServiceAPI.getCuratorById(userData.userId)
                        .then((curatorData) => {
                            if(curatorData.companies.length !== 0) {
                                dispatch(setAdditionalCuratorInfo({
                                    isAttachedToCompany: true,
                                    companies: curatorData.companies
                                }))
                            }
                            dispatch(setIsAuthSuccess(true))
                            dispatch(setIsAuth(true))
                            dispatch(actions.initializedSuccess());
                        })
                }
                else {
                    dispatch(setIsAuthSuccess(true))
                    dispatch(setIsAuth(true))
                    dispatch(actions.initializedSuccess());
                }
            });
    }
    else {
        dispatch(actions.initializedSuccess())
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default appReducer;
