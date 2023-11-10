import React from 'react';
import InformationBlock from '../../../components/information/InformationBlock/InformationBlock';
import { IntershipPositionDtoType } from '../../../utils/types/types';
import { createPositionInfoFieldsArray } from '../../../utils/functions/informationBlockFieldsCreators';
import TitleWithSubtitle from '../../../components/information/Titles/TitleWithSubtitle';

type PropsType = {
    positionInfo: IntershipPositionDtoType
}

const PositionInfoCardForStudentAndSchool: React.FC<PropsType> = (props) => {
    return (
        <>
            <TitleWithSubtitle titlesLevels={[3,5]} title={props.positionInfo.title} subTitle={props.positionInfo.companyName}/>
            <InformationBlock fields={createPositionInfoFieldsArray(props.positionInfo)} colWidths={[4, 20]}/>
        </>
    )
}

export default PositionInfoCardForStudentAndSchool;