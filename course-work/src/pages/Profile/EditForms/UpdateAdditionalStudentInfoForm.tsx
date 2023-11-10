import React from 'react';
import { Form, Input } from 'antd';
import { setUpdatedAdditionalStudentInfo, updateAdditionalStudentInfo } from '../../../store/profile/ProfileReducer';
import { AdditionalStudentInformationType} from '../../../utils/types/types';
import { checkIfUndefined } from '../../../utils/functions/checkers';
import CancelEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/CancelEditButton';
import SubmitEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/SubmitEditButton';
import { useAppDispatch } from '../../../hooks/hooks';
import StackMultipleSelectItem from '../../../components/forms/formItems/WithSelects/StackSelect/StackMultipleSelectItem';
import LanguageMultipleSelectItem from '../../../components/forms/formItems/WithSelects/LanguageSelect/LanguageMultipleSelectItem';
import TechnologyMultipleSelectItem from '../../../components/forms/formItems/WithSelects/TechnologyMultipleSelectItem';

type PropsType = {
    initialValues:  AdditionalStudentInformationType
}

const UpdateAdditionalStudentInfoForm: React.FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const additionalStudentInfo = props.initialValues

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        if(!!values){
            dispatch(setUpdatedAdditionalStudentInfo({
                languages: checkIfUndefined(values.languages),
                stacks: checkIfUndefined(values.stacks),
                resume: values.resume === undefined ? null : values.resume,
                technologies: checkIfUndefined(values.technologies),
            }))
        };
    }, [values]);

    return (
        <>
            <Form form={form} 
                name="validateOnly" 
                layout="vertical" 
                autoComplete="off"
                style={{maxWidth: 900}}
            >
                <StackMultipleSelectItem initialValue={additionalStudentInfo.stacks?.map(val => val.id)}/>
                <LanguageMultipleSelectItem initialValue={additionalStudentInfo.languages?.map(val => val.id)}/>
                <TechnologyMultipleSelectItem formItemLabel='Изученные инструменты' formItemName='technologies' 
                    initialValues={additionalStudentInfo.technologies?.map(val => val.id)} placeholder='Выберите один или более изученный инструмент'
                />
                <Form.Item name="resume" label="Ссылка на резюме"
                        initialValue={additionalStudentInfo.resume} 
                >
                    <Input placeholder="Введите ссылку на резюме"/>
                </Form.Item>
                <Form.Item>
                    <SubmitEditButton form={form}
                                      updateInfo={updateAdditionalStudentInfo}
                    />
                    <CancelEditButton/>
                </Form.Item>
            </Form>
        </>
    )
}

export const getUpdateAdditionalStudentInfoForm = (data: AdditionalStudentInformationType) => {
    return <UpdateAdditionalStudentInfoForm initialValues={data}/>
}