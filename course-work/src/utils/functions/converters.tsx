import { ReactNode } from "react"
import {
    SelectOptionType, 
    StackAndElementsType, 
    StatusHistoryType,
    InterviewType,
    TimelineItemType 
} from "../types/types"
import { ClockCircleOutlined } from "@ant-design/icons"
import { convertISODateToLocal, convertShortDate } from "./dateHandler";
import { ApplicationStatusToColourEnum, ApplicationStatusToColourEnumKeys } from "../enums/enums";

export const convertSLTArrayToSelectOptionsArray = (stackOrElements: Array<StackAndElementsType>) => {
    let currrentGroupsOptions: Array<SelectOptionType> = []
    stackOrElements.map(stackOrElement => {
        currrentGroupsOptions.push({
            value: stackOrElement.id,
            label: stackOrElement.name 
        })
    })
    return currrentGroupsOptions
}

export const convertStatusHistoryToTimelineItems = (statusHistory: Array<StatusHistoryType>, interviews: Array<InterviewType>) => {
    let timelineItems: Array<TimelineItemType> = []
    if (statusHistory !== undefined && interviews !== undefined) {
        let interviewCounter = interviews.length

        timelineItems = statusHistory.map((statusHistoryItem: StatusHistoryType) => {
            let color = ApplicationStatusToColourEnum[statusHistoryItem.status as ApplicationStatusToColourEnumKeys]
            let label = statusHistoryItem.status.includes('Ожидается') ? '' : convertShortDate(statusHistoryItem.addedAt)

            let children: string | ReactNode = ''
            let interview: InterviewType = interviews[interviews.length - interviewCounter]
            switch(statusHistoryItem.status) {
                case 'Назначено собеседование' : {
                    children = (
                        <>
                            <p>Назначено собеседование</p>
                            <p>Дата и время: {convertISODateToLocal(interview.date)}</p>
                            <p>{interview.location !== '' &&  `Место: ${interview.location}`}</p>
                        </>
                    )
                    break;
                }
                case 'Ожидается ответ от компании после прохождения собеседования' : {
                    children = `Ожидается ответ от компании после прохождения собеседования ${convertISODateToLocal(interview.date)}`
                    interviewCounter--
                    break;
                }
                default:
                    children = statusHistoryItem.status
            }

            let dot = statusHistoryItem.status.includes('Ожидается') ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : undefined
            return {
                color: color,
                label: label,
                children: children,
                dot: dot
            }
        })
    }
    return timelineItems
}

