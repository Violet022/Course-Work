import React from 'react';
import {  Col, Form, Input, Row } from 'antd';
import { setUpdatedCompanyInfo, updateCompanyInfo} from '../../store/company/CompanyReducer';
import { CompanyDtoType, CreateUpdateCompanyType} from '../../utils/types/types';
import { checkIfUndefined } from '../../utils/functions/checkers';
import CancelEditButton from '../information/EditableInformationBlock/EditFormButtons/CancelEditButton';
import SubmitEditButton from '../information/EditableInformationBlock/EditFormButtons/SubmitEditButton';
import { useAppDispatch } from '../../hooks/hooks';
import TextArea from 'antd/es/input/TextArea';
import { createNewCompany, setNewCompany } from '../../store/company/CompanyReducer';
import EmailInputItem from './formItems/WithInputs/EmailInputItem';

type PropsType = {
    initialValues:  CompanyDtoType | CreateUpdateCompanyType
    onChangeValues: (company : CreateUpdateCompanyType) => void,
    onSubmit: () => void  
}

const CreateUpdateCompanyInfoForm: React.FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const companyInfo = props.initialValues

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        if(!!values){
            dispatch(props.onChangeValues({
                address: checkIfUndefined(values.address),
                contacts: checkIfUndefined(values.contacts),
                description: checkIfUndefined(values.description),
                logoURL: checkIfUndefined(values.logoURL),
                name: checkIfUndefined(values.name),
                websiteURL: checkIfUndefined(values.websiteURL),
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
                <Form.Item name="name" label="Название" 
                        rules={[{ required: true, message: 'Введите название' }]}
                        initialValue={companyInfo.name}
                >
                    <Input placeholder="Введите название"/>
                </Form.Item>
                <Form.Item name="description" label="Описание" 
                        initialValue={companyInfo.description}
                >
                    <TextArea placeholder="Введите описание" autoSize allowClear/>
                </Form.Item>
                <Form.Item name="logoURL" label="Ссылка на логотип" 
                        rules={[{ pattern: new RegExp('([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif)$'), message: 'Введите корректный URL'}]} 
                        initialValue={companyInfo.logoURL}
                >
                    <Input placeholder="Введите ссылку на логотип"/>
                </Form.Item>
                <Form.Item name="websiteURL" label="Ссылка на сайт компании" 
                        initialValue={companyInfo.websiteURL}
                >
                    <Input placeholder="Введите ссылку на сайт компании"/>
                </Form.Item>
                <Row justify="space-between">
                    <Col style={{width: "49%"}}>
                        <Form.Item name="address" label="Адрес"
                            initialValue={companyInfo.address}
                        >
                            <Input placeholder="Введите адрес компании"/>
                        </Form.Item>
                    </Col>
                    <Col style={{width: "49%"}}>
                        <EmailInputItem formItemName='contacts' 
                            initialValue={companyInfo.contacts === null ? undefined : companyInfo.contacts}
                        />
                    </Col>
                </Row>
                <Form.Item>
                    <SubmitEditButton form={form}
                                      updateInfo={props.onSubmit}
                    />
                    <CancelEditButton/>
                </Form.Item>
            </Form>
        </>
    )
}

export const getUpdateCompanyInfoForm = (data: CompanyDtoType) => {
    return <CreateUpdateCompanyInfoForm initialValues={data} onChangeValues={setUpdatedCompanyInfo} onSubmit={updateCompanyInfo}/>
}

export const getCreateCompanyInfoForm = (data: CreateUpdateCompanyType) => {
    return <CreateUpdateCompanyInfoForm initialValues={data} onChangeValues={setNewCompany} onSubmit={createNewCompany}/>
}
