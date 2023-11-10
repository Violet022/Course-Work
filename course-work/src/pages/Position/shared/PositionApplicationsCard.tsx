import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row} from 'antd';
import Title from 'antd/es/typography/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { selectUserRole } from '../../../store/authentication/AuthSelectors';
import PositionApplicationsTable from '../../../components/tables/Tables/PositionApplicationsTable';
import { selectApplicationsWithStudentInfo, selectAreApplicationsFetching } from '../../../store/applications/ApplicationsSelectors';
import { ApplicationTypeWithStudentInfo } from '../../../utils/types/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { getPositionApplications } from '../../../store/applications/ApplicationsReducer';
import DndPositionApplicationsTable from '../PositionForCompany/DndPositionApplicationsTable';
import TitleWithSubtitle from '../../../components/information/Titles/TitleWithSubtitle';

const PositionApplicationsCard: React.FC = () => {
    const [isTableOpened, setIsTableOpened] = useState(false)
    const userRole = useSelector(selectUserRole)
    const areFetching = useSelector(selectAreApplicationsFetching)
    const positionApplications: Array<ApplicationTypeWithStudentInfo> = useSelector(selectApplicationsWithStudentInfo)
    const dispatch = useAppDispatch()
    const params = useParams()
    const positionId = params.id == undefined ? "" : params.id 

    React.useEffect(() => {
        dispatch(getPositionApplications(positionId))
    }, [])
 
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Row justify="start" align="middle" style={{marginBottom: 12 }} onClick={() => {setIsTableOpened(prev => !prev)}}>
                    <Col style={{ cursor: 'pointer'}}>
                        {/* <TitleWithSubtitle titlesLevels={[5,5]} title='Студенты, подавшие заявку' subTitle='* в порядке приоритетности для компании'/> */}
                        <Title level={5} style={{ marginBlock: 0}}>
                            Студенты, подавшие заявку
                        </Title>
                        <Title level={5} type="secondary" style={{ marginBlock: 0 }}>
                            * в порядке приоритетности для компании
                        </Title>
                    </Col>
                    <Col style={{ cursor: 'pointer', marginLeft: 12}}>
                        {
                            isTableOpened
                            ? <FontAwesomeIcon icon={faChevronDown} className="arrow"/>
                            : <FontAwesomeIcon icon={faChevronUp} className="arrow"/>
                        }
                    </Col>
                </Row>
                {  (isTableOpened && userRole === 'SCHOOL') && <PositionApplicationsTable 
                                                                    positionApplications={positionApplications} 
                                                                    areFetching={areFetching}
                                                                /> 
                }
                {  (isTableOpened && (userRole === 'COMPANY' || userRole === 'CURATOR')) 
                                                            && <DndPositionApplicationsTable 
                                                                    positionApplications={positionApplications} 
                                                                    areFetching={areFetching}
                                                                /> 
                }
            </Card>
        </>
    )
}

export default PositionApplicationsCard;