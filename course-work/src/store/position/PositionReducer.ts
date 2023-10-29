import type {InferActionsTypes} from '../store';
import type {ApplicationType, CreateUpdatePositionType, 
    IntershipPositionDtoType,
    LanguageType,
    StackType,
    TechnologyType
} from '../../utils/types/types';
import { companyServiceAPI } from '../../api/company-service-api';
import { getAllCompanyPositions } from '../positions/PositionsReducer';
import { applicationServiceAPI } from '../../api/intership-application-service-api';
import { stackServiceAPI } from '../../api/stack-service-api';

let initialState = {
    positionInfo: {} as IntershipPositionDtoType,
    positionInfoIsFetching: true as boolean,

    isStudentAppliedAnApplication: true,
    isStudentAppliedAnApplicationFetching: false,

    newPositionTemplate: {
        description: '',
        languageId: null,
        numberOfPlaces: null,
        salaryRange: null,
        stackId: null,
        technologiesIds: [],
        title: ''
    } as CreateUpdatePositionType,
    newPosition: {
        description: '',
        languageId: null,
        numberOfPlaces: null,
        salaryRange: null,
        stackId: null,
        technologiesIds: [],
        title: ''
    } as CreateUpdatePositionType,

    updatedPositionInfoTemplate: {
        description: '',
        languageId: null,
        numberOfPlaces: null,
        salaryRange: null,
        stackId: null,
        technologiesIds: [],
        title: ''
    } as CreateUpdatePositionType,
    updatedPositionInfo: {
        description: '',
        languageId: null,
        numberOfPlaces: null,
        salaryRange: null,
        stackId: null,
        technologiesIds: [],
        title: ''
    } as CreateUpdatePositionType
}

const positionReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITION_INFO':
            return {
                ...state,
                positionInfo: action.positionInfo
            };
        case 'SET_POSITION_INFO_IS_FETCHING':
             return {
                ...state,
                positionInfoIsFetching: action.positionInfoIsFetching
            };
        case 'SET_IS_STUDENT_APPLIED_AN_APPLICATION':
            return {
                ...state,
                isStudentAppliedAnApplication: action.isApplied
            };
        case 'SET_IS_STUDENT_APPLIED_AN_APPLICATION_FETCHING':
            return {
                ...state,
                isStudentAppliedAnApplicationFetching: action.isFetching
            };
        case 'SET_NEW_POSITION':
            return {
                ...state,
                newPosition: action.newPosition
            };
        case 'CLEAR_NEW_POSITION':
            return {
                ...state,
                newPosition: {
                    description: '',
                    languageId: null,
                    numberOfPlaces: null,
                    salaryRange: null,
                    stackId: null,
                    technologiesIds: [],
                    title: ''
                }
            };
        case 'SET_UPDATED_POSITION_INFO':
            return {
                ...state,
                updatedPositionInfo: action.newInfoAboutPosition
            };
        case 'SET_UPDATED_POSITION_INFO_TEMPLATE':
            return {
                ...state,
                updatedPositionInfoTemplate: action.newInfoAboutPosition
            };
        case 'CLEAR_UPDATED_POSITION_INFO':
            return {
                ...state,
                updatedPositionInfo : {
                    description: '',
                    languageId: null,
                    numberOfPlaces: null,
                    salaryRange: null,
                    stackId: null,
                    technologiesIds: [],
                    title: ''
                }
            }
        default:
            return state;
    }
}

// ACTIONS
export const setPositionInfo = (positionInfo: IntershipPositionDtoType) => {
    return {
        type: 'SET_POSITION_INFO',
        positionInfo: positionInfo
    }
}
export const setPositionInfoIsFetching = (isFetching: boolean) => {
    return {
        type: 'SET_POSITION_INFO_IS_FETCHING',
        positionInfoIsFetching: isFetching
    }
}
export const setIsStudentAppliedAnApplication = (isApplied: boolean) => {
    return {
        type: 'SET_IS_STUDENT_APPLIED_AN_APPLICATION',
        isApplied
    }
}
export const setIsStudentAppliedAnApplicationFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_STUDENT_APPLIED_AN_APPLICATION_FETCHING',
        isFetching
    }
}
export const setNewPosition = (newPosition: CreateUpdatePositionType) => {
    return {
        type: 'SET_NEW_POSITION',
        newPosition: newPosition
    }
}
export const clearNewPosition = () => {
    return {type: 'CLEAR_NEW_POSITION'}
}
export const setUpdatedPositionInfo = (newInfoAboutPosition: CreateUpdatePositionType) => {
    return {
        type: 'SET_UPDATED_POSITION_INFO',
        newInfoAboutPosition: newInfoAboutPosition
    }
}
export const setUpdatedPositionInfoTemplate = (newInfoAboutPosition: CreateUpdatePositionType) => {
    return {
        type: 'SET_UPDATED_POSITION_INFO_TEMPLATE',
        newInfoAboutPosition: newInfoAboutPosition
    }
}
export const clearUpdatedPositionInfo = () => {
    return {type: 'CLEAR_UPDATED_POSITION_INFO'}
}

// THUNKS
const getLanguageIdPromise = (currentLanguageVal: string | null) => {
    if (currentLanguageVal !== null && currentLanguageVal !== "") {
        return stackServiceAPI.getAllLanguages()
                .then((languages) => {
                    let languageWithId = languages.filter((language: LanguageType) => language.name === currentLanguageVal)
                    return languageWithId[0].id
                })
    } else
        return -1
}
const getStackIdPromise = (currentStackVal: string | null) => {
    if (currentStackVal !== null && currentStackVal !== "") {
        return stackServiceAPI.getAllStacks()
                .then((stacks) => {
                    let stackWithId = stacks.filter((stack: StackType) => stack.name === currentStackVal)
                    return stackWithId[0].id
                })
    } else
        return -1
}
function contains(techNames: Array<string>, currentTechName: string) {
    for (var i = 0; i < techNames.length; i++) {
        if (techNames[i] === currentTechName) {
            return true;
        }
    }
    return false;
}
const getTechnologiesIdsPromise = (currentTechnologiesVals: Array<string>) => {
    if (currentTechnologiesVals.length !== 0) {
        return stackServiceAPI.getAllTechnologies()
                .then((technologies) => {
                    let technologiesWithId = technologies.filter(
                        (technology: TechnologyType) => contains(currentTechnologiesVals, technology.name))
                    return technologiesWithId.map((e: TechnologyType) => e.id)
                })
    } else
        return -1
}
export const getPositionInfo = (positionId: string) => (dispatch: any, getState: any) => {
    const updatedPositionInfoTemplate = getState().position.updatedPositionInfoTemplate

    let languageId: string | number| null = null
    let stackId: string | number| null = null
    let technologiesIds: Array<number> = []

    dispatch(setPositionInfoIsFetching(true))
    companyServiceAPI.getPositionById(positionId)
        .then(data => {
            dispatch(setPositionInfo(data))
            return data
        })
        .then(data => {
            Promise.all([
                getLanguageIdPromise(data.language),
                getStackIdPromise(data.stack),
                getTechnologiesIdsPromise(data.technologies)
            ])
            .then((values) => {
                languageId = values[0] === -1 ? null : values[0]
                stackId = values[1] === -1 ? null : values[1]
                technologiesIds = values[2] === -1 ? [] : values[2]
                dispatch(setUpdatedPositionInfoTemplate({
                    description: data.description,
                    languageId: languageId,
                    numberOfPlaces: data.numberOfPlaces,
                    salaryRange: data.salaryRange,
                    stackId: stackId,
                    technologiesIds: technologiesIds,
                    title: data.title
                }))
                dispatch(setUpdatedPositionInfo({
                    ...updatedPositionInfoTemplate
                }))
                dispatch(setPositionInfoIsFetching(false))
            })
        })
}
export const createNewPosition = () => (dispatch: any, getState: any) => {
    const companyId = getState().auth.user.companyId
    const newPosition = getState().position.newPosition
    companyServiceAPI.createPosition (
        companyId, newPosition.description, newPosition.languageId, 
        newPosition.numberOfPlaces, newPosition.salaryRange, newPosition.stackId, 
        newPosition.title, newPosition.technologiesIds
    )
    .then(() => {
        dispatch(getAllCompanyPositions(companyId))
    })
}
export const deletePosition = () => (dispatch: any, getState: any) => {
    const positionId = getState().position.positionInfo.id
    console.log(positionId)
    companyServiceAPI.deletePosition(positionId)
}
export const updatePositionInfo = () => (dispatch: any, getState: any) => {
    const positionId = getState().position.positionInfo.id
    const companyId = getState().auth.user.companyId
    const updatedPosition = getState().position.updatedPositionInfo
    companyServiceAPI.editPosition(
        positionId, companyId, updatedPosition.description, updatedPosition.languageId,
        updatedPosition.numberOfPlaces , updatedPosition.salaryRange, updatedPosition.stackId,
        updatedPosition.title, updatedPosition.technologiesIds)
        .then(() => {
            dispatch(clearUpdatedPositionInfo())
            dispatch(getPositionInfo(positionId))     
        })
}

export const findOutIsStudentAppliedAnApplication = (positionId: string) => (dispatch: any, getState: any) => {
    const studentId = getState().auth.user.userId
    let isApplied = false
    dispatch(setIsStudentAppliedAnApplicationFetching(true))
    applicationServiceAPI.getAllApplicationsByPositionId(positionId)
        .then(applications => {
            let filteredApplications = applications.filter((application: ApplicationType) => application.studentId === studentId)
            isApplied = filteredApplications.length === 0 ? false : true
            dispatch(setIsStudentAppliedAnApplication(isApplied))
            dispatch(setIsStudentAppliedAnApplicationFetching(false))
        })
}

export const createApplicationForPosition = () => (dispatch: any, getState: any) => {
    const positionId = getState().position.positionInfo.id
    applicationServiceAPI.createApplication(positionId)
        .then(data => {
            dispatch(setIsStudentAppliedAnApplication(true))
        })
}


export type InitialStateType = typeof initialState

export default positionReducer;