import React from 'react';
import PositionsTableForCompany from './PositionsTableForCompany';
import AddingNewPositionButton from '../../../components/buttons/AddingNewPositionButton';

const PositionsForCompanyContainer: React.FC = () => {
  return (
    <>
        <PositionsTableForCompany/>
        <AddingNewPositionButton/>
    </>
  )
}

export default PositionsForCompanyContainer;