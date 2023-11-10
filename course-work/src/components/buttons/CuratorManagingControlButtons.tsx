import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useCallback, useContext } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { RowToManageCuratorsContext } from "../contexts/RowToManageCuratorsContext";
import { useSelectedValues } from "../contexts/SelectedValuesContext";
import { VisibilityContext } from "../contexts/VisibilityContext";
import { addCompanyToCurator } from "../../store/curators/CuratorsReducer";
import { addCuratorsToCompany } from "../../store/companies/CompaniesReducer";

const CuratorManagingControlButtons: React.FC = () => {
    const rowContext = useContext(RowToManageCuratorsContext)
    const visibilityContext = useContext(VisibilityContext)
    const selectedValuesContext = useSelectedValues()
    const dispatch = useAppDispatch()

    const finishToWorkWithSelect = useCallback(() => {
        visibilityContext.toggleVisibilitySwitcher(false)
        selectedValuesContext.setSelectedValues([])
    }, [])

    const handleSubmitButtonClick = () => {
        if(rowContext.entityToSelect === 'COMPANY')
            dispatch(addCompanyToCurator(rowContext.entityWithWhichAssociateSelectedValuesId, selectedValuesContext.selectedValues))
        else 
            dispatch(addCuratorsToCompany(rowContext.entityWithWhichAssociateSelectedValuesId, selectedValuesContext.selectedValues))
        finishToWorkWithSelect()
    }

    return (
        <Space.Compact block> 
            <Button type="primary" icon={<CheckOutlined />} onClick={handleSubmitButtonClick}/>
            <Button type="primary" icon={<CloseOutlined />} onClick={finishToWorkWithSelect} danger/>
        </Space.Compact>
    )
}

export default CuratorManagingControlButtons