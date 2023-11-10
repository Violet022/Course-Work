import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";

import { useAppDispatch } from "../../../hooks/hooks";
import { selectCompanyId } from "../../../store/authentication/AuthSelectors";

import { getCompanyInfo } from "../../../store/company/CompanyReducer";

import EditableInformationBlock from "../../../components/information/EditableInformationBlock/EditableInformationBlock";
import { createCompanyInfoFieldsArray } from "../../../utils/functions/informationBlockFieldsCreators";
import { getUpdateCompanyInfoForm } from "../../../components/forms/CreateUpdateCompanyInfoForm";
import { selectCompanyInfo, selectIsCompanyInfoFetching } from "../../../store/company/CompanySelectors";

const CompanyInfoForProfile: React.FC = () => {
    const companyId = useSelector(selectCompanyId)
    const companyInfo = useSelector(selectCompanyInfo)
    const isFetching = useSelector(selectIsCompanyInfoFetching)
    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(getCompanyInfo(companyId))
    }, [])

    return (
        <>
            <Spin spinning={isFetching}>
                {
                    !isFetching &&
                    <EditableInformationBlock 
                        title='Информация о компании'
                        infoBlockdata={companyInfo}
                        initialFormValues={companyInfo}
                        createInformationBlockFieldsArray={createCompanyInfoFieldsArray}
                        getForm={getUpdateCompanyInfoForm}
                        colWidths={[3, 21]}
                    />
                }
            </Spin>
        </>
    )
}

export default CompanyInfoForProfile