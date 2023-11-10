import React from 'react';
import PositionsTableForSchoolAndStudent from './PositionsForStudentAndSchool/PositionsTableForStudentAndSchool';
import PositionsForCompanyContainer from './PositionsForCompany/PositionsForCompanyContainer';
import PositionsForCuratorContainer from './PositionsForCurator/PositionsForCuratorContainer';
import { useRole } from '../../hooks/hooks';
import CuratorIsNotAttachedToAnyCompany from '../../components/information/Warnings/CuratorIsNotAttachedToAnyCompany';
import { Card, Layout } from 'antd';
import Title from 'antd/es/typography/Title';

const PositionsPage: React.FC = () => {
    console.log(window.location.pathname)
  const userRole = useRole()
  return (
        <Layout style={{ marginInline: 50, marginTop: 30 }}>
            <Card style={{ margin: 20 }}>
                <Title level={3} style={{ marginTop: 0, marginBottom: 12}}>
                    Позиции
                </Title>
                { userRole === 'COMPANY' && <PositionsForCompanyContainer/>}
                { (userRole === 'SCHOOL' || userRole === 'STUDENT') && <PositionsTableForSchoolAndStudent/>}
                { userRole === 'CURATOR_ATTACHED' && <PositionsForCuratorContainer/>}
                { userRole === 'CURATOR_NOT_ATTACHED' && <CuratorIsNotAttachedToAnyCompany/>}
            </Card>
        </Layout>
  )
}

export default PositionsPage;