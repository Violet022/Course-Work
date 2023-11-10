import type {ApplicationPriorityType, ApplicationType, ApplicationTypeWithStudentInfo, IntershipPositionDtoType, StudentProfileType} from '../../utils/types/types'
import { applicationServiceAPI } from '../../api/intership-application-service-api';
import { userServiceAPI } from '../../api/user-service-api';
import { companyServiceAPI } from '../../api/company-service-api';
import { AppStateType, GetStateType } from '../store';

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

export const getStudentApplications = (id: string = 'none') => (dispatch: any, getState: GetStateType) => {
    let studentId = id === 'none' ? getState().auth.user.userId : id
    dispatch(setAreApplicationsFetching(true))
    
    applicationServiceAPI.getStudentProfileById(studentId)
        .then(data => {
            dispatch(setApplications(data.applications))
            dispatch(setAreApplicationsFetching(false))
        })
}
export const getStudentCuratorCompaniesApplications = (studentId: string) => (dispatch: any, getState: GetStateType) => {
    const curatorCompaniesIds = getState().auth.additionalCuratorInfo.companies.map(company => company.id)

    dispatch(setAreApplicationsFetching(true))
    applicationServiceAPI.getStudentProfileById(studentId)
        .then(data => {
            dispatch(setApplications(data.applications.filter((application: ApplicationType) => curatorCompaniesIds.indexOf(application.companyId) !== -1)))
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

const getCompanyApplicationsWithStudentInfoByCompanyId = (companyId: string | null) => {
    return companyServiceAPI.getCompanyById(companyId)
        .then(companyInfo => {
            return companyInfo.positions.map((companyPosition: IntershipPositionDtoType) => companyPosition.id)
        })
        .then(async (companyPositionsIds) => {
            let companyApplications: Array<ApplicationType> = []
            await Promise.all(companyPositionsIds.map((companyPositionId: string) => {
                return applicationServiceAPI.getAllApplicationsByPositionId(companyPositionId)
                        .then(data => companyApplications = [...companyApplications, ...data])
            }))
            return companyApplications
        })
        .then(async companyApplications => {
            let applicationsWithStudentData = await connectApplicationAndStudent(companyApplications)
            return applicationsWithStudentData
        })
}

export const getCompanyApplications = () => (dispatch: any, getState: GetStateType) => {
    const companyId = getState().auth.user.companyId
    dispatch(setAreApplicationsFetching(true))

    getCompanyApplicationsWithStudentInfoByCompanyId(companyId)
        .then(applicationsWithStudentData => {
            dispatch(setApplicationsWithStudentInfo(applicationsWithStudentData))
            dispatch(setAreApplicationsFetching(false))
        })
}

export const getCuratorCompaniesApplications = () => (dispatch: any, getState: GetStateType) => {
    const curatorCompaniesIds = getState().auth.additionalCuratorInfo.companies.map(company => company.id)
    let curatorCompaniesApplications: Array<ApplicationTypeWithStudentInfo> = []
    dispatch(setAreApplicationsFetching(true))
    
    Promise.all(curatorCompaniesIds.map(curatorCompaniesId => {
        return getCompanyApplicationsWithStudentInfoByCompanyId(curatorCompaniesId)
            .then(applicationsWithStudentData => {
                curatorCompaniesApplications = [...curatorCompaniesApplications, ...applicationsWithStudentData]
            })
    }))
    .then(() => {
        dispatch(setApplicationsWithStudentInfo(curatorCompaniesApplications))
        dispatch(setAreApplicationsFetching(false))
    })
}

export const getStudentCompanyApplications = (studentId: string) => (dispatch: any, getState: GetStateType) => {
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

export const updatePriorities = (positionId: string, applicationIds: Array<string>) => (dispatch: any) => {
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