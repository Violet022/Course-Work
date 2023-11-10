import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import React from "react";

type PropsType = {
    formItemName: string,
    initialValue?: string,
    rules?: Array<Rule>
}

const EmailInputItem: React.FC<PropsType> = (props) => {
    const rules = props.rules === undefined ? [] : props.rules
    return (
        <Form.Item name={props.formItemName} label="Email"
            rules={[...rules, { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email'}]} 
            initialValue={props.initialValue}
        >
            <Input placeholder="Введите email"/>
        </Form.Item>
    )
}

export default EmailInputItem