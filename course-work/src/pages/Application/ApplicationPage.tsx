import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { Card, Layout, Spin, Timeline} from 'antd';
import Title from 'antd/es/typography/Title';
import { useAppDispatch } from '../../hooks/hooks';
import { selectApplicationInfo, selectIsApplicationInfoFetching, selectStudentApplicationInfo } from '../../store/application/ApplicationSelectors';
import { getApplicationAndStudentInfo } from '../../store/application/ApplicationReducer';
import { ApplicationType, StudentApplicationInfoType } from '../../utils/types/types';
import { useParams } from 'react-router-dom';
import TitleWithSubtitle from '../../components/information/Titles/TitleWithSubtitle';
import { convertStatusHistoryToTimelineItems } from '../../utils/functions/converters';
import AcceptOfferButton from './ApplicationForStudent/AcceptOfferButton';
import RejectOfferButton from './ApplicationForStudent/RejectOfferButton';
import InformationBlock from '../../components/information/InformationBlock/InformationBlock';
import { createApplicationStudentInfoFieldsArray } from '../../utils/functions/informationBlockFieldsCreators';
import ApplicationForCompanyContainer from './ApplicationForCompany/ApplicationForCompanyContainer';
import ApplicationForStudentContainer from './ApplicationForStudent/ApplicationForStudentContainer';

const ApplicationPage: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const isFetching = useSelector(selectIsApplicationInfoFetching)
    const applicationInfo: ApplicationType = useSelector(selectApplicationInfo)

    const params = useParams()
    const applicationId = params.id == undefined ? "" : params.id

    let lastStatus = null
    if(!!applicationInfo.statusHistory)
        lastStatus = applicationInfo.statusHistory.length !== 0 
                     ? applicationInfo.statusHistory[applicationInfo.statusHistory.length - 1].status
                     : null
    
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getApplicationAndStudentInfo(applicationId))
    }, [])
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={isFetching}>
                        {(!isFetching && userRole === 'STUDENT') && <ApplicationForStudentContainer applicationInfo={applicationInfo} lastStatus={lastStatus}/>}
                        {(!isFetching && userRole === 'COMPANY') && <ApplicationForCompanyContainer applicationInfo={applicationInfo} lastStatus={lastStatus}/>}
                    </Spin>
                </Card>
            </Layout>
        </>
    )
}

export default ApplicationPage;