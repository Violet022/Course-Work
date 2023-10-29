import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Layout, List, Spin } from "antd";
import { 
    selectAreCompaniesFetching, 
    selectCompanies 
} from "../../store/companies/CompaniesSelectors";
import { getAllCompanies } from "../../store/companies/CompaniesReducer";
import { useAppDispatch } from "../../hooks/hooks";
import { CompanyDtoType } from "../../utils/types/types";
import Title from "antd/es/typography/Title";


const CompaniesPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const companies: Array<CompanyDtoType>  = useSelector(selectCompanies)
    const areCompaniesFetching: boolean = useSelector(selectAreCompaniesFetching)

    React.useEffect(() => {
        dispatch(getAllCompanies())
    }, [])

    const onItemClick = useCallback((companyId: number | string) => {
        navigate(`/companies/${companyId}`);
    }, []); 

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={4} style={{ marginTop: 0 }}>
                        Компании
                    </Title>
                    <Spin spinning={areCompaniesFetching}>
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
                </Card>
            </Layout>
        </>
    )
}

export default CompaniesPage;