import type {AppStateType, GetStateType} from '../store';
import type {
    CreateIntershipPositionType, 
    IntershipPositionDtoType,
    IntershipPositionWithApplicationsType, 
} from '../../utils/types/types';
import { companyServiceAPI } from '../../api/company-service-api';
import { applicationServiceAPI } from '../../api/intership-application-service-api';
import { userServiceAPI } from '../../api/user-service-api';

let initialState = {
    positions: [] as Array<IntershipPositionDtoType>,
    arePositionsFetching: false as boolean,
    newPosition: {
        companyId: null,
        description: '',
        languageId: null,
        numberOfPlaces: null,
        salaryRange: null,
        stackId: null,
        technologiesIds: [],
        title: ''
    } as CreateIntershipPositionType,

    positionsWithApplications: [] as Array<IntershipPositionWithApplicationsType>,
    arePositionsWithApplicationsFetching: false as boolean
}
const positionsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_POSITIONS':
            return {
                ...state,
                positions : action.positions
            };
        case 'SET_ARE_POSITIONS_FETCHING':
            return {
                ...state,
                arePositionsFetching : action.areFetching
            };
        case 'SET_NEW_POSITION_DATA':
            return {
                ...state,
                newPosition : action.payload
            };
        case 'CLEAR_NEW_POSITION_DATA':
            return {
                ...state,
                newPosition : {
                    companyId: null,
                    description: '',
                    languageId: null,
                    numberOfPlaces: null,
                    salaryRange: null,
                    stackId: null,
                    technologiesIds: [],
                    title: ''
                }
            };
        case 'SET_POSITIONS_WITH_APPLICATIONS':
            return {
                ...state,
                positionsWithApplications : action.positionsWithApplications
            };
        case 'SET_ARE_POSITIONS_WITH_APPLICATIONS_FETCHING':
            return {
                ...state,
                arePositionsWithApplicationsFetching : action.areFetching
            };
        default:
            return state;
    }
}

// ACTIONS
export const setPositions = (positions: Array<IntershipPositionDtoType>) => {
    return {
        type: 'SET_POSITIONS', 
        positions
    }
}
export const setArePositionsFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_POSITIONS_FETCHING', 
        areFetching
    }
}
export const setNewPositionData = (newPosition: CreateIntershipPositionType) => {
    return {
        type: 'SET_NEW_POSITION_DATA',
        payload: newPosition
    }
}
export const clearNewPositionData = () => {
    return {
        type: 'CLEAR_NEW_POSITION_DATA'
    }
}
export const setPositionsWithApplications = (positionsWithApplications: Array<IntershipPositionWithApplicationsType>) => {
    return {
        type: 'SET_POSITIONS_WITH_APPLICATIONS', 
        positionsWithApplications
    }
}
export const setArePositionsWithApplicationsFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_POSITIONS_WITH_APPLICATIONS_FETCHING', 
        areFetching
    }
}

// THUNKS
export const getAllPositions = () => (dispatch: any) => {
    dispatch(setArePositionsFetching(true))
    companyServiceAPI.getAllPositions()
        .then(data => {
            dispatch(setPositions(data))
            dispatch(setArePositionsFetching(false))
        })
}

export const getAllCompanyPositions = (companyId: string | null) => (dispatch: any) => {
    dispatch(setArePositionsFetching(true))
    companyServiceAPI.getCompanyById(companyId)
        .then(data => {
            dispatch(setPositions(data.positions))
            dispatch(setArePositionsFetching(false))
        })

}

export const getAllCuratorPositions = () => (dispatch: any, getState: GetStateType) => {
    const curatorCompanyIds = getState().auth.additionalCuratorInfo.companies.map(company => company.id)
    const curatorCompaniesPositions: Array<IntershipPositionDtoType> = []
    dispatch(setArePositionsFetching(true))
    Promise.all(curatorCompanyIds.map(curatorCompanyId => {
        return companyServiceAPI.getCompanyById(curatorCompanyId)
            .then(companyInfo => {
                curatorCompaniesPositions.push(...companyInfo.positions)
            })
    }))
    .then(() => {
        dispatch(setPositions(curatorCompaniesPositions))
        dispatch(setArePositionsFetching(false))
    })
}

const connectPositionAndApplication = async (positions: any) => {
    await Promise.all(positions.map((position: any) => {
        position.applications = []
        if(position.numberOfApplications !== 0) {
            return applicationServiceAPI.getAllApplicationsByPositionId(position.id)
                .then((applications) => {
                    return Promise.all(applications.map((application: any) => {
                        return userServiceAPI.getUserById(application.studentId)
                        .then((studentInfo) => {
                            position.applications.push({
                                studentId: studentInfo.userId,
                                applicationId: application.id,
                                fio: `${studentInfo.lastName} ${studentInfo.firstName} ${studentInfo.patronym === null ? '' : studentInfo.patronym}`,
                                groupNumber: studentInfo.groupNumber,
                                statusHistory: application.statusHistory
                            })
                        })
                    }))
                })
        }
    }))

    return positions;
}
export const getAllCompanyPositionsWithApplicationsWithStudentInfo = (companyId: string | null) => (dispatch: any) => {
    dispatch(setArePositionsWithApplicationsFetching(true))
    companyServiceAPI.getCompanyById(companyId)
        .then(data => {
            connectPositionAndApplication(data.positions)
            .then(positionsWithApplicationsAndStudents => {
                dispatch(setPositionsWithApplications(positionsWithApplicationsAndStudents))
                dispatch(setArePositionsWithApplicationsFetching(false))
            })
        })
}

export type InitialStateType = typeof initialState

export default positionsReducer;


