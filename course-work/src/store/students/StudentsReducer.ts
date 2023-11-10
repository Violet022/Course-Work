import { companyServiceAPI } from "../../api/company-service-api";
import { applicationServiceAPI } from "../../api/intership-application-service-api";
import { userServiceAPI } from "../../api/user-service-api";
import { 
    StudentWithoutApplicationsType,
    StudentWithApplicationsType, 
    UserType,
    StudentProfileType,
    ApplicationType
} from "../../utils/types/types";
import { AppStateType, GetStateType } from "../store";

let initialState = {
    studentsWithApplicationsArray: [] as Array<StudentWithApplicationsType>,
    studentsWithoutApplicationsArray: [] as Array<StudentWithoutApplicationsType>,
    companyStudents: [] as Array<UserType>,
    areStudentsFetching: false as boolean
};

const studentsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_STUDENTS_WITH_APPLICATIONS_ARRAY':
            return {
                ...state,
                studentsWithApplicationsArray: action.studentsWithApplications
            };
        case 'SET_STUDENTS_WITHOUT_APPLICATIONS_ARRAY':
            return {
                    ...state,
                    studentsWithoutApplicationsArray: action.studentsWithoutApplications
            };
        case 'SET_COMPANY_STUDENTS':
            return {
                ...state,
                companyStudents: action.companyStudents
            };
        case 'SET_ARE_STUDENTS_FETCHING':
            return {
                ...state,
                areStudentsFetching: action.areFetching
            };
        default:
            return state;
    }
}

// ACTION
export const setStudentsWithApplications = (studentsWithApplications: Array<StudentWithApplicationsType>) => {
    return {
        type: 'SET_STUDENTS_WITH_APPLICATIONS_ARRAY',
        studentsWithApplications }
};
export const setStudentsWithoutApplications = (studentsWithoutApplications: Array<StudentWithoutApplicationsType>) => {
    return {
        type: 'SET_STUDENTS_WITHOUT_APPLICATIONS_ARRAY',
        studentsWithoutApplications }
};
export const setCompanyStudents = (companyStudents: Array<UserType>) => {
    return {
        type: 'SET_COMPANY_STUDENTS',
        companyStudents }
};
export const setAreStudentsFetching = (areFetching: boolean) => {
    return {
        type: 'SET_ARE_STUDENTS_FETCHING',
        areFetching }
};

export const getStudentsWithApplications = async () => {
    let studentsWith: Array<StudentWithApplicationsType> = []
    await userServiceAPI.getUserByRole('STUDENT')
        .then((students) => {
            return Promise.all(students.map((student: UserType) => {
                return applicationServiceAPI.getStudentProfileById(student.userId)
                .then((studentProfile: StudentProfileType) => {
                    if(studentProfile.applications.length !== 0) {
                        studentProfile.applications.map((application: ApplicationType) => {
                            return companyServiceAPI.getPositionById(application.positionId)
                            .then(data => {
                                studentsWith.push({
                                    id: student.userId,
                                    fio: `${student.lastName} ${student.firstName} ${student.patronym === null ? '' : student.patronym}`,
                                    groupNumber: String(student.groupNumber),
                                    position: application.position,
                                    priority: application.priority === 0 ? Number.MAX_SAFE_INTEGER : application.priority,
                                    companyName: application.companyName,
                                    statusHistory: application.statusHistory,
                                    stack: data.stack
                                })
                            })
                        })
                    }
                })
            }))
        })
    return studentsWith
}

// THUNKS
export const getStudentArrays = () => (dispatch: any) => {
    dispatch(setAreStudentsFetching(true))
    let studentsWith: Array<StudentWithApplicationsType> = []
    let studentsWithout: Array<StudentWithoutApplicationsType> = []
    userServiceAPI.getUserByRole('STUDENT')
        .then((students) => {
            return Promise.all(students.map((student: UserType) => {
                return applicationServiceAPI.getStudentProfileById(student.userId)
                .then((studentProfile: StudentProfileType) => {
                    if(studentProfile.applications.length !== 0) {
                        studentProfile.applications.map((application: ApplicationType) => {
                            return companyServiceAPI.getPositionById(application.positionId)
                            .then(data => {
                                studentsWith.push({
                                    id: student.userId,
                                    fio: `${student.lastName} ${student.firstName} ${student.patronym === null ? '' : student.patronym}`,
                                    groupNumber: String(student.groupNumber),
                                    position: application.position,
                                    priority: application.priority === 0 ? Number.MAX_SAFE_INTEGER : application.priority,
                                    companyName: application.companyName,
                                    statusHistory: application.statusHistory,
                                    stack: data.stack
                                })
                            })
                        })
                    }
                    else {
                        studentsWithout.push({
                            id: student.userId,
                            fio: `${student.lastName} ${student.firstName} ${student.patronym === null ? '' : student.patronym}`,
                            groupNumber: String(student.groupNumber),
                            stacks: studentProfile.stacks
                        })
                    }
                })
            }))
        })
        .then(() => {
            dispatch(setStudentsWithApplications(studentsWith))
            dispatch(setStudentsWithoutApplications(studentsWithout))
            dispatch(setAreStudentsFetching(false))
        })
}

export const getCuratorCompaniesStudents = () => (dispatch: any, getState: GetStateType) => {
    const curatorCompanyIds = getState().auth.additionalCuratorInfo.companies.map(company => company.id)
    console.log(curatorCompanyIds)
    dispatch(setAreStudentsFetching(true))
    let studentsWith: Array<StudentWithApplicationsType> = []

    Promise.all(curatorCompanyIds.map(curatorCompanyId => {
        return applicationServiceAPI.getStudentsByCompanyId(curatorCompanyId)
        .then((studentProfiles: Array<StudentProfileType>) => {
            studentProfiles.map((studentProfile: StudentProfileType) => {
                console.log(studentProfile.applications)
                let studentCurrentCompanyApplications = studentProfile.applications.filter(application => curatorCompanyIds.indexOf(application.companyId) !== -1)
                console.log(studentCurrentCompanyApplications)
                userServiceAPI.getUserById(studentProfile.id)
                    .then((student: UserType) => {
                        Promise.all(studentCurrentCompanyApplications.map(studentCurrentCompanyApplication => {
                            return applicationServiceAPI.getApplicationById(studentCurrentCompanyApplication.id)
                            .then(application => {
                                companyServiceAPI.getPositionById(application.positionId)
                                .then(position => {
                                    studentsWith.push({
                                        id: studentProfile.id,
                                        fio: `${student.lastName} ${student.firstName} ${student.patronym === null ? '' : student.patronym}`,
                                        groupNumber: String(student.groupNumber),
                                        position: application.position,
                                        priority: application.priority === 0 ? Number.MAX_SAFE_INTEGER : application.priority,
                                        companyName: application.companyName,
                                        statusHistory: application.statusHistory,
                                        stack: position.stack
                                    })
                                })
                            })
                        }))
                    })

            })
        })
    }))
    .then(() => {
        dispatch(setStudentsWithApplications(studentsWith))
        dispatch(setAreStudentsFetching(false))
    })
}

export const getCompanyStudents = () => (dispatch: any, getState: GetStateType) => {
    const companyId = getState().auth.user.companyId
    dispatch(setAreStudentsFetching(true))

    let companyStudents: Array<UserType> = []
    applicationServiceAPI.getStudentsByCompanyId(companyId)
        .then((studentProfiles) => {
            let companyStudentIds: Array<string> = Array.from(new Set(studentProfiles.map((studentProfile: StudentProfileType) => studentProfile.id)))
            return Promise.all(companyStudentIds.map((companyStudentId: string) => {
                return userServiceAPI.getUserById(companyStudentId)
                    .then(data => {
                        companyStudents.push(data)
                    })
            }))
            .then(() => {
                dispatch(setCompanyStudents(companyStudents))
                dispatch(setAreStudentsFetching(false))
            })
        })
}

export type InitialStateType = typeof initialState

export default studentsReducer;