import { Form, Select, Spin } from "antd";
import React from "react";
import { convertSLTArrayToSelectOptionsArray } from "../../../../../utils/functions/converters";
import { useStack } from "../../../../../hooks/useStackHook";

type PropsType = {
    initialValue?: string | number | null,
}

const StackSelectItem: React.FC<PropsType> = (props) => {
    const {stacks, areFetching} = useStack()

    return (
        <Form.Item name="stackId" label="Стек"
                rules={[{ required: true, message: 'Выберите стек позиции' }]}
                initialValue={props.initialValue}
        >
            <Select
                placeholder='Выберите стек позиции'
                loading={areFetching}
                notFoundContent={areFetching ? <Spin size="small" /> : null}
                options={convertSLTArrayToSelectOptionsArray(stacks)}
            />
        </Form.Item>
    )
}

export default StackSelectItem