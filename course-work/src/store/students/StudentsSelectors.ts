import {AppStateType} from '../store'

export const selectAreStudentsFetching= (state: AppStateType) => {
    return state.students.areStudentsFetching
}

export const selectStudentsWithApplications = (state: AppStateType) => {
    return state.students.studentsWithApplicationsArray
}

export const selectCompanyStudents = (state: AppStateType) => {
    return state.students.companyStudents
}

export const selectStudentsWithoutApplications = (state: AppStateType) => {
    return state.students.studentsWithoutApplicationsArray
}
