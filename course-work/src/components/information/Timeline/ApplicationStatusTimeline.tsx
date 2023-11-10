import { Timeline } from 'antd';
import React from 'react';
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