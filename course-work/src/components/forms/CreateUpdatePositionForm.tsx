import { Button, Col, Form, Input, Row, Select} from 'antd';
import React, { useContext } from 'react';
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
import { CreateUpdatePositionType } from '../../utils/types/types';
import { checkIfUndefined } from '../../utils/functions/checkers';
import { VisibilityContext } from '../contexts/VisibilityContext';
import { setUpdatedPositionInfo, updatePositionInfo } from '../../store/position/PositionReducer';
import CancelEditButton from '../information/EditableInformationBlock/EditFormButtons/CancelEditButton';

type PropsType = {
    initialValues:  CreateUpdatePositionType,
    onChangeValues: (position : CreateUpdatePositionType) => void,
    onSubmit: () => void 
}

const CreateUpdatePositionForm: React.FC<PropsType> = (props) => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const isSLTFetching = useSelector(selectIsSLTFetching)
    const stacks = useSelector(selectAllStacks)
    const languages = useSelector(selectAllLanguages)
    const technologies = useSelector(selectAllTechnologies)
    
    const dispatch = useAppDispatch()
    
    const positionData = props.initialValues
    
    React.useEffect(() => {
        dispatch(getStacksLanguagesAndTechnologies())
    }, [])

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
                let languageId = null
                if (!!values.languageId) {
                    languageId = values.languageId === -1 ? null : values.languageId
                }
                dispatch(props.onChangeValues({
                    description: checkIfUndefined(values.description),
                    languageId: languageId,
                    numberOfPlaces: !!values.numberOfPlaces ? values.numberOfPlaces : null,
                    salaryRange: !!values.salaryRange ? values.salaryRange : null,
                    stackId: !!values.stackId ? values.stackId : null,
                    technologiesIds: !!values.technologiesIds ? values.technologiesIds : [],
                    title: checkIfUndefined(values.title)
                }))
            }
        });
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
                    <Form.Item name="title" label="Название" 
                            rules={[{ required: true, message: 'Введите название позиции' }]}
                            initialValue={positionData.title}
                    >
                        <Input placeholder="Введите название позиции"/>
                    </Form.Item>
                    <Form.Item name="description" label="Описание" 
                            initialValue={positionData.description}
                    >
                        <TextArea placeholder="Введите описание" autoSize allowClear/>
                    </Form.Item>
                    <Row justify="space-between">
                        <Col style={{width: "49%"}}>
                            <Form.Item name="numberOfPlaces" label="Количество мест"
                                rules={[{ pattern: new RegExp('(^0$|(^[1-9]{1,2}$))'), 
                                            message: 'Введите корректное значение'}
                                ]}
                                initialValue={positionData.numberOfPlaces}
                            >
                                <Input placeholder="Введите количество мест"/>
                            </Form.Item>
                        </Col>
                        <Col style={{width: "49%"}}>
                            <Form.Item name="salaryRange" label="Заработная плата"
                                rules={[{ pattern: new RegExp('(^0$|(^[1-9]([0-9]{1,4})$))'), 
                                        message: 'Введите корректное значение'}
                                ]}
                                initialValue={positionData.salaryRange}
                            >
                                <Input placeholder="Введите значение"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col style={{width: "49%"}}>
                            <Form.Item name="stackId" label="Стек"
                                    rules={[{ required: true, message: 'Выберите стек позиции' }]}
                                    initialValue={positionData.stackId}
                            >
                                <Select
                                    placeholder="Выберите стек позиции"
                                    loading={isSLTFetching}
                                    options={convertSLTArrayToSelectOptionsArray(stacks)}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{width: "49%"}}>
                            <Form.Item name="languageId" label="Основной используемый язык"
                                    initialValue={positionData.languageId}
                            >
                                <Select
                                    placeholder="Выберите основной используемый язык"
                                    loading={isSLTFetching}
                                    options={[{value: -1, label: 'не указано'}, ...convertSLTArrayToSelectOptionsArray(languages)]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="technologiesIds" label="Используемые технологии"
                            initialValue={[...positionData.technologiesIds]}
                    >
                        <Select
                            placeholder="Выберите используемые технологии"
                            loading={isSLTFetching}
                            mode="multiple"
                            allowClear
                            options={convertSLTArrayToSelectOptionsArray(technologies)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}}
                                onClick={onSubmit}>
                            {
                                (props.initialValues.title === '' || props.initialValues.title === null)
                                ? 'Создать' 
                                : 'Сохранить'
                            }
                        </Button>
                        {
                            (props.initialValues.title === '' || props.initialValues.title === null)
                            ?   <Button htmlType="button" onClick={onReset}>
                                    Очистить поля формы
                                </Button>
                            :   <CancelEditButton/>
                        }
                    </Form.Item>
                </Form>
            }
        </>
    )
}

export const getUpdatePositionForm = (data: CreateUpdatePositionType) => {
        return <CreateUpdatePositionForm 
                    initialValues={data}
                    onChangeValues={setUpdatedPositionInfo}
                    onSubmit={updatePositionInfo}
                />
}
export default CreateUpdatePositionForm;