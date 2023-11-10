import React from "react";
import { useSelector } from "react-redux";
import { selectCuratorCompanies } from "../../../../store/authentication/AuthSelectors";
import { CuratorCompanyType } from "../../../../utils/types/types";
import { Form, Select } from "antd";

const SelectWithCuratorCompanies: React.FC = () => {
    const curatorCompanies: Array<CuratorCompanyType> = useSelector(selectCuratorCompanies)

    return (
        <>
            <Form.Item name="companyId" label="Компания"
                       rules={[{ required: true, message: 'Выберите компанию' }]}
            >
                <Select
                    placeholder="Выберите компанию"
                    allowClear
                    options={curatorCompanies.map((curatorCompany) => { 
                        return {value: curatorCompany.id, label: curatorCompany.name}
                    })}
                />
            </Form.Item>
        </>
    )
}

export default SelectWithCuratorCompanies