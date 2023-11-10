import axios from "axios";
import { ResultCodesEnum } from "./api";
import { CuratorDtoType } from "../utils/types/types";

const instanceWithAuth = axios.create({
    baseURL: 'http://localhost:8080/curator-service/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});
instanceWithAuth.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
})

export const curatorServiceAPI = {
    // CURATOR CONTROLLER
    getAllCurators() {
        return instanceWithAuth.get(`curators`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    addACompanyToCurator(curatorId: string, companyId: string) {
        return instanceWithAuth.post(`curators/${curatorId}/companies/${companyId}`)
    },
    removeACompanyFromCurator(curatorId: string, companyId: string) {
        return instanceWithAuth.delete(`curators/${curatorId}/companies/${companyId}`)
    },
    getCuratorById(curatorId: string) {
        return instanceWithAuth.get(`curators/${curatorId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
    },
    deleteCuratorById(curatorId: string) {
        return instanceWithAuth.delete(`curators/${curatorId}`)
    },
    getCuratorsByCompanyId(companyId: string) {
        return instanceWithAuth.get(`curators/companies/${companyId}`)
            .then(response => {
                if(response.status === ResultCodesEnum.OK) {
                    return response.data
                }
            })
            .then((curators: Array<CuratorDtoType>) => {
                return curators.map((curator: CuratorDtoType) => curator.id)
            })
    }
}