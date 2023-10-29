import React from "react"
import { StatusHistoryType } from "../../../utils/types/types"
import { Col, Row, Space, Tag, Typography } from "antd"
import { convertShortDate } from "../../../utils/functions/converters"

const {Text} = Typography

type PropsType = {
    applicationStatuses: Array<StatusHistoryType>
}

export const StatusTag: React.FC<PropsType> = (props) => {
    let applicationStatuses = props.applicationStatuses
    let lastApplicationStatus = applicationStatuses[applicationStatuses.length - 1]
    let color = 'geekblue'
    if(lastApplicationStatus.status.includes('Ожидается')) color = 'gold'
    if(lastApplicationStatus.status.includes('Предложен') || lastApplicationStatus.status.includes('Принят')) color = 'green'
    if(lastApplicationStatus.status.includes('отказано') || lastApplicationStatus.status.includes('не принят')) color = 'red'

    return (
        <>
            <Tag color={color} style={{maxWidth: '100%'}}>
                <Space direction="vertical" style={{ rowGap: 0, width: '100%', whiteSpace: 'break-spaces'}} >
                    <Text strong>{convertShortDate(lastApplicationStatus.addedAt)}</Text>
                    <Text>{lastApplicationStatus.status}</Text>
                </Space>
            </Tag>
        </>
    )
}
