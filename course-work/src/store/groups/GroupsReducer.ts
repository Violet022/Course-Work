import type { CreateUpdateGroupType} from '../../utils/types/types';
import { userServiceAPI } from '../../api/user-service-api';
import { GetStateType } from '../store';

let initialState = {
    newGroup: {
        groupNumber: ''
    } as CreateUpdateGroupType,
}

const groupsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_NEW_GROUP':
            return {
                ...state,
                newGroup: action.newGroup
            };
        case 'CLEAR_NEW_GROUP':
            return {
                ...state,
                newGroup: {
                    groupNumber: ''
                }
            };
        default:
            return state;
    }
}

// ACTIONS
export const setNewGroup = (newGroup: CreateUpdateGroupType) => {
    return {
        type: 'SET_NEW_GROUP',
        newGroup: newGroup
    }
}
export const clearNewGroup = () => {
    return {type: 'CLEAR_NEW_GROUP'}
}

// THUNKS
export const createNewGroup = () => (dispatch: any, getState: GetStateType) => {
    const newGroup = getState().groups.newGroup
    userServiceAPI.createGroup(newGroup.groupNumber)
        .then(() => dispatch(clearNewGroup()))
}

export type InitialStateType = typeof initialState

export default groupsReducer;