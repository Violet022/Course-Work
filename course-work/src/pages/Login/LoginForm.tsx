import { Button, Card, Form, Input, Space } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import {
    login, 
    setLoginFormData
} from '../../store/authentication/AuthReducer'
import { checkIfUndefined } from "../../utils/functions/checkers";
import { useAppDispatch } from "../../hooks/hooks";
import EmailInputItem from "../../components/forms/formItems/WithInputs/EmailInputItem";

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()

    const [submittable, setSubmittable] = React.useState(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        if (!!values) {
            dispatch(setLoginFormData({
                email: checkIfUndefined(values.email),
                password : checkIfUndefined(values.password)
            }))
        }
        form.validateFields({ validateOnly: true }).then(
          () => { setSubmittable(true); },
          () => { setSubmittable(false); },
        );
    }, [values]);
    
    const onFinish = () => {
        dispatch(login(values))
    };
    
    return (
        <>
            <Card style={{ width: 600, margin: '0 auto', textAlign: 'center' }}>
                <Title level={3} style={{ marginTop: 0 }}>Вход</Title>
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                    <EmailInputItem formItemName='email' rules={[{ required: true, message: 'Введите email' }]}/>
                    <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
                        <Input.Password 
                            placeholder="Введите пароль" 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" disabled={!submittable}>
                                Вход
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default LoginForm;