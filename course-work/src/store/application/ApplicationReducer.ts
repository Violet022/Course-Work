import { applicationServiceAPI } from "../../api/intership-application-service-api";
import { userServiceAPI } from "../../api/user-service-api";
import {
    ApplicationType,
    CreateUpdateInterviewType,
    StudentApplicationInfoType
} from "../../utils/types/types";
import { GetStateType } from "../store";

let initialState = {
    applicationInfo: {} as ApplicationType,
    isApplicationInfoFetching: false as boolean,

    studentApplicationInfo: {} as StudentApplicationInfoType,
    isStudentApplicationInfoFetching: false as boolean,

    newInterviewTemplate : {
        date: '',
        location: ''
    } as CreateUpdateInterviewType,
    newInterview: {
        date: '',
        location: ''
    } as CreateUpdateInterviewType 
};

const applicationReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_APPLICATION_INFO':
            return {
                ...state,
                applicationInfo: action.application
            };
        case 'SET_IS_APPLICATION_INFO_FETCHING':
            return {
                ...state,
                isApplicationInfoFetching: action.isFetching
            };
        case 'SET_STUDENT_APPLICATION_INFO':
            return {
                ...state,
                studentApplicationInfo: action.studentApplication
            };
        case 'SET_IS_STUDENT_APPLICATION_INFO_FETCHING':
            return {
                ...state,
                isStudentApplicationInfoFetching: action.isFetching
            };
        case 'SET_NEW_INTERVIEW':
            return {
                ...state,
                newInterview: action.interview
            };
        case 'CLEAR_NEW_INTERVIEW':
            return {
                ...state,
                newInterview: {
                    date: '',
                    location: ''
                }
            };
        default:
            return state;
    }
}

// ACTIONS
export const setApplicationInfo = (application: ApplicationType) => {
    return {
        type: 'SET_APPLICATION_INFO',
        application }
};
export const setIsApplicationInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_APPLICATION_INFO_FETCHING',
        isFetching }
};
export const setStudentApplicationInfo = (studentApplication: StudentApplicationInfoType) => {
    return {
        type: 'SET_STUDENT_APPLICATION_INFO',
        studentApplication }
};
export const setIsStudentApplicationInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_STUDENT_APPLICATION_INFO_FETCHING',
        isFetching }
};
export const setNewInterview = (interview: CreateUpdateInterviewType) => {
    return {
        type: 'SET_NEW_INTERVIEW',
        interview }
};
export const clearNewInterview = () => {
    return {type: 'CLEAR_NEW_INTERVIEW'}
};

// THUNKS
export const getApplicationAndStudentInfo = (applicationId: string) => (dispatch: any) => {
    dispatch(setIsApplicationInfoFetching(true))
    applicationServiceAPI.getApplicationById(applicationId)
    .then((data) => {
        dispatch(setApplicationInfo(data))
        Promise.all([
            applicationServiceAPI.getStudentProfileById(data.studentId),
            userServiceAPI.getUserById(data.studentId)
        ])
        .then((result) => {
            const [studentProfileInfo, commonStudentInfo] = result
            dispatch(setStudentApplicationInfo({
                studentId: data.studentId,
                fio: `${commonStudentInfo.lastName} ${commonStudentInfo.firstName} ${commonStudentInfo.patronym === null ? '' : commonStudentInfo.patronym}`,
                languages: studentProfileInfo.languages,
                technologies: studentProfileInfo.technologies,
                resume: studentProfileInfo.resume
            }))
            dispatch(setIsApplicationInfoFetching(false))
        })
    })
}

export const acceptOrRejectOffer = (action: 'OFFER_ACCEPTED' | 'OFFER_REJECTED') => (dispatch: any, getState: GetStateType) => {
    const applicationId = getState().application.applicationInfo.id
    const studentId = getState().auth.user.userId
    applicationServiceAPI.addStatusToApplication(applicationId, action)
        .then(updatedApplication => {
            dispatch(setApplicationInfo(updatedApplication))
            if(action === 'OFFER_ACCEPTED') {
                applicationServiceAPI.getStudentProfileById(studentId)
                .then(studentProfile => {
                    let applicationsWAITING_FOR_STUDENT_ANSWER = studentProfile.applications.filter((application: ApplicationType) =>
                        application.statusHistory[application.statusHistory.length - 1].status === 'Ожидается ответ от студента'
                    )
                    Promise.all(applicationsWAITING_FOR_STUDENT_ANSWER.map((app: ApplicationType) => {
                        return applicationServiceAPI.addStatusToApplication(app.id, 'OFFER_REJECTED')
                    }))
                })
            }
        })
}

export const giveAnswerToStudentAfterInterview = (action: 'OFFER_ISSUED' | 'REJECTED') => (dispatch: any, getState:  GetStateType) => {
    const applicationId = getState().application.applicationInfo.id
    applicationServiceAPI.addStatusToApplication(applicationId, action)
        .then((response) => {
            if(action === 'OFFER_ISSUED') {
                applicationServiceAPI.addStatusToApplication(applicationId, 'WAITING_FOR_STUDENT_ANSWER')
                .then(() => {
                    dispatch(getApplicationAndStudentInfo(applicationId))
                })
            }
            dispatch(getApplicationAndStudentInfo(applicationId))
        })
}

export const sheduleAnInterview = () =>(dispatch: any, getState: GetStateType) => {
    const applicationId = getState().application.applicationInfo.id
    const interview = getState().application.newInterview
    applicationServiceAPI.createApplicationInterview(applicationId, interview.date, interview.location)
        .then((response) => {
            applicationServiceAPI.addStatusToApplication(applicationId, 'WAITING_FOR_COMPANY_ANSWER')
            .then(() => {
                dispatch(clearNewInterview())
                dispatch(getApplicationAndStudentInfo(applicationId))
            })
        })
}

export type InitialStateType = typeof initialState

export default applicationReducer;