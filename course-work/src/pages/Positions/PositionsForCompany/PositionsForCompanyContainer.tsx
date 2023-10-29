import React from 'react';
import PositionsTableForCompany from './PositionsTableForCompany';
import { Card, Layout } from 'antd';
import AddingNewPositionButton from './AddingNewPositionButton';

const PositionsForCompanyContainer: React.FC = () => {
  return (
    <>
        <Layout style={{ marginInline: 50, marginTop: 30 }}>
            <Card style={{ margin: 20 }}>
                <PositionsTableForCompany/>
                <AddingNewPositionButton/>
            </Card>
        </Layout>
    </>
  )
}

export default PositionsForCompanyContainer;