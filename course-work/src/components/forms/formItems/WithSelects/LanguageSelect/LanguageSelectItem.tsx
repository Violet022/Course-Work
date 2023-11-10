import { Form, Select } from "antd";
import React from "react";
import { convertSLTArrayToSelectOptionsArray } from "../../../../../utils/functions/converters";
import { useLanguage } from "../../../../../hooks/useLanguageHook";

type PropsType = {
    initialValue?: string | number | null,
}

const LanguageSelectItem: React.FC<PropsType> = (props) => {
    const {languages, areFetching} = useLanguage()
    
    return (
        <Form.Item name="languageId" label="Основной используемый язык"
            initialValue={props.initialValue}
        >
            <Select
                placeholder="Выберите основной используемый язык"
                loading={areFetching}
                options={[{value: -1, label: 'не указано'}, ...convertSLTArrayToSelectOptionsArray(languages)]}
            />
        </Form.Item>
    )
}

export default LanguageSelectItem