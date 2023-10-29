import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import { useAppDispatch } from "../../../hooks/hooks";

import { selectUserId } from "../../../store/authentication/AuthSelectors";
import { selectAdditionalStudentInfo, selectIsAdditionalStudentInfoFetching } from "../../../store/profile/ProfileSelectors";

import { getAdditionalStudentInfo } from "../../../store/profile/ProfileReducer";

import EditableInformationBlock from "../../../components/information/EditableInformationBlock/EditableInformationBlock";
import { createAdditionalStudentProfileInfoFieldsArray } from "../../../utils/functions/informationBlockFieldsCreators";
import { getUpdateAdditionalStudentInfoForm } from "../EditForms/UpdateAdditionalStudentInfoForm";

const AdditionalStudentProfileInfo: React.FC = () => {
    const studentId = useSelector(selectUserId)
    const additionalStudentInfo = useSelector(selectAdditionalStudentInfo)
    const isFetching = useSelector(selectIsAdditionalStudentInfoFetching)
    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(getAdditionalStudentInfo(studentId))
    }, [])

    return (
        <>
            <Spin spinning={isFetching}>
                <EditableInformationBlock 
                    title='Дополнительная информация'
                    infoBlockdata={additionalStudentInfo}
                    initialFormValues={additionalStudentInfo}
                    createInformationBlockFieldsArray={createAdditionalStudentProfileInfoFieldsArray}
                    getForm={getUpdateAdditionalStudentInfoForm}
                    colWidths={[4, 20]}
                />
            </Spin>
        </>
    )
}

export default AdditionalStudentProfileInfo