import React from "react"
import { ApplicationType } from "../../../utils/types/types";
import TitleWithSubtitle from "../../../components/information/Titles/TitleWithSubtitle";
import AcceptOfferButton from "./AcceptOfferButton";
import RejectOfferButton from "./RejectOfferButton";
import ApplicationStatusTimeline from "../../../components/information/Timeline/ApplicationStatusTimeline";

type PropsType = {
    applicationInfo: ApplicationType,
    lastStatus: string | null
}

const ApplicationForStudentContainer: React.FC<PropsType> = (props) => {
    const applicationInfo = props.applicationInfo

    return (
        <>
            <TitleWithSubtitle titlesLevels={[3,5]} title={applicationInfo.position} subTitle={applicationInfo.companyName}/>
            <ApplicationStatusTimeline applicationInfo={applicationInfo}/>
            {
                props.lastStatus !== null && props.lastStatus === 'Ожидается ответ от студента'
                ?
                    <>
                        <AcceptOfferButton/>
                        <RejectOfferButton/>
                    </>
                :   null
            }
        </>
    )
}

export default ApplicationForStudentContainer;