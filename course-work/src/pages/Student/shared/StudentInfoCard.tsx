import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Layout, Spin } from 'antd';
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

const StudentInfoCard: React.FC = () => {
    const commonProfileInfo = useSelector(selectProfileInfo)
    const additionalStudentInfo = useSelector(selectAdditionalStudentInfo)
    const isFetching = useSelector(selectIsProfileInfoFetching)

    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id
    
    React.useEffect(() => {
        dispatch(getAllStudentInfo(studentId))
    }, [])

    return (
        <>
            <Card style={{ margin: 20 }}>
                <Spin spinning={isFetching}>
                    <Title level={3} style={{ marginTop: 0 }}>
                        {commonProfileInfo.lastName} {commonProfileInfo.firstName} {commonProfileInfo.patronym !== null && commonProfileInfo.patronym}
                    </Title>
                    <InformationBlock fields={createCommonProfileInfoFieldsArray(commonProfileInfo)} colWidths={[4, 20]}/>
                    <InformationBlock fields={createAdditionalStudentProfileInfoFieldsArray(additionalStudentInfo)} colWidths={[4, 20]}/>
                </Spin>
            </Card>
        </>
    )
}

export default StudentInfoCard;
