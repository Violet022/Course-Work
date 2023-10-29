import React from 'react';
import StudentsWithApplications from './StudentsWithApplications';
import StudentsWithoutApplicationsTable from './StudentsWithoutApplicationsTable';

const StudentsForSchoolContainer: React.FC = () => {
  return (
    <>
        <StudentsWithApplications/>
        <StudentsWithoutApplicationsTable/>
    </>
  )
};

export default StudentsForSchoolContainer;