import React, { useCallback, useState } from "react";
import { Form, Select, Spin } from "antd";
import { CompanyDtoType, SelectOptionType } from "../../../../utils/types/types";
import { companyServiceAPI } from "../../../../api/company-service-api";


type PropsType = {
    userRole: 'STUDENT' | 'SCHOOL' | 'COMPANY' | 'CURATOR'
}

const AllCompaniesSelectItem: React.FC<PropsType> = ({userRole}) => {
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
        <Form.Item name="companyId" label="Компания"
                className={`form-item-${userRole !== 'COMPANY' ? 'disabled' : 'not-disables'}`}
                rules={[{ required: userRole === 'COMPANY', message: 'Выберите компанию' }]}
        >
            <Select
                allowClear
                disabled={userRole !== 'COMPANY'}
                placeholder="Выберите компанию"
                notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
                options={options}
                onDropdownVisibleChange={(e) => {onSelectClick(e)}}
            />
        </Form.Item>
    )
}

export default AllCompaniesSelectItem