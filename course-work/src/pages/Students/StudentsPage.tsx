import React from "react";
import { Card, Layout} from "antd";
import Title from "antd/es/typography/Title";
import StudentsForSchoolContainer from "./StudentsForSchool/StudentsForSchoolContainer";
import StudentsForCompanyContainer from "./StudentsForCompany/StudentsForCompanyContainer";
import StudentsWithApplications from "./StudentsForSchool/StudentsWithApplications";
import { useRole } from "../../hooks/hooks";

const StudentsPage: React.FC = () => {
    const userRole = useRole()

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0, marginBottom: 24}}>
                        Студенты
                    </Title>
                    {userRole === 'COMPANY' && <StudentsForCompanyContainer/>}
                    {(userRole === 'SCHOOL' || userRole === 'CURATOR_NOT_ATTACHED') 
                        && <StudentsForSchoolContainer/>
                    }
                    {userRole === 'CURATOR_ATTACHED' && <StudentsWithApplications/>}
                </Card>
            </Layout>
        </>
    )
}

export default StudentsPage
