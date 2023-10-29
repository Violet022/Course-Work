import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { Layout } from 'antd';
import StudentInfoCard from './shared/StudentInfoCard';
import StudentApplicationsTableCard from './shared/StudentApplicationsTableCard';

const StudentPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
        <Layout style={{ marginInline: 50, marginTop: 30 }}>
            <StudentInfoCard/>
            <StudentApplicationsTableCard/>
        </Layout>
    </>
  )
}

export default StudentPage;