import { Button, Card, Form, Input, Layout, Space } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import {
    LoginDataFormType, 
    login, 
    setLoginFormData
} from '../../store/authentication/AuthReducer'
import { checkIfUndefined } from "../../utils/functions/checkers";
import { useAppDispatch } from "../../hooks/hooks";

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
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                <Card style={{ width: 600, margin: '0 auto', textAlign: 'center' }}>
                    <Title level={3} style={{ marginTop: 0 }}>Вход</Title>
                    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
                        <Form.Item name="email" label="Email" 
                                   rules={[{ required: true, message: 'Введите email' },
                                           { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email'}]}>
                            <Input
                                placeholder="Введите email"
                            />
                        </Form.Item>
                        <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]}>
                            <Input.Password 
                                placeholder="Введите пароль" 
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" 
                                        htmlType="submit" 
                                        disabled={!submittable}
                                >
                                    Вход
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout>
        </>
    )
}

export default LoginForm;