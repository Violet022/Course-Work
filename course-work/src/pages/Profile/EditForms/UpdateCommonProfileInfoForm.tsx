import React from 'react';
import {  Col, Form, Input, Row } from 'antd';
import { setUpdatedProfileInfo, updateProfileInfo } from '../../../store/profile/ProfileReducer';
import { UserType} from '../../../utils/types/types';
import { checkIfUndefined } from '../../../utils/functions/checkers';
import CancelEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/CancelEditButton';
import SubmitEditButton from '../../../components/information/EditableInformationBlock/EditFormButtons/SubmitEditButton';
import { useAppDispatch } from '../../../hooks/hooks';

type PropsType = {
    currentData:  UserType
}

const UpdateCommonProfileInfoForm: React.FC<PropsType> = (props) => {
    const dispatch = useAppDispatch()
    const commonUserProfileInfo = props.currentData

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        if(!!values){
            dispatch(setUpdatedProfileInfo({
                email: checkIfUndefined(values.email),
                firstName: checkIfUndefined(values.firstName),
                lastName: checkIfUndefined(values.lastName),
                patronym: checkIfUndefined(values.patronym)
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
                <Row justify="space-between">
                    <Col style={{width: "32%"}}>
                        <Form.Item name="lastName" label="Фамилия"
                            rules={[{ required: true, message: 'Введите фамилию' }]}
                            initialValue={commonUserProfileInfo.lastName}
                        >
                            <Input placeholder="Введите фамилию"/>
                        </Form.Item>
                    </Col>
                    <Col style={{width: "32%"}}>
                        <Form.Item name="firstName" label="Имя" 
                            rules={[{ required: true, message: 'Введите имя' }]}
                            initialValue={commonUserProfileInfo.firstName}
                                        >
                            <Input placeholder="Введите имя"/>
                        </Form.Item>
                    </Col>
                    <Col style={{width: "32%"}}>
                        <Form.Item name="patronym" label="Отчество"
                            initialValue={commonUserProfileInfo.patronym} 
                        >
                            <Input placeholder="Введите отчество"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="email" label="Электронная почта" 
                        rules={[{ required: true, message: 'Введите электронную почту' }]}
                        initialValue={commonUserProfileInfo.email}
                >
                    <Input placeholder="Введите электронную почту"/>
                </Form.Item>
                <Form.Item>
                    <SubmitEditButton form={form}
                                      updateInfo={updateProfileInfo}
                    />
                    <CancelEditButton/>
                </Form.Item>
            </Form>
        </>
    )
}

export const getUpdateCommonProfileInfoForm = (data: UserType) => {
    return <UpdateCommonProfileInfoForm currentData={data}/>
}