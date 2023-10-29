import React, { ReactNode } from "react"
import {
    SelectOptionType, 
    StackAndElementsType, 
    StatusHistoryType,
    InterviewType,
    TimelineItemType 
} from "../types/types"
import { ClockCircleOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

const { Text } = Typography;

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

const StatusesColor = { 
    blue : [
        'Подана заявка',
        'Назначено собеседование',
        'Ожидается ответ от компании после прохождения собеседования',
        'Ожидается ответ от студента'
    ] as Array<string>,
    green : [
        'Предложен оффер',
        'Принят оффер'
    ] as Array<string>,
    red : [
        'В оффере отказано',
        'Не принят оффер'
    ] as Array<string>,
    
};

export const convertShortDate = (date: string) => {
   return date.split('-').reverse().join('.')
}
export const convertISODate = (dateTime: string) => {
    let localTimeFromUTC = dayjs(dateTime).utc().local().format()
    
    let splitSymbol = localTimeFromUTC[19]
    let [dateAndTime, offset] = localTimeFromUTC.split(splitSymbol)

    let timeMs = dayjs(dateAndTime).valueOf()
    let time_parts = offset.split(":");
    let offsetMs = (Number(time_parts[0]) * 60 * 60 * 1000) + (Number(time_parts[1]) * 60 * 1000)

    let localeMsNumber = splitSymbol == '+'? timeMs + offsetMs : timeMs - offsetMs

    let localTime = dayjs(localeMsNumber).utc().local().format()

    let [date, time] = localTime.split('T')
    return `${date.split('-').reverse().join('.')} ${time.substr(0, 5)}` 
}

export const convertStatusHistoryToTimelineItems = (statusHistory: Array<StatusHistoryType>, interviews: Array<InterviewType>) => {
    let timelineItems: Array<TimelineItemType> = []
    if (statusHistory !== undefined && interviews !== undefined) {
        let interview: InterviewType
        if (interviews.length !== 0)
            interview = interviews[interviews.length - 1]

        timelineItems = statusHistory.map((statusHistoryItem: StatusHistoryType) => {
            let color = ''
            if (StatusesColor.blue.indexOf(statusHistoryItem.status) != -1)
                color='blue'
            if (StatusesColor.green.indexOf(statusHistoryItem.status) != -1)
                color='green'
            if (StatusesColor.red.indexOf(statusHistoryItem.status) != -1)
                color='red'

            let label = statusHistoryItem.status == 'Ожидается ответ от компании после прохождения собеседованияv' 
                        ? '' 
                        : convertShortDate(statusHistoryItem.addedAt)

            let children: string | ReactNode = ''
            switch(statusHistoryItem.status) {
                case 'Назначено собеседование' : {
                    children = (
                        <>
                            <p>Назначено собеседование</p>
                            <p>Дата и время: {convertISODate(interview.date)}</p>
                            <p>{interview.location !== '' &&  `Место: ${interview.location}`}</p>
                        </>
                    )
                    break;
                }
                case 'Ожидается ответ от компании после прохождения собеседования' : {
                    children = `Ожидается ответ от компании после прохождения собеседования ${convertISODate(interview.date)}`
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

