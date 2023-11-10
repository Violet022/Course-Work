import axios from "axios";
import { ResultCodesEnum } from "./api";
import { ApplicationPriorityType } from '../utils/types/types'

const instanceWithAuth = axios.create({
    baseURL: 'http://localhost:8080/application-service/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});
instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export const applicationServiceAPI = {
    // APPLICATION CONTROLLER
    getApplicationById(applicationId: string) {
        return instanceWithAuth.get(`applications/${applicationId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deleteApplication(applicationId: string) {
        return instanceWithAuth.delete(`applications/${applicationId}`)
    },
    addStatusToApplication(applicationId: string, status: string) {
        return instanceWithAuth.post(`applications/${applicationId}/status/${status}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createApplication(positionId: string) {
        return instanceWithAuth.post(`applications/${positionId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllApplicationsByPositionId(positionId: string) {
        return instanceWithAuth.get(`applications/position/${positionId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    updatePositionApplicationsPriorities(positionId: string, priorityList: Array<ApplicationPriorityType>) {
        return instanceWithAuth.put(`applications/position/${positionId}/updatePriorities`, priorityList)
    },
    // INTERVIEW CONTROLLER
    createApplicationInterview(applicationId: string, date: string, location: string) {
        const body = {
            date: date,
            location: location
        }
        return instanceWithAuth.post(`interviews/${applicationId}`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getInterviewById(interviewId: string) {
        return instanceWithAuth.get(`interviews/${interviewId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deleteInterviewById(interviewId: string) {
        return instanceWithAuth.delete(`interviews/${interviewId}`)
    },
    // STUDENT CONTROLLER
    getStudentProfileById(studentId: string) {
        return instanceWithAuth.get(`students/${studentId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    addLanguages(studentId: string, languages: Array<number>) {
        return instanceWithAuth.post(`students/${studentId}/languages`, languages)
    },
    removeLanguages(studentId: string, languages: Array<number>) {
        return instanceWithAuth.delete(`students/${studentId}/languages`, { data: languages })
    },
    addStacks(studentId: string, stacks: Array<number>) {
        return instanceWithAuth.post(`students/${studentId}/stacks`, stacks)
    },
    removeStacks(studentId: string, stacks: Array<number>) {
        return instanceWithAuth.delete(`students/${studentId}/stacks`, { data: stacks })
    },
    addTechnologies(studentId: string, technologies: Array<number>) {
        return instanceWithAuth.post(`students/${studentId}/technologies`, technologies)
    },
    removeTechnologies(studentId: string, technologies: Array<number>) {
        return instanceWithAuth.delete(`students/${studentId}/technologies`, { data: technologies })
    },
    addResume(resume: string) {
        return instanceWithAuth.post(`students/resume`, resume)
    },
    getStudentsByCompanyId(companyId: string | null) {
        return instanceWithAuth.get(`students/byCompany/${companyId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    }
}