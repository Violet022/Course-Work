import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Space} from 'antd';
import Title from 'antd/es/typography/Title';
import { getAllStudentInfo } from '../../../store/profile/ProfileReducer';
import { useAppDispatch } from '../../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { selectUserRole } from '../../../store/authentication/AuthSelectors';
import AllStudentApplicationsTable from '../../../components/tables/Tables/AllStudentApplicationsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import StudentCompanyApplicationsTable from '../../../components/tables/Tables/StudentCompanyApplicationsTable';
import StudentCuratorCompaniesApplications from '../../../components/tables/Tables/StudentCuratorCompaniesApplications';

const StudentApplicationsTableCard: React.FC = () => {
    const [isTableOpened, setIsTableOpened] = useState(false)
    const userRole = useSelector(selectUserRole)
    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id

    const getTable = () => {
        if (userRole === 'COMPANY') return <StudentCompanyApplicationsTable/>
        if (userRole === 'SCHOOL') return <AllStudentApplicationsTable/>
        if (userRole === 'CURATOR') return <StudentCuratorCompaniesApplications/>
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