import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Layout, Spin} from 'antd';
import Title from 'antd/es/typography/Title';

import { selectIsProfileCompanyInfoFetching, selectProfileInfo } from '../../store/profile/ProfileSelectors';
import { selectUserRole } from '../../store/authentication/AuthSelectors';
import { getProfileInfo} from '../../store/profile/ProfileReducer';

import { useAppDispatch } from '../../hooks/hooks';
import { createCommonProfileInfoFieldsArray } from '../../utils/functions/informationBlockFieldsCreators';

import EditableInformationBlock from '../../components/information/EditableInformationBlock/EditableInformationBlock';
import CompanyInfoForProfile from './ProfileForCompany/CompanyInfoForProfile';
import { getUpdateCommonProfileInfoForm } from './EditForms/UpdateCommonProfileInfoForm';
import AdditionalStudentProfileInfo from './ProfileForStudents/AdditionalStudentProfileInfo';


const ProfilePage: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const userProfile = useSelector(selectProfileInfo)
    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(getProfileInfo())
    }, [])

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={useSelector(selectIsProfileCompanyInfoFetching)}>
                        <Title level={3} style={{ marginTop: 0 }}>
                            {userProfile.lastName} {userProfile.firstName} {userProfile.patronym !== null && userProfile.patronym}
                        </Title>

                        <EditableInformationBlock 
                            title='Личная информация'
                            infoBlockdata={userProfile}
                            initialFormValues={userProfile}
                            createInformationBlockFieldsArray={createCommonProfileInfoFieldsArray}
                            getForm={getUpdateCommonProfileInfoForm}
                            colWidths={[3, 21]}
                        />
                    </Spin>

                    {userRole === 'COMPANY' && <CompanyInfoForProfile/>}
                    {userRole === 'STUDENT' && <AdditionalStudentProfileInfo/>}
                </Card>
            </Layout>
        </>
    )
}

export default ProfilePage;