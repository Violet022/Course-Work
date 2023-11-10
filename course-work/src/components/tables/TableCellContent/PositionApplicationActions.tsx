import React from "react"
import { ShortStudentApplicationInfo} from "../../../utils/types/types"
import { Button, Space, Tooltip, Typography } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap, faNoteSticky } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const {Text} = Typography

type PropsType = {
    applicationInfo: ShortStudentApplicationInfo
}

const PositionApplicationActions: React.FC<PropsType> = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <Space size="middle">
                <Tooltip placement="top" title='Перейти к студенту'>
                    <Button icon={<FontAwesomeIcon icon={faGraduationCap} className="action-icon"/>} 
                            onClick={() => {navigate(`/students/${props.applicationInfo.studentId}`)}}/>
                </Tooltip>
                <Tooltip placement="top" title='Перейти к заявке'>
                    <Button icon={<FontAwesomeIcon icon={faNoteSticky} className="action-icon"/>} 
                            onClick={() => {navigate(`/applications/${props.applicationInfo.applicationId}`)}}/>
                </Tooltip>
            </Space>
        </>
    )
}

export default PositionApplicationActions
