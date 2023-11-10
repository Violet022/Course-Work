import { Form, Select, Spin } from "antd";
import React from "react";
import { convertSLTArrayToSelectOptionsArray } from "../../../../../utils/functions/converters";
import { useStack } from "../../../../../hooks/useStackHook";

type PropsType = {
    initialValue?: Array<number>,
}

const StackMultipleSelectItem: React.FC<PropsType> = (props) => {
    const {stacks, areFetching} = useStack()

    return (
        <Form.Item name="stacks" label="Предпочитаемые стеки"
            rules={[{ required: true, message: 'Выберите один или более стек' }]}
            initialValue={props.initialValue}
        >
            <Select
                mode="multiple"
                allowClear
                loading={areFetching}
                notFoundContent={areFetching ? <Spin size="small" /> : null}
                style={{ width: '100%' }}
                placeholder="Выберите стек(и)"
                options={convertSLTArrayToSelectOptionsArray(stacks)}
            />
        </Form.Item>
    )
}

export default StackMultipleSelectItem