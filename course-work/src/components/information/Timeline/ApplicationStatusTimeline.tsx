import { Button, Modal,  Space, Timeline } from 'antd';
import React, { useState } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import CreateUpdatePositionForm from '../../../components/forms/CreateUpdatePositionForm';
import { createNewPosition, setNewPosition } from '../../../store/position/PositionReducer';
import { useSelector } from 'react-redux';
import { selectNewPositionTemplate } from '../../../store/position/PositionSelectors';
import { convertStatusHistoryToTimelineItems } from '../../../utils/functions/converters';
import { ApplicationType } from '../../../utils/types/types';

type PropsType = {
    applicationInfo: ApplicationType
}

const ApplicationStatusTimeline: React.FC<PropsType> = (props) => {
    return (
        <>
            <div style={{marginTop: 24}}>
                <Timeline
                    mode={'left'}
                    items={convertStatusHistoryToTimelineItems(props.applicationInfo.statusHistory, props.applicationInfo.interviews)}
                />
            </div>
        </>
    )
}

export default ApplicationStatusTimeline;