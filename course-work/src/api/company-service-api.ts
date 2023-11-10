import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithAuth = axios.create({
    baseURL: 'http://localhost:8080/company-service/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});
instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export const companyServiceAPI = {
    // COMPANY CONTROLLER
    getAllCompanies() {
        return instanceWithAuth.get(`companies`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createCompany(address: string | null, contacts: string | null, description: string | null,
        logoURL: string | null, name: string, websiteURL: string | null) {
        const body = {
            address: address,
            contacts: contacts,
            description: description,
            logoURL: logoURL,
            name: name,
            websiteURL: websiteURL
        }
        return instanceWithAuth.post(`companies`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getCompanyById(companyId: string | null) {
        return instanceWithAuth.get(`companies/${companyId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    editCompany(companyId: string | null, address: string | null, contacts: string | null, description: string | null,
        logoURL: string | null, name: string, websiteURL: string | null) {
        const body = {
            address: address,
            contacts: contacts,
            description: description,
            logoURL: logoURL,
            name: name,
            websiteURL: websiteURL
        }
        return instanceWithAuth.put(`companies/${companyId}`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deleteCompany(companyId: string) {
        return instanceWithAuth.delete(`companies/${companyId}`)
    },
    
    // POSITION CONTROLLER
    getAllPositions() {
        return instanceWithAuth.get(`positions`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createPosition(companyId: string, description: string | null, languageId: string | null, 
        numberOfPlaces: number | string | null, salaryRange: string | null, stackId: string | null, 
        title: string | null, technologiesIds: Array<number>) {
        const body = {
            companyId: companyId,
            description: description,
            languageId: languageId,
            numberOfPlaces: Number(numberOfPlaces),
            salaryRange: salaryRange,
            stackId: Number(stackId),
            technologiesIds: technologiesIds,
            title: title
        }
        return instanceWithAuth.post(`positions`, body)
    },
    getPositionById(positionId: string) {
        return instanceWithAuth.get(`positions/${positionId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    editPosition(positionId: string, companyId: string | null, description: string | null, languageId: string | null, 
        numberOfPlaces: number | null, salaryRange: string | null, stackId: string | null, 
        title: string | null, technologiesIds: Array<number>) {
        const body = {
            companyId: companyId,
            description: description,
            languageId: languageId,
            numberOfPlaces: Number(numberOfPlaces),
            salaryRange: salaryRange,
            stackId: Number(stackId),
            technologiesIds: technologiesIds,
            title: title
        }
        return instanceWithAuth.put(`positions/${positionId}`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deletePosition(positionId: string) {
        return instanceWithAuth.delete(`positions/${positionId}`)
    },
    getPositionsByCompanyId(companyId: string | null) {
        return instanceWithAuth.get(`positions/byCompany/${companyId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    }
}