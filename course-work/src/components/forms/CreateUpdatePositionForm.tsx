import { Button, Col, Form, Input, Row} from 'antd';
import React, { useContext } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useRole } from '../../hooks/hooks';
import { CreateUpdatePositionType } from '../../utils/types/types';
import { checkIfUndefined } from '../../utils/functions/checkers';
import { VisibilityContext } from '../contexts/VisibilityContext';
import { setUpdatedPositionInfo, updatePositionInfo } from '../../store/position/PositionReducer';
import CancelEditButton from '../information/EditableInformationBlock/EditFormButtons/CancelEditButton';
import { useParams } from 'react-router-dom';
import SelectWithCuratorCompanies from './formItems/WithSelects/SelectWithCuratorCompanies';
import { isCurator } from '../../utils/functions/conditions';
import StackSelectItem from './formItems/WithSelects/StackSelect/StackSelectItem';
import LanguageSelectItem from './formItems/WithSelects/LanguageSelect/LanguageSelectItem';
import TechnologyMultipleSelectItem from './formItems/WithSelects/TechnologyMultipleSelectItem';

type PropsType = {
    initialValues:  CreateUpdatePositionType,
    onChangeValues: (position : CreateUpdatePositionType) => void,
    onSubmit: (companyId ?: string | null) => void 
}

const CreateUpdatePositionForm: React.FC<PropsType> = (props) => {
    const userRole = useRole()
    const params = useParams()
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = React.useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    
    const dispatch = useAppDispatch()
    
    const positionData = props.initialValues

    const onReset = () => {
        form.resetFields();
    };
    const onSubmit = () => {
        visibilityContext.toggleVisibilitySwitcher()
        if(isCurator(userRole)) {
            dispatch(props.onSubmit(params.id))
        }
        else
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
                let companyId = null
                if(isCurator(userRole) && params.id === undefined && !!values.companyId)
                    companyId = values.companyId
                if(isCurator(userRole) && params.id !== undefined)
                    companyId = params.id
                dispatch(props.onChangeValues({
                    companyId : companyId,
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
                { (isCurator(userRole) && params.id === undefined) && <SelectWithCuratorCompanies/> }
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
                        <StackSelectItem initialValue={positionData.stackId}/>
                    </Col>
                    <Col style={{width: "49%"}}>
                        <LanguageSelectItem initialValue={positionData.languageId}/>
                    </Col>
                </Row>
                <TechnologyMultipleSelectItem formItemName='technologiesIds' formItemLabel='Используемые технологии' 
                    initialValues={[...positionData.technologiesIds]} placeholder='Выберите используемые технологии'
                />
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