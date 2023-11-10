import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { List, Spin } from "antd";
import { 
    selectAreCompaniesFetching, 
    selectCompanies 
} from "../../store/companies/CompaniesSelectors";
import { getAllCompanies, getCuratorCompanies } from "../../store/companies/CompaniesReducer";
import { useAppDispatch, useRole } from "../../hooks/hooks";
import { CompanyDtoType } from "../../utils/types/types";
import CuratorIsNotAttachedToAnyCompany from "../../components/information/Warnings/CuratorIsNotAttachedToAnyCompany";
import { isCurator } from "../../utils/functions/conditions";

const CompaniesList: React.FC = () => {
    const userRole = useRole()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const companies: Array<CompanyDtoType>  = useSelector(selectCompanies)
    const areCompaniesFetching: boolean = useSelector(selectAreCompaniesFetching)

    React.useEffect(() => {
        if(isCurator(userRole))
            dispatch(getCuratorCompanies())
        else
            dispatch(getAllCompanies())
    }, [])

    const onItemClick = useCallback((companyId: number | string) => {
        navigate(`/companies/${companyId}`);
    }, []); 

    return (
        <>
            {
                userRole === 'CURATOR_NOT_ATTACHED'
                ? <CuratorIsNotAttachedToAnyCompany/>
                : <Spin spinning={areCompaniesFetching}>
                    {!areCompaniesFetching &&
                        <List
                            itemLayout="horizontal"
                            dataSource={companies}
                            renderItem={(item) => (
                                <List.Item style={{ cursor: 'pointer'}}
                                            onClick={() => {onItemClick(item.id)}}>
                                    {item.name}
                                </List.Item>
                            )}
                        />
                    }
                </Spin>
            }
        </>
    )
}

export default CompaniesList;