import React, { useCallback, useState } from "react";
import { Select, Spin } from "antd";
import { CompanyDtoType, SelectOptionType } from "../../../utils/types/types";
import { companyServiceAPI } from "../../../api/company-service-api";

type PropsType = {
    isDisabled: boolean
}

const AllCompaniesSelect: React.FC<PropsType> = ({isDisabled}) => {
    const [ options, setOptions ] = useState<Array<SelectOptionType>>([]);
    const [ areOptionsFetching, setAreOptionsFetching ] = useState(false);

    const getCompaniesSelectOptions = useCallback( async () => {
        const companies = await companyServiceAPI.getAllCompanies()
        setOptions(companies.map((company: CompanyDtoType) => {
            return {
                value: company.id,
                label: company.name
            }
        }))
    }, []);

    const onSelectClick = (open: boolean) => {
        if (open === true) {
            setAreOptionsFetching(true)
            getCompaniesSelectOptions()
                .then(() => setAreOptionsFetching(false))
        }
    }

    return (
        <Select
            allowClear
            disabled={isDisabled}
            placeholder="Выберите компанию"
            notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
            options={options}
            onDropdownVisibleChange={(e) => {onSelectClick(e)}}
        />
    )
}

export default AllCompaniesSelect