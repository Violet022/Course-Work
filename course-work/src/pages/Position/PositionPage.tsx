import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { Layout } from 'antd';
import PositionInfoCard from './shared/PositionInfoCard';
import PositionApplicationsCard from './shared/PositionApplicationsCard';

const PositionPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
        <Layout style={{ marginInline: 50, marginTop: 30 }}>
            <PositionInfoCard/>
            {
                (userRole === 'COMPANY' || userRole === 'SCHOOL') &&
                <PositionApplicationsCard/>
            }
        </Layout>
    </>
  )
}

export default PositionPage;