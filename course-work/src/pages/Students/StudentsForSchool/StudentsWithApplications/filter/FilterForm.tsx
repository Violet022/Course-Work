import React, { useState } from "react";
import { FilterFormColType } from "../../../../../utils/types/types";
import { Button, Checkbox, Form, Row } from "antd";
import FormItemTreeSelectCol from "./FormItemTreeSelectCol";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFilter } from "../../../../../components/contexts/FilterContext";

const colData: Array<FilterFormColType> = [
    {name: 'groupNumber', label: 'Группы', placeholder: 'Выберите группу(ы)'},
    {name: 'position', label: 'Позиции', placeholder: 'Выберите позицию(и)'},
    {name: 'stack', label: 'Стеки', placeholder: 'Выберите стек(и)'},
    {name: 'companyName', label: 'Компании', placeholder: 'Выберите компанию(и)'},
    {name: 'statusHistory', label: 'Статусы заявки', placeholder: 'Выберите статус(ы) заявки'},
]

const FilterForm: React.FC = () => {
    const {filteredInfo, setFilteredInfo} = useFilter()
    const [checked, setChecked] = useState(false)
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    const setFilters = () => {
        if (!!values) {
            setFilteredInfo({
                ...filteredInfo,
                groupNumber: values.groupNumber === undefined ? [] : values.groupNumber,
                position: values.position === undefined ? [] : values.position,
                stack: values.stack === undefined ? [] : values.stack,
                companyName: values.companyName === undefined ? [] : values.companyName,
                priority: checked ? [checked] : null,
                status: values.statusHistory === undefined ? [] : values.statusHistory
            })
        }
    };

    const clearFilters = () => {
        form.resetFields()
        setFilteredInfo({});
    };

    return (
        <Form 
            className="students-table-filters"
            form={form} 
            name="validateOnly" 
            layout="vertical" 
            autoComplete="off"
            style={{marginBottom: 4}}
        >
            <Row justify="center" gutter={[16, 16]}>
            {
                colData.map(colDataItem => <FormItemTreeSelectCol {...colDataItem}/>)
            }             
            </Row>
            <Form.Item>
                <Checkbox defaultChecked={false} style={{marginBottom: 12}}
                    onChange={(e: CheckboxChangeEvent) => {setChecked(e.target.checked)}}
                >
                    Не показывать студентов, приоритет заявки которых не указан
                </Checkbox>
            </Form.Item>
            <Button className="left-button-in-two-buttons" type="primary" onClick={setFilters}>Применить</Button>
            <Button onClick={clearFilters}>Очистить фильтр</Button>
        </Form>
    )
}

export default FilterForm
