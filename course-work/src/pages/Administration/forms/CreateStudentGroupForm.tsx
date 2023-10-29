import { Button, Form, Input} from 'antd';
import React, { useContext } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import { useAppDispatch } from '../../../hooks/hooks';
import { createNewGroup, setNewGroup } from '../../../store/groups/GroupsReducer';
import { checkIfUndefined } from '../../../utils/functions/checkers';

const CreateStudentGroupForm: React.FC = () => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useAppDispatch()

    const onReset = () => {
        form.resetFields();
    };
    const onSubmit = () => {
        visibilityContext.toggleSwitcher()
        dispatch(createNewGroup())
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
                dispatch(setNewGroup({
                    groupNumber: checkIfUndefined(values.groupNumber)
                }))
            }
        });
    }, [values]);

    return (
        <>
            <Form form={form} 
                name="validateOnly" 
                layout="vertical" 
                autoComplete="off"
                // style={{maxWidth: 900}}
            >
                <Form.Item name="groupNumber" label="Номер группы" 
                    rules={[{ required: true, message: 'Введите номер группы' }]}
                    initialValue={''}
                >
                    <Input placeholder="Введите номер группы"/>
                </Form.Item>
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

export default CreateStudentGroupForm;