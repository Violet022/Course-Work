import { Form, Select, Spin } from "antd";
import React from "react";
import { convertSLTArrayToSelectOptionsArray } from "../../../../../utils/functions/converters";
import { useLanguage } from "../../../../../hooks/useLanguageHook";

type PropsType = {
    initialValue?: Array<number>,
}

const LanguageMultipleSelectItem: React.FC<PropsType> = (props) => {
    const {languages, areFetching} = useLanguage()

    return (
        <Form.Item name="languages" label="Изученные языки"
            initialValue={props.initialValue}
        >
            <Select
                mode="multiple"
                allowClear
                loading={areFetching}
                notFoundContent={areFetching ? <Spin size="small" /> : null}
                style={{ width: '100%' }}
                placeholder="Выберите язык(и)"
                options={convertSLTArrayToSelectOptionsArray(languages)}
            />
        </Form.Item>
    )
}

export default LanguageMultipleSelectItem