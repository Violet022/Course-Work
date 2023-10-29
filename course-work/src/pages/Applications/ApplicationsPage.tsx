import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { Card, Layout} from 'antd';
import Title from 'antd/es/typography/Title';
import ApplicationsTableForStudent from './ApplicationsTableForStudent/ApplicationsTableForStudent';
import ApplicationsTableForCompany from './ApplicationsTableForCompany/ApplicationsTableForCompany';

const ApplicationsPage: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={4} style={{ marginTop: 0, marginBottom: 12}}>
                        {userRole === 'STUDENT' ? 'Мои заявки' : 'Заявки'}
                    </Title>
                    {userRole === 'STUDENT' ? <ApplicationsTableForStudent/> : <ApplicationsTableForCompany/>}
                </Card>
            </Layout>
        </>
    )
}

export default ApplicationsPage;