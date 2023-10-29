import { Button, Col, Form, Input, Row, Select, Spin} from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import { useAppDispatch } from '../../../hooks/hooks';
import { checkIfUndefined } from '../../../utils/functions/checkers';
import { createNewUser, setNewUser } from '../../../store/administration/AdministrationReducer';
import { CompanyDtoType, GroupType, SelectOptionType } from '../../../utils/types/types';
import { companyServiceAPI } from '../../../api/company-service-api';
import { userServiceAPI } from '../../../api/user-service-api';

type PropsType = {
    userRole: 'STUDENT' | 'SCHOOL' | 'COMPANY' | 'CURATOR'
}

const CreateUserForm: React.FC<PropsType> = (props) => {
    const visibilityContext = useContext(VisibilityContext)
    const [submittable, setSubmittable] = useState(false);
    const [ options, setOptions ] = useState<Array<SelectOptionType>>([]);
    const [ areOptionsFetching, setAreOptionsFetching ] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useAppDispatch()

    const onReset = () => {
        setOptions([])
        form.resetFields();
    };
    const onSubmit = () => {
        visibilityContext.toggleSwitcher()
        dispatch(createNewUser())
        setOptions([])
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

    const getGroupsSelectOptions = useCallback( async () => {
        const groups = await userServiceAPI.getAllGroups()
        setOptions(groups.map((group: GroupType) => {
            return {
                value: group.groupNumber,
                label: group.groupNumber
            }
        }))
    }, []);

    const getCompaniesSelectOptions = useCallback( async () => {
        const companies = await companyServiceAPI.getAllCompanies()
        setOptions(companies.map((company: CompanyDtoType) => {
            return {
                value: company.id,
                label: company.name
            }
        }))
    }, []);

    const onSelectClick = (open: boolean) => {
        // if (open === true && options.length === 0) {
        if (open === true) {
            setAreOptionsFetching(true)
            if (props.userRole === 'STUDENT')
                getGroupsSelectOptions().then(() => setAreOptionsFetching(false))
            else if (props.userRole === 'COMPANY')
                getCompaniesSelectOptions().then(() => setAreOptionsFetching(false))
        }
    }

    return (
        <>
            <Form form={form} 
                name="validateOnly" 
                layout="vertical" 
                autoComplete="off"
            >
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item name="lastName" label="Фамилия" 
                                rules={[{ required: true, message: 'Введите фамилию' }]}
                                initialValue={''}
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
                        <Form.Item name="companyId" label="Компания"
                                className={`form-item-${props.userRole !== 'COMPANY' ? 'disabled' : 'not-disables'}`}
                                rules={[{ required: props.userRole === 'COMPANY', message: 'Выберите компанию' }]}
                        >
                            <Select
                                allowClear
                                disabled={props.userRole !== 'COMPANY'}
                                placeholder="Выберите компанию"
                                defaultValue={null}
                                notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
                                options={options}
                                onDropdownVisibleChange={(e) => {onSelectClick(e)}}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="stGroupNumber" label="Группа"
                                className={`form-item-${props.userRole !== 'STUDENT' ? 'disabled' : 'not-disables'}`}
                                rules={[{ required: props.userRole === 'STUDENT', message: 'Выберите группу' }]}
                        >
                            <Select
                                allowClear
                                disabled={props.userRole !== 'STUDENT'}
                                placeholder="Выберите группу"
                                defaultValue={null}
                                notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
                                options={options}
                                onDropdownVisibleChange={(e) => {onSelectClick(e)}}
                            />
                        </Form.Item>
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