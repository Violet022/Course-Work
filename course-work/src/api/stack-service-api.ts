import axios from "axios";
import { ResultCodesEnum } from "./api";

const instanceWithAuth = axios.create({
    baseURL: 'http://localhost:8080/stack-service/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});
instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export const stackServiceAPI = {
    // LANGUAGE CONTROLLER
    getAllLanguages() {
        return instanceWithAuth.get(`languages`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createUpdateLanguage(name: string, relatedStackIds: Array<number>, relatedTechnologyIds: Array<number>) {
        const body = {
            name: name,
            relatedStackIds: relatedStackIds,
            relatedTechnologyIds: relatedTechnologyIds
        }
        return instanceWithAuth.post(`languages`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllLanguagesByIds(ids: Array<number>) {
        return instanceWithAuth.post(`languages/byIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllLanguagesByStackName(stackName: string) {
        return instanceWithAuth.get(`languages/byStack/${stackName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllLanguagesByTechnologyName(technologyName: string) {
        return instanceWithAuth.get(`languages/byTechnology/${technologyName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getLanguagesNamesByIds(ids: Array<number>) {
        return instanceWithAuth.post(`languages/namesByIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },

    // STACK CONTROLLER
    getAllStacks() {
        return instanceWithAuth.get(`stacks`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createUpdateStack(name: string, relatedLanguageIds: Array<number>,
        relatedTechnologyIds: Array<number>) {
        const body = {
            name: name,
            relatedLanguageIds: relatedLanguageIds,
            relatedTechnologyIds: relatedTechnologyIds
        }
        return instanceWithAuth.post(`stacks`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllStacksByIds(ids: Array<number>) {
        return instanceWithAuth.post(`stacks/byIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllStacksByLanguageName(languageName: string) {
        return instanceWithAuth.get(`stacks/byLanguage/${languageName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllStacksByTechnologyName(technologyName: string) {
        return instanceWithAuth.get(`stacks/byTechnology/${technologyName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getStackNamesByIds(ids: Array<number>) {
        return instanceWithAuth.post(`stacks/namesByIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },

    // TECHNOLOGY CONTROLLER
    getAllTechnologies() {
        return instanceWithAuth.get(`technologies`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    createUpdateTechnology(name: string, relatedLanguageIds: number, relatedStackIds: number) {
        const body = {
            name: name,
            relatedLanguageIds: relatedLanguageIds,
            relatedStackIds: relatedStackIds
        }
        return instanceWithAuth.post(`technologies`, body)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllTechnologiesByIds(ids: Array<number>) {
        return instanceWithAuth.post(`technologies/byIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllTechnologiesByLanguageName(languageName: string) {
        return instanceWithAuth.get(`technologies/byLanguage/${languageName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllTechnologiesByStackName(stackName: string) {
        return instanceWithAuth.get(`technologies/byStack/${stackName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getAllTechnologiesByStackAndLanguageName(stackName: string, languageName: string) {
        return instanceWithAuth.get(`technologies/byStackAndLanguage/${stackName}/${languageName}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    getTechnologyNamesByIds(ids: Array<number>) {
        return instanceWithAuth.post(`technologies/namesByIds`, ids)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
}