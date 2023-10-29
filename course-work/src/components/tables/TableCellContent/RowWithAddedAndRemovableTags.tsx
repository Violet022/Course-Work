import React from "react"
import { CuratorCompanyType, StatusHistoryType } from "../../../utils/types/types"
import { Col, Row, Space, Tag, Typography } from "antd"
import { convertShortDate } from "../../../utils/functions/converters"

const {Text} = Typography

type PropsType = {
    tags: Array<CuratorCompanyType>
}

export const RowWithAddedAndRemovableTags: React.FC<PropsType> = (props) => {
    return (
        <>
        <Row>
            <Col>
                {
                    props.tags.length === 0
                    ? `не назначен(а) куратором ни одной компании`
                    : 
                        <>
                            {
                                props.tags.map((company: CuratorCompanyType, idx: number) => (
                                    <Tag key={idx}>
                                        {company.name}
                                    </Tag>
                                ))
                            }
                        </>
                }
            </Col>
            <Col>
                        
            </Col>
        </Row>  
        </>
    )
}