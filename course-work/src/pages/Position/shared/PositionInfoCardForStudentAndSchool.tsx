import React from 'react';
import InformationBlock from '../../../components/information/InformationBlock/InformationBlock';
import Title from 'antd/es/typography/Title';
import { IntershipPositionDtoType } from '../../../utils/types/types';
import { createPositionInfoFieldsArray } from '../../../utils/functions/informationBlockFieldsCreators';

type PropsType = {
    positionInfo: IntershipPositionDtoType
}

const PositionInfoCardForStudentAndSchool: React.FC<PropsType> = (props) => {
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 4 }}>{props.positionInfo.title}</Title>
            <Title level={5} type="secondary" style={{ marginTop: 0, marginBottom: 12 }}>{props.positionInfo.companyName}</Title>
            <InformationBlock fields={createPositionInfoFieldsArray(props.positionInfo)} colWidths={[4, 20]}/>
        </>
    )
}

export default PositionInfoCardForStudentAndSchool;