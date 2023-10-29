import type {ApplicationPriorityType, ApplicationType, ApplicationTypeWithStudentInfo, IntershipPositionDtoType, StudentProfileType} from '../../utils/types/types'
import { applicationServiceAPI } from '../../api/intership-application-service-api';
import { userServiceAPI } from '../../api/user-service-api';
import { companyServiceAPI } from '../../api/company-service-api';

let initialState = {
    applications: [] as Array<ApplicationType>,
    applicationsWithStudentInfo: [] as Array<ApplicationTypeWithStudentInfo>,
    areApplicationsFetching: false as boolean
}

const applicationsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                ...state,
                applications: action.applications
            };
        case 'SET_APPLICATIONS_WITH_STUDENT_INFO':
            return {
                ...state,
                applicationsWithStudentInfo: action.applications
            };
        case 'SET_ARE_APPLICATIONS_FETCHING':
            return {
                ...state,
                areApplicationsFetching: action.areFetching
            };
        default:
            return state;
    }
}

export const setApplications = (applications: Array<ApplicationType>) => {
    return {
        type: 'SET_APPLICATIONS', 
        applications: applications
    }
}
export const setApplicationsWithStudentInfo = (applications: Array<ApplicationTypeWithStudentInfo>) => {
    return {
        type: 'SET_APPLICATIONS_WITH_STUDENT_INFO', 
        applications: applications
    }
}
export const setAreApplicationsFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_APPLICATIONS_FETCHING', 
        areFetching
    }
}

const connectApplicationAndStudent = async (applications: any) => {
    await Promise.all(applications.map((application: any) => {
        return userServiceAPI.getUserById(application.studentId)
        .then((data) => {
            let patronym = data.patronym === null ? '' : data.patronym
            application.fio = `${data.lastName} ${data.firstName} ${patronym}`
            application.groupNumber = data.groupNumber

        })
    }))

    return applications;
}

export const getStudentApplications = (id: string = 'none') => (dispatch: any, getState: any) => {
    let studentId = id === 'none' ? getState().auth.user.userId : id
    dispatch(setAreApplicationsFetching(true))
    
    applicationServiceAPI.getStudentProfileById(studentId)
        .then(data => {
            dispatch(setApplications(data.applications))
            dispatch(setAreApplicationsFetching(false))
        })
}

export const getPositionApplications = (positionId: string) => (dispatch: any) => {
    dispatch(setAreApplicationsFetching(true))
    applicationServiceAPI.getAllApplicationsByPositionId(positionId)
        .then((data) => {
            connectApplicationAndStudent(data)
            .then(applicationsWithStudentData => {
                dispatch(setApplicationsWithStudentInfo(applicationsWithStudentData))
                dispatch(setAreApplicationsFetching(false))
            })
            
        })
}

export const getCompanyApplications = () => (dispatch: any, getState: any) => {
    const companyId = getState().auth.user.companyId
    dispatch(setAreApplicationsFetching(true))
    companyServiceAPI.getCompanyById(companyId)
    .then(companyInfo => {
        let companyPositions = companyInfo.positions
        return companyPositions.map((companyPosition: IntershipPositionDtoType) => companyPosition.id)
    })
    .then((companyPositionsIds) => {
        let companyApplications: Array<ApplicationType> = []
        Promise.all(companyPositionsIds.map((companyPositionId: string) => {
            return applicationServiceAPI.getAllApplicationsByPositionId(companyPositionId)
            .then(data => companyApplications = [...companyApplications, ...data])
        }))
        .then(() => {
            connectApplicationAndStudent(companyApplications)
            .then(applicationsWithStudentData => {
                console.log(applicationsWithStudentData)
                dispatch(setApplicationsWithStudentInfo(applicationsWithStudentData))
                dispatch(setAreApplicationsFetching(false))
            })
        })

    })
}

export const getStudentCompanyApplications = (studentId: string) => (dispatch: any, getState: any) => {
    const companyId = getState().auth.user.companyId
    companyServiceAPI.getPositionsByCompanyId(companyId)
        .then(companyPositions => {
            applicationServiceAPI.getStudentProfileById(studentId)
                .then((studentProfile: StudentProfileType) => {
                    let studentCompanyApplications = studentProfile.applications.filter(application => companyPositions.indexOf(application.positionId) !== -1)
                    connectApplicationAndStudent(studentCompanyApplications)
                    .then(applicationsWithStudentData => {
                        dispatch(setApplicationsWithStudentInfo(applicationsWithStudentData))
                        dispatch(setAreApplicationsFetching(false))
                    })

                })
        })
}

export const updatePriorities = (positionId: string, applicationIds: Array<string>) => (dispatch: any, getState: any) => {
    let positionApplicationsPriorities: Array<ApplicationPriorityType> = []
    positionApplicationsPriorities = applicationIds.map((id, index) => {
        return {
            applicationId: id,
            priority: Number(index + 1)
        }
    })
    applicationServiceAPI.updatePositionApplicationsPriorities(positionId, positionApplicationsPriorities)
        .then(() => {
            dispatch(getPositionApplications(positionId))
        })
}

export type InitialStateType = typeof initialState

export default applicationsReducer;