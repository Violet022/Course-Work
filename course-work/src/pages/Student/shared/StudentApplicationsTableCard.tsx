import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Layout, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import InformationBlock from '../../../components/information/InformationBlock/InformationBlock';
import { 
    selectAdditionalStudentInfo, 
    selectIsProfileInfoFetching, 
    selectProfileInfo 
} from '../../../store/profile/ProfileSelectors';
import { getAllStudentInfo } from '../../../store/profile/ProfileReducer';
import { useAppDispatch } from '../../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { createAdditionalStudentProfileInfoFieldsArray, createCommonProfileInfoFieldsArray } from '../../../utils/functions/informationBlockFieldsCreators';
import { selectUserRole } from '../../../store/authentication/AuthSelectors';
import AllStudentApplicationsTable from '../../../components/tables/Tables/AllStudentApplicationsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import StudentCompanyApplicationsTable from '../../../components/tables/Tables/StudentCompanyApplicationsTable';

const StudentApplicationsTableCard: React.FC = () => {
    const [isTableOpened, setIsTableOpened] = useState(false)
    const userRole = useSelector(selectUserRole)
    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id

    const getTable = () => {
        if (userRole === 'COMPANY') return <StudentCompanyApplicationsTable/>
        if (userRole === 'SCHOOL') return <AllStudentApplicationsTable/>
    }
    
    React.useEffect(() => {
        dispatch(getAllStudentInfo(studentId))
    }, [])

    return (
        <>
            <Card style={{ margin: 20 }}>
                <div style={{marginBottom: 8}} className="blockOpening">
                    <Space align="end" onClick={() => {setIsTableOpened(!isTableOpened)}} 
                        style={{ cursor: 'pointer', marginBottom: 0}}>
                        <Title level={4} style={{ marginBlock: 0}}>
                            Заявки студента
                        </Title>
                        {
                            isTableOpened
                            ? <FontAwesomeIcon icon={faChevronDown} className="arrow"/>
                            : <FontAwesomeIcon icon={faChevronUp} className="arrow"/>
                         }
                    </Space>
                </div>
                {
                    isTableOpened && getTable()
                }
            </Card>
        </>
    )
}

export default StudentApplicationsTableCard;