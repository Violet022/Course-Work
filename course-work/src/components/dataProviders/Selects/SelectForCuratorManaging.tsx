import React, { useCallback, useContext, useState } from "react";
import { RowToManageCuratorsContext } from "../../contexts/RowToManageCuratorsContext";
import { CompanyDtoType, SelectOptionType, ShortCuratorType } from "../../../utils/types/types";
import { Select, Spin } from "antd";
import { useSelectedValues } from "../../contexts/SelectedValuesContext";
import { companyServiceAPI } from "../../../api/company-service-api";
import { getAllCuratorsShortInfo } from "../../../store/curators/CuratorsReducer";

const SelectForCuratorManaging: React.FC = () => {
    const rowContext = useContext(RowToManageCuratorsContext)
    const selectedValuesContext = useSelectedValues()
    
    const [ options, setOptions ] = useState<Array<SelectOptionType>>([]);
    const [ areOptionsFetching, setAreOptionsFetching ] = useState(false);

    const onSelectClick = useCallback(async (open: boolean) => {
        if (open === true) {
            setAreOptionsFetching(true)
            const currentEntityToSelectIds = rowContext.tags.map(tag => tag.id)
            const entitiesToSelect = rowContext.entityToSelect === 'COMPANY' 
                                     ? await companyServiceAPI.getAllCompanies()
                                     : await getAllCuratorsShortInfo()
            setOptions(entitiesToSelect
                       .filter((entityToSelect: CompanyDtoType | ShortCuratorType) => currentEntityToSelectIds.indexOf(entityToSelect.id) === -1)
                       .map((entityToSelect: CompanyDtoType | ShortCuratorType) => {
                            return {
                                value: entityToSelect.id,
                                label: entityToSelect.name
                            }
                        })
            )
            setAreOptionsFetching(false)
        }
    }, [])

    return (
        <Select
            style={{width:'200px', height: '32px'}}
            maxTagCount='responsive'
            mode="multiple"
            allowClear
            value={selectedValuesContext.selectedValues}
            placeholder={rowContext.entityToSelect === 'COMPANY' ? "Выберите компанию(и)": "Выберите куратора(ов)"}
            notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
            options={options}
            onDropdownVisibleChange={(e) => {onSelectClick(e)}}
            onChange={(value: string[]) => {
                selectedValuesContext.setSelectedValues(value as string[])
            }}
        />
    )
}

export default SelectForCuratorManaging