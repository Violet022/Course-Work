import React from 'react';
import {  Col, Form, Input, Row, Select } from 'antd';
import { setUpdatedAdditionalStudentInfo, updateAdditionalStudentInfo } from '../../../store/profile/ProfileReducer';
import { AdditionalStudentInformationType, SelectOptionType, StackAndElementsType} from '../../../utils/types/types';
import { checkIfUndefined } from '../../../utils/functions/checkers';
import CancelEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/CancelEditButton';
import SubmitEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/SubmitEditButton';
import { useAppDispatch } from '../../../hooks/hooks';
import { useSelector } from 'react-redux';
import { selectAllLanguages, selectAllStacks, selectAllTechnologies, selectIsSLTFetching } from '../../../store/stack/StackSelectors';
import { getStacksLanguagesAndTechnologies } from '../../../store/stack/StackReducer';
import { convertSLTArrayToSelectOptionsArray } from '../../../utils/functions/converters';

type PropsType = {
    initialValues:  AdditionalStudentInformationType
}

const UpdateAdditionalStudentInfoForm: React.FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const additionalStudentInfo = props.initialValues

    const isSLTFetching = useSelector(selectIsSLTFetching)
    const stacks = useSelector(selectAllStacks)
    const languages = useSelector(selectAllLanguages)
    const technologies = useSelector(selectAllTechnologies)

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    
    React.useEffect(() => {
        dispatch(getStacksLanguagesAndTechnologies())
    }, [])

    React.useEffect(() => {
        if(!!values){
            console.log(values)
            dispatch(setUpdatedAdditionalStudentInfo({
                languages: checkIfUndefined(values.languages),
                stacks: checkIfUndefined(values.stacks),
                resume: checkIfUndefined(values.resume),
                technologies: checkIfUndefined(values.technologies),
            }))
        };
    }, [values]);

    return (
        <>
            { isSLTFetching
            ? 
                null
            :
            <Form form={form} 
                name="validateOnly" 
                layout="vertical" 
                autoComplete="off"
                style={{maxWidth: 900}}
            >
                <Form.Item name="stacks" label="Предпочитаемые стеки"
                        rules={[{ required: true, message: 'Выберите один или более стек' }]}
                        initialValue={additionalStudentInfo.stacks?.map(val => val.id)}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите стек(и)"
                        options={convertSLTArrayToSelectOptionsArray(stacks)}
                    />
                </Form.Item>
                <Form.Item name="languages" label="Изученные языки"
                           initialValue={additionalStudentInfo.languages?.map(val => val.id)}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите язык(и)"
                        options={convertSLTArrayToSelectOptionsArray(languages)}
                    />
                </Form.Item>
                <Form.Item name="technologies" label="Изученные инструменты"
                           initialValue={additionalStudentInfo.technologies?.map(val => val.id)}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите один или более изученный инструмент"
                        options={convertSLTArrayToSelectOptionsArray(technologies)}
                    />
                </Form.Item>
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
            }
        </>
    )
}

export const getUpdateAdditionalStudentInfoForm = (data: AdditionalStudentInformationType) => {
    return <UpdateAdditionalStudentInfoForm initialValues={data}/>
}