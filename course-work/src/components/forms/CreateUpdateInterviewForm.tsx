import { Button, Col, DatePicker, DatePickerProps, Form, Input, Row, Select, TimePicker} from 'antd';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import TextArea from 'antd/es/input/TextArea';
import { getStacksLanguagesAndTechnologies } from '../../store/stack/StackReducer';
import { 
    selectAllLanguages,
    selectAllStacks, 
    selectAllTechnologies, 
    selectIsSLTFetching } from '../../store/stack/StackSelectors';
import { convertSLTArrayToSelectOptionsArray } from '../../utils/functions/converters';
import { useAppDispatch } from '../../hooks/hooks';
import { CreateUpdateInterviewType, CreateUpdatePositionType } from '../../utils/types/types';
import { checkIfUndefined } from '../../utils/functions/checkers';
import { VisibilityContext } from '../contexts/VisibilityContext';
import { setUpdatedPositionInfo, updatePositionInfo } from '../../store/position/PositionReducer';
import { setNewInterview, sheduleAnInterview } from '../../store/application/ApplicationReducer';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';

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

const getUTCInterviewDate = (date: Dayjs, time: Dayjs) => {
    let dateTimeForm = dayjs()
                       .set('year', date.year())
                       .set('month', date.month())
                       .set('date', date.date())
                       .set('hour', time.hour())
                       .set('minute', time.minute())
                       .set('second', 0)
    let dateTimeFormWithUTC = dateTimeForm.utc().toISOString()
    return dateTimeFormWithUTC
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
        visibilityContext.toggleSwitcher()
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
                    date = getUTCInterviewDate(values.date, values.time)  
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
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.valueOf() + 86400000 >= dayjs().valueOf()) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Выбранная дата не может быть меньше текущей'))
                                        },
                                    }),
                            ]}
                            // initialValue={interviewData.date}
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
                            // initialValue={positionData.languageId}
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