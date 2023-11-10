import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { Card, Layout, Spin} from 'antd';
import { useAppDispatch } from '../../hooks/hooks';
import { selectApplicationInfo, selectIsApplicationInfoFetching} from '../../store/application/ApplicationSelectors';
import { getApplicationAndStudentInfo } from '../../store/application/ApplicationReducer';
import { ApplicationType} from '../../utils/types/types';
import { useParams } from 'react-router-dom';
import ApplicationForCompanyContainer from './ApplicationForCompany/ApplicationForCompanyContainer';
import ApplicationForStudentContainer from './ApplicationForStudent/ApplicationForStudentContainer';

const ApplicationPage: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const isFetching = useSelector(selectIsApplicationInfoFetching)
    const applicationInfo: ApplicationType = useSelector(selectApplicationInfo)

    const dispatch = useAppDispatch()
    const params = useParams()
    const applicationId = params.id == undefined ? "" : params.id

    let lastStatus = null
    if(!!applicationInfo.statusHistory)
        lastStatus = applicationInfo.statusHistory.length !== 0 
                     ? applicationInfo.statusHistory[applicationInfo.statusHistory.length - 1].status
                     : null
    
    React.useEffect(() => {
        dispatch(getApplicationAndStudentInfo(applicationId))
    }, [])
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={isFetching}>
                        {(!isFetching && userRole === 'STUDENT') && <ApplicationForStudentContainer applicationInfo={applicationInfo} lastStatus={lastStatus}/>}
                        {(!isFetching && (userRole === 'COMPANY' || userRole === 'CURATOR')) && <ApplicationForCompanyContainer applicationInfo={applicationInfo} lastStatus={lastStatus}/>}
                    </Spin>
                </Card>
            </Layout>
        </>
    )
}

export default ApplicationPage;