import React from 'react';
import PositionsTableForCurator from './PositionsTableForCurator';
import AddingNewPositionButton from '../../../components/buttons/AddingNewPositionButton';

const PositionsForCuratorContainer: React.FC = () => {
  return (
    <>
        <PositionsTableForCurator/>
        <AddingNewPositionButton/>
    </>
  )
}

export default PositionsForCuratorContainer;