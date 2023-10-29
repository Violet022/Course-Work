import { Button } from "antd";
import React, { useState } from "react"
import ActionConfirmationModal from "../../../components/feedbacks/ActionConfirmationModal";
import { acceptOrRejectOffer } from "../../../store/application/ApplicationReducer";
import { ApplicationType, StudentApplicationInfoType } from "../../../utils/types/types";
import TitleWithSubtitle from "../../../components/information/Titles/TitleWithSubtitle";
import { selectStudentApplicationInfo } from "../../../store/application/ApplicationSelectors";
import { useSelector } from "react-redux";
import InformationBlock from "../../../components/information/InformationBlock/InformationBlock";
import { createApplicationStudentInfoFieldsArray } from "../../../utils/functions/informationBlockFieldsCreators";
import ApplicationStatusTimeline from "../../../components/information/Timeline/ApplicationStatusTimeline";
import CreateUpdateInterviewForm, { getCreateInterviewForm } from "../../../components/forms/CreateUpdateInterviewForm";
import CreatingInterviewButton from "./CreatingInterviewButton";
import GiveAnswerToStudentButton from "./GiveAnswerToStudentButton";


type PropsType = {
    applicationInfo: ApplicationType,
    lastStatus: string | null
}

const ApplicationForCompanyContainer: React.FC<PropsType> = (props) => {
    const studentApplicationInfo: StudentApplicationInfoType = useSelector(selectStudentApplicationInfo)
    return (
        <>
            <TitleWithSubtitle title={studentApplicationInfo.fio} subTitle={`На позицию ${props.applicationInfo.position}`}/>
            <InformationBlock fields={createApplicationStudentInfoFieldsArray(studentApplicationInfo)} 
                                            colWidths={[3, 21]}/>
            <ApplicationStatusTimeline applicationInfo={props.applicationInfo}/>
            {
                (props.lastStatus !== null && props.lastStatus === 'Подана заявка') &&
                <CreatingInterviewButton/>
            }
            {
                (props.lastStatus !== null && props.lastStatus.includes('Ожидается ответ от компании')) &&
                <GiveAnswerToStudentButton/>
            }
            
        </>
    )
}

export default ApplicationForCompanyContainer;