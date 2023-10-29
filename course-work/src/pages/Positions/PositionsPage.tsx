import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import PositionsTableForStudent from '../Company/CompanyForStudent/PositionsTableForStudent';
import PositionsTableForSchoolAndStudent from './PositionsForStudentAndSchool/PositionsTableForStudentAndSchool';
import PositionsForCompanyContainer from './PositionsForCompany/PositionsForCompanyContainer';

const PositionsPage: React.FC = () => {
  const userRole = useSelector(selectUserRole)
  return (
    <>
      {
        userRole === 'COMPANY'
        ? <PositionsForCompanyContainer/>
        : <PositionsTableForSchoolAndStudent/>
      }
    </>
  )
}

export default PositionsPage;