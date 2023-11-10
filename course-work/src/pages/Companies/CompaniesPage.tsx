import React from "react";
import { useSelector } from "react-redux";
import { Card, Layout} from "antd";
import Title from "antd/es/typography/Title";
import { selectUserRole } from "../../store/authentication/AuthSelectors";
import CompaniesTableForSchool from "./CompaniesForSchool/CompaniesTableForSchool";
import CompaniesList from "./CompaniesList";

const CompaniesPage: React.FC = () => {
    const userRole = useSelector(selectUserRole)

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0, marginBottom: 12 }}>
                        Компании
                    </Title>
                    {
                        userRole === 'SCHOOL'
                        ? <CompaniesTableForSchool/>
                        : <CompaniesList/>
                    }
                </Card>
            </Layout>
        </>
    )
}

export default CompaniesPage;