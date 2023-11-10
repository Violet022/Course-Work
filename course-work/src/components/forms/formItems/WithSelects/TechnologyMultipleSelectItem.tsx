import React from "react";
import { useTechnology } from "../../../../hooks/useTechnologyHook";
import { Form, Select } from "antd";
import { convertSLTArrayToSelectOptionsArray } from "../../../../utils/functions/converters";

type PropsType = {
    formItemName: string,
    formItemLabel: string,
    initialValues?: Array<number>,
    placeholder: string
}

const TechnologyMultipleSelectItem: React.FC<PropsType> = (props) => {
    const {technologies, areFetching} = useTechnology()
    return (
        <Form.Item name={props.formItemName} label={props.formItemLabel}
                initialValue={props.initialValues}
        >
            <Select
                mode="multiple"
                allowClear
                loading={areFetching}
                style={{ width: '100%' }}
                placeholder={props.placeholder}
                options={convertSLTArrayToSelectOptionsArray(technologies)}
            />
        </Form.Item>
    )
}

export default TechnologyMultipleSelectItem