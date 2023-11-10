import React from 'react';
import { Layout } from 'antd';
import StudentInfoCard from './shared/StudentInfoCard';
import StudentApplicationsTableCard from './shared/StudentApplicationsTableCard';

const StudentPage: React.FC = () => {
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