import axios from "axios";
import { ResultCodesEnum } from "./api";
import { UserRoleType } from "../utils/types/types";

const instanceWithoutAuth = axios.create({
    baseURL: 'http://localhost:8080/user-service/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});
const instanceWithAuth = axios.create({
    baseURL: 'http://localhost:8080/user-service/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    }
});
instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export const userServiceAPI = {

    // GROUP CONTROLLER
    getAllGroups() {
        return instanceWithAuth.get(`groups`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    createGroup(groupNumber: string) {
        return instanceWithAuth.post(`groups`, {groupNumber: groupNumber})
    },
    getGroup(groupNumber: string) {
        return instanceWithAuth.get(`groups/${groupNumber}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    deleteGroup(groupNumber: string) {
        return instanceWithAuth.delete(`groups/${groupNumber}`)
    },
    addStudentIntoGroup(groupNumber: string, studentId: string) {
        return instanceWithAuth.post(`groups/${groupNumber}/${studentId}`)
    },

    // JWT AUTHENTICATION CONTROLLER
    authenticate(email: string, password: string) {
        const body = {
            email: email,
            password: password
        }
        return instanceWithoutAuth.post(`authenticate`, body)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },

    // USER CONTROLLER
    getUserByEmail(email: string) {
        return instanceWithAuth.get(`users/${email}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    deleteUserById(userId: string) {
        return instanceWithAuth.delete(`users/${userId}`)
    },
    setCompanyToUser(userId: string, companyId: string | number | null) {
        return instanceWithAuth.post(`users/company/${userId}/${companyId}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    editUser(userId: string, email: string, firstName: string, lastName: string, patronym: string | null | undefined) {
        const body = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            patronym: patronym
        }
        return instanceWithAuth.patch(`users/edit/${userId}`, body)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUserById(userId: string) {
        return instanceWithAuth.get(`users/id/${userId}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUserByToken() {
        return instanceWithAuth.get(`users/jwt`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUserByRole(role: UserRoleType) {
        return instanceWithAuth.get(`users/roles/${role}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    getUserSecurityData(email: string) {
        return instanceWithAuth.get(`users/security/${email}`)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
    createUser(companyId: string | null, email: string, firstName: string, 
        groupNumber: string | null, lastName: string | null, 
        password: string | null, patronym: string | null, role: UserRoleType) {
        const body = {
            companyId: companyId,
            email: email,
            firstName: firstName,
            groupNumber: groupNumber,
            lastName: lastName,
            password: password,
            patronym: patronym,
            role: role,
        }
        return instanceWithAuth.post('/users/sign-up', body)
            .then(response => {
                if (response.status === ResultCodesEnum.OK) {
                        return response.data
                    }
            })
    },
}