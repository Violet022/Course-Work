import React from "react"
import { ApplicationType, StudentApplicationInfoType } from "../../../utils/types/types";
import TitleWithSubtitle from "../../../components/information/Titles/TitleWithSubtitle";
import { selectStudentApplicationInfo } from "../../../store/application/ApplicationSelectors";
import { useSelector } from "react-redux";
import InformationBlock from "../../../components/information/InformationBlock/InformationBlock";
import { createApplicationStudentInfoFieldsArray } from "../../../utils/functions/informationBlockFieldsCreators";
import ApplicationStatusTimeline from "../../../components/information/Timeline/ApplicationStatusTimeline";
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
            <TitleWithSubtitle titlesLevels={[3,5]} title={studentApplicationInfo.fio} subTitle={`На позицию ${props.applicationInfo.position}`}/>
            <InformationBlock fields={createApplicationStudentInfoFieldsArray(studentApplicationInfo)} 
                                            colWidths={[3, 21]}/>
            <ApplicationStatusTimeline applicationInfo={props.applicationInfo}/>
            {
                (props.lastStatus !== null && !props.lastStatus.includes('оффер') && !props.lastStatus.includes('от студента')) &&
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