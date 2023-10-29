import React from "react";
import { useSelector } from "react-redux";
import { Card, Layout} from "antd";
import Title from "antd/es/typography/Title";
import { selectUserRole } from "../../store/authentication/AuthSelectors";
import StudentsForSchoolContainer from "./StudentsForSchool/StudentsForSchoolContainer";
import StudentsForCompanyContainer from "./StudentsForCompany/StudentsForCompanyContainer";

const StudentsPage: React.FC = () => {
    const userRole = useSelector(selectUserRole)

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0, marginBottom: 24}}>
                        Студенты
                    </Title>
                    {
                        userRole === 'SCHOOL'
                        ? <StudentsForSchoolContainer/>
                        : <StudentsForCompanyContainer/>
                    }
                </Card>
            </Layout>
        </>
    )
}

export default StudentsPage
