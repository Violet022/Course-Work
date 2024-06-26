import { Button, Col, Form, Input, Row} from 'antd';
import React, { useContext, useState } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import { useAppDispatch } from '../../../hooks/hooks';
import { checkIfUndefined } from '../../../utils/functions/checkers';
import { createNewUser, setNewUser } from '../../../store/administration/AdministrationReducer';
import AllGroupsSelectItem from '../../../components/forms/formItems/WithSelects/AllGroupsSelectItem';
import AllCompaniesSelectItem from '../../../components/forms/formItems/WithSelects/AllCompaniesSelectItem';

type PropsType = {
    userRole: 'STUDENT' | 'SCHOOL' | 'COMPANY' | 'CURATOR'
}

const CreateUserForm: React.FC<PropsType> = (props) => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useAppDispatch()

    const onReset = () => {
        form.resetFields();
    };
    const onSubmit = () => {
        // visibilityContext.toggleVisibilitySwitcher()
        dispatch(createNewUser())
        form.resetFields();
    }
    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
        .then(
          () => {setSubmittable(true);},
          () => {setSubmittable(false);},
        )
        .then(() => {
            if(!!values){
                dispatch(setNewUser({
                    companyId: values.companyId === undefined ? null : values.companyId,
                    email: checkIfUndefined(values.email),
                    firstName: checkIfUndefined(values.firstName),
                    groupNumber: values.stGroupNumber === undefined ? null : values.stGroupNumber,
                    lastName: checkIfUndefined(values.lastName),
                    password: checkIfUndefined(values.password),
                    patronym: checkIfUndefined(values.patronym),
                    role: props.userRole
                }))
            }
        });
    }, [values]);

    return (
        <>
            <Form form={form} 
                name="createUserForm" 
                layout="vertical" 
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="lastName" label="Фамилия" 
                                rules={[{ required: true, message: 'Введите фамилию' }]}
                                initialValue={null}
                        >
                            <Input placeholder="Введите фамилию"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="firstName" label="Имя" 
                                rules={[{ required: true, message: 'Введите имя' }]}
                                initialValue={''}
                        >
                            <Input placeholder="Введите имя"/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="patronym" label="Отчество">
                            <Input placeholder="Введите отчество"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <AllCompaniesSelectItem userRole={props.userRole}/>
                    </Col>
                    <Col span={12}>
                        <AllGroupsSelectItem userRole={props.userRole}/>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item name="email" label="Email" 
                                rules={[{ required: true, message: 'Введите email' },
                                        { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email'}]}>
                            <Input
                                placeholder="Введите email"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
                            <Input.Password 
                                placeholder="Введите пароль" 
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}} onClick={onSubmit}>
                    Создать
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Очистить поля формы
                </Button>
            </Form.Item>
        </>
    )
}

export default CreateUserForm;