import { Button, Col, DatePicker, Form, Input, Row, TimePicker} from 'antd';
import React, { useContext} from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { CreateUpdateInterviewType} from '../../utils/types/types';
import { checkIfUndefined } from '../../utils/functions/checkers';
import { VisibilityContext } from '../contexts/VisibilityContext';
import { setNewInterview, sheduleAnInterview } from '../../store/application/ApplicationReducer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
import { getUTCDateTimeFromDateAndTime_ISO } from '../../utils/functions/dateHandler';

dayjs.extend(utc)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1
})

type PropsType = {
    initialValues:  CreateUpdateInterviewType,
    onChangeValues: (interview : CreateUpdateInterviewType) => void,
    onSubmit: () => void 
}

const CreateUpdateInterviewForm: React.FC<PropsType> = (props) => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    
    const dispatch = useAppDispatch()
    
    const interviewData = props.initialValues

    const onReset = () => {
        form.resetFields();
    };
    const onSubmit = () => {
        visibilityContext.toggleVisibilitySwitcher()
        dispatch(props.onSubmit())
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
                let date: string = ''
                if(!!values.date && !!values.time) {
                    date = getUTCDateTimeFromDateAndTime_ISO(values.date, values.time)  
                }
                dispatch(props.onChangeValues({
                    date: date,
                    location: checkIfUndefined(values.location)
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
                style={{maxWidth: 900}}
            >
                <Row justify="space-between">
                    <Col style={{width: "49%"}}>
                        <Form.Item name="date" label="Дата"
                            rules={[{ required: true, message: 'Выберите дату собеседования'},
                                    () => ({
                                        validator(_, value) {
                                            if (!value || value.valueOf() + 86400000 >= dayjs().valueOf()) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Выбранная дата не может быть меньше текущей'))
                                        },
                                    }),
                            ]}
                        >
                            <DatePicker placeholder="Выберите дату собеседования"        
                                    format={'DD.MM.YYYY'}
                                    style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>
                    <Col style={{width: "49%"}}>
                        <Form.Item name="time" label="Время"
                            rules={[{ required: true, message: 'Выберите время собеседования' }]}
                        >
                            <TimePicker placeholder="Выберите время собеседования"
                                format={'HH:mm'}
                                style={{width: "100%"}}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="location" label="Место проведения собеседования" 
                    initialValue={interviewData.location}
                >
                    <Input placeholder="Введите место проведения собеседования"/>
                </Form.Item>
                <Form.Item>
                    <Button className='left-button-in-two-buttons' type="primary" htmlType="submit" disabled={!submittable} onClick={onSubmit}>
                        Назначить
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Очистить поля формы
                    </Button>
                </Form.Item>
            </Form>
            
        </>
    )
}

export const getCreateInterviewForm = (data: CreateUpdateInterviewType) => {
        return <CreateUpdateInterviewForm
                    initialValues={data}
                    onChangeValues={setNewInterview}
                    onSubmit={sheduleAnInterview}
                />
}
export default CreateUpdateInterviewForm;