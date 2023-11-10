import { applicationServiceAPI } from "../../api/intership-application-service-api";
import { userServiceAPI } from "../../api/user-service-api";
import {
    UserType,
    UpdateUserType,
    CompanyDtoType,
    AdditionalStudentInformationType,
} from "../../utils/types/types";
import { GetStateType } from "../store";

let initialState = {
    profileInfo: {} as UserType,
    updatedProfileInfo: {
        email: '',
        firstName: '',
        lastName: '',
        patronym: ''
    } as UpdateUserType,
    isProfileInfoFetching: false as boolean,

    companyInfo: {} as CompanyDtoType,
    isCompanyInfoFetching: false as boolean,

    additionalStudentInfo: {} as AdditionalStudentInformationType,
    updatedAdditionalStudentInfo: {
        languages: [],
        stacks: [],
        resume: '',
        technologies: []
    } as AdditionalStudentInformationType,
    isAdditionalStudentInfoFetching: false as boolean,
};

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_PROFILE_INFO':
            return {
                ...state,
                profileInfo: action.profileInfo
            };
        case 'SET_UPDATED_PROFILE_INFO':
            return {
                ...state,
                updatedProfileInfo: action.updatedProfileInfo
            };
        case 'CLEAR_UPDATED_PROFILE_INFO':
            return {
                ...state,
                updatedProfileInfo: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    patronym: ''
                }
            };
        case 'SET_IS_PROFILE_INFO_FETCHING':
            return {
                ...state,
                isProfileInfoFetching: action.isFetching
            };
        case 'SET_COMPANY_INFO':
            return {
                ...state,
                companyInfo: action.companyInfo
            };
        case 'SET_IS_COMPANY_INFO_FETCHING':
            return {
                ...state,
                isCompanyInfoFetching: action.isFetching
            };
        case 'SET_ADDITIONAL_STUDENT_INFO':
            return {
                ...state,
                additionalStudentInfo: action.additionalStudentInfo
            };
        case 'SET_UPDATED_ADDITIONAL_STUDENT_INFO':
                return {
                    ...state,
                    updatedAdditionalStudentInfo: action.updatedadditionalStudentInfo
                };
        case 'CLEAR_UPDATED_ADDITIONAL_STUDENT_INFO':
            return {
                ...state,
                updatedAdditionalStudentInfo: {
                    languages: [],
                    stacks: [],
                    resume: '',
                    technologies: []
                }
            };
        case 'SET_IS_ADDITIONAL_STUDENT_INFO_FETCHING':
            return {
                ...state,
                isAdditionalStudentInfoFetching: action.isFetching
            };
        default:
            return state;
    }
}

// ACTIONS
export const setProfileInfo = (profileInfo: UserType) => {
    return {
        type: 'SET_PROFILE_INFO',
        profileInfo }
};
export const setUpdatedProfileInfo = (updatedProfileInfo: UpdateUserType) => {
    return {
        type: 'SET_UPDATED_PROFILE_INFO',
        updatedProfileInfo }
};
export const clearUpdatedProfileInfo = () => {
    return {type: 'CLEAR_UPDATED_PROFILE_INFO'}
};
export const setIsProfileInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_PROFILE_INFO_FETCHING',
        isFetching }
};

export const setCompanyInfo = (companyInfo: CompanyDtoType) => {
    return {
        type: 'SET_COMPANY_INFO',
        companyInfo }
};
export const setIsCompanyInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_COMPANY_INFO_FETCHING',
        isFetching }
};

export const setAdditionalStudentInfo = (additionalStudentInfo: AdditionalStudentInformationType) => {
    return {
        type: 'SET_ADDITIONAL_STUDENT_INFO',
        additionalStudentInfo }
};
export const setUpdatedAdditionalStudentInfo = (updatedadditionalStudentInfo: AdditionalStudentInformationType) => {
    return {
        type: 'SET_UPDATED_ADDITIONAL_STUDENT_INFO',
        updatedadditionalStudentInfo }
};
export const clearUpdatedAdditionalStudentInfo = () => {
    return {type: 'CLEAR_UPDATED_ADDITIONAL_STUDENT_INFO'}
};
export const setIsAdditionalStudentInfoFetching = (isFetching: boolean) => {
    return {
        type: 'SET_IS_ADDITIONAL_STUDENT_INFO_FETCHING',
        isFetching }
};

// THUNKS
export const getProfileInfo = () => (dispatch: any) => {
    dispatch(setIsProfileInfoFetching(true))
    userServiceAPI.getUserByToken()
        .then(data => {
            dispatch(setProfileInfo(data))
            return data
        })
        .then(data => {
            dispatch(setUpdatedProfileInfo ({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                patronym: data.patronym,
            }))
            dispatch(setIsProfileInfoFetching(false))
        })
}
export const getAllStudentInfo = (studentId: string) => (dispatch: any) => {
    dispatch(setIsProfileInfoFetching(true))
    Promise.all([
        userServiceAPI.getUserById(studentId)
        .then(data => {dispatch(setProfileInfo(data))}),

        applicationServiceAPI.getStudentProfileById(studentId)
        .then((data) => {
            dispatch(setAdditionalStudentInfo({
                languages: data.languages,
                stacks: data.stacks,
                resume: data.resume,
                technologies: data.technologies
            }))
        })
    ])
    .then(() => {
        dispatch(setIsProfileInfoFetching(false))
    })

}
export const updateProfileInfo = () => (dispatch: any, getState: GetStateType) => {
    const currentProfileInfo = getState().profile.profileInfo
    const updatedProfile = getState().profile.updatedProfileInfo
    userServiceAPI.editUser(
        currentProfileInfo.userId, updatedProfile.email, updatedProfile.firstName, 
        updatedProfile.lastName, updatedProfile.patronym)
        .then((updatedProfileInfo) => {
            dispatch(clearUpdatedProfileInfo())
            dispatch(setIsProfileInfoFetching(true))
            dispatch(setProfileInfo(updatedProfileInfo))
            dispatch(setUpdatedProfileInfo ({
                email: updatedProfileInfo.email,
                firstName: updatedProfileInfo.firstName,
                lastName: updatedProfileInfo.lastName,
                patronym: updatedProfileInfo.patronym,
            }))
            dispatch(setIsProfileInfoFetching(false))
        })
}

export const getAdditionalStudentInfo = (studentId: string) => (dispatch: any) => {
    dispatch(setIsAdditionalStudentInfoFetching(true))
    applicationServiceAPI.getStudentProfileById(studentId)
        .then((data) => {
            dispatch(setAdditionalStudentInfo({
                languages: data.languages,
                stacks: data.stacks,
                resume: data.resume,
                technologies: data.technologies
            }))
            return data
        })
        .then(data => {
            dispatch(setUpdatedAdditionalStudentInfo({
                languages: data.languages,
                stacks: data.stacks,
                resume: data.resume,
                technologies: data.technologies
            }))
            dispatch(setIsAdditionalStudentInfoFetching(false))
        })
}

const updateStacks = (prevStacks: Array<number>, newStacks: Array<number>, studentId: string) => {
    if(prevStacks.length === 0) {
        return applicationServiceAPI.addStacks(studentId, newStacks)
    }
    else {
        return applicationServiceAPI.removeStacks(studentId, prevStacks)
                .then(() => {
                    applicationServiceAPI.addStacks(studentId, newStacks)
                })
    }
     
}
const updateLanguages = (prevLanguages: Array<number>, newLanguages: Array<number>, studentId: string) => {
    if(prevLanguages.length === 0) {
        return applicationServiceAPI.addLanguages(studentId, newLanguages)
    }
    else {
        return applicationServiceAPI.removeLanguages(studentId, prevLanguages)
                .then(() => {
                    applicationServiceAPI.addLanguages(studentId, newLanguages)
                })
    }
     
}
const updateTechnologies = (prevTechnologies: Array<number>, newTechnologies: Array<number>, studentId: string) => {
    if(prevTechnologies.length === 0) {
        return applicationServiceAPI.addTechnologies(studentId, newTechnologies)
    }
    else {
        return applicationServiceAPI.removeTechnologies(studentId, prevTechnologies)
                .then(() => {
                    applicationServiceAPI.addTechnologies(studentId, newTechnologies)
                })
    }
     
}
export const updateAdditionalStudentInfo = () => (dispatch: any, getState: any) => {
    const studentId = getState().auth.user.userId
    const initialAddStudInf = getState().profile.additionalStudentInfo
    const updatedAddStudInf = getState().profile.updatedAdditionalStudentInfo
    updateStacks(initialAddStudInf.stacks.map((s: any) => s.id), updatedAddStudInf.stacks, studentId)
    .finally(() => {
        updateLanguages(initialAddStudInf.languages.map((s: any) => s.id), updatedAddStudInf.languages, studentId)
        .finally(() => {
            updateTechnologies(initialAddStudInf.technologies.map((s: any) => s.id), updatedAddStudInf.technologies, studentId)
            .finally(() => {
                if (updatedAddStudInf.resume !== null) {
                    applicationServiceAPI.addResume(updatedAddStudInf.resume)
                    .then(() => {
                        dispatch(getAdditionalStudentInfo(studentId))
                    })
                }
                else
                    dispatch(getAdditionalStudentInfo(studentId))
            })
        })
    })
}

export type InitialStateType = typeof initialState

export default profileReducer;