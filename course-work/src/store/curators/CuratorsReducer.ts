import type {
    CuratorDtoType,
    CuratorType,
    ShortCuratorType
} from '../../utils/types/types';
import { userServiceAPI } from '../../api/user-service-api';
import { curatorServiceAPI } from '../../api/curator-service-api';

let initialState = {
    curators: [] as Array<CuratorType>,
    areCuratorsFetching: false as boolean
}

const curatorsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_CURATORS':
            return {
                ...state,
                curators : action.curators
            };
        case 'SET_ARE_CURATORS_FETCHING':
            return {
                ...state,
                areCuratorsFetching : action.areFetching
            };
        default:
            return state;
    }
}

// ACTIONS
export const setCurators = (curators: Array<CuratorType>) => {
    return {
        type: 'SET_CURATORS', 
        curators
    }
}
export const setAreCuratorsFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_CURATORS_FETCHING', 
        areFetching
    }
}

// THUNKS
export const getAllCurators = () => (dispatch: any) => {
    let curatorsWithFio: Array<CuratorType> = []
    dispatch(setAreCuratorsFetching(true))
    curatorServiceAPI.getAllCurators()
        .then((curators: Array<CuratorDtoType>) => {
            Promise.all(curators.map((curator: CuratorDtoType) => {
                return userServiceAPI.getUserById(curator.id)
                    .then((user) => {
                        curatorsWithFio.push({
                            ...curator,
                            fio: `${user.lastName} ${user.firstName} ${user.patronym === null ? '' : user.patronym}`
                        })
                    })
            }))
            .then(() => {
                dispatch(setCurators(curatorsWithFio))
                dispatch(setAreCuratorsFetching(false))
            })
        })
}

export const getAllCuratorsShortInfo = async () => {
    let curatorsWithFio: Array<ShortCuratorType> = []
    await curatorServiceAPI.getAllCurators()
        .then((curators: Array<CuratorDtoType>) => {
            return Promise.all(curators.map((curator: CuratorDtoType) => {
                return userServiceAPI.getUserById(curator.id)
                    .then((user) => {
                        curatorsWithFio.push({
                            id: curator.id,
                            name: `${user.lastName} ${user.firstName} ${user.patronym === null ? '' : user.patronym}`
                        })
                    })
            }))
        })
    return curatorsWithFio
}

export const addCompanyToCurator = (curatorId: string, companyIds: Array<string>) => (dispatch: any) => {
    if(companyIds.length !== 0) {
        Promise.all(companyIds.map((companyId: string) => {
            return curatorServiceAPI.addACompanyToCurator(curatorId, companyId)
        }))
        .then(() => {
            dispatch(getAllCurators())
        })
    }
}

export const removeCompanyFromCurator = (curatorId: string, companyId: string) => (dispatch: any) => {
    curatorServiceAPI.removeACompanyFromCurator(curatorId, companyId)
        .then(() => {
            dispatch(getAllCurators())
        })
}

export type InitialStateType = typeof initialState

export default curatorsReducer;