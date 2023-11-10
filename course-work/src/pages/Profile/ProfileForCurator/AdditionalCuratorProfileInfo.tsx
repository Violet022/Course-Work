import React from "react";
import { useSelector } from "react-redux";

import { selectAdditionalCuratorInfo } from "../../../store/authentication/AuthSelectors";

import Title from "antd/es/typography/Title";
import InformationBlock from "../../../components/information/InformationBlock/InformationBlock";

const AdditionalCuratorProfileInfo: React.FC = () => {
    const additionalCuratorInfo = useSelector(selectAdditionalCuratorInfo)

    const fieldValue = additionalCuratorInfo.isAttachedToCompany 
                       ? additionalCuratorInfo.companies.map(company => company.name).join(', ') 
                       : 'нет закрепленных компаний'

    return (
        <>
        <div style={{marginBottom: 16}}>
            <div style={{marginBottom: 8}} >
                <Title level={5} style={{ marginBlock: 0, fontSize: 18}}>
                    Дополнительная информация
                </Title>
            </div>
            <InformationBlock fields={[{title: 'Курируемые компании', text: fieldValue}]} colWidths={[3, 21]}/>
        </div>
        </>
    )
}

export default AdditionalCuratorProfileInfo