import React from 'react';
import { Card, Layout} from 'antd';
import Title from 'antd/es/typography/Title';
import ApplicationsTableForStudent from './ApplicationsTableForStudent/ApplicationsTableForStudent';
import ApplicationsTableForCompany from './ApplicationsTableForCompany/ApplicationsTableForCompany';
import ApplicationsTableForCurator from './ApplicationsTableForCurator/ApplicationsTableForCurator';
import { useRole } from '../../hooks/hooks';
import CuratorIsNotAttachedToAnyCompany from '../../components/information/Warnings/CuratorIsNotAttachedToAnyCompany';

const ApplicationsPage: React.FC = () => {
    const userRole = useRole()
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0, marginBottom: 12}}>
                        {userRole === 'STUDENT' ? 'Мои заявки' : 'Заявки'}
                    </Title>
                    {userRole === 'STUDENT' && <ApplicationsTableForStudent/> }
                    {userRole === 'COMPANY' && <ApplicationsTableForCompany/>}
                    {userRole === 'CURATOR_ATTACHED' && <ApplicationsTableForCurator/>}
                    {userRole === 'CURATOR_NOT_ATTACHED' && <CuratorIsNotAttachedToAnyCompany/>}
                </Card>
            </Layout>
        </>
    )
}

export default ApplicationsPage;