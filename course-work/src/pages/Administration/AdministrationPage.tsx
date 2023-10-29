import React from "react";
import { useSelector } from "react-redux";
import { Button, Card, Collapse, Layout, Space} from "antd";
import Title from "antd/es/typography/Title";
import OpenModalWithFormButton from "../../components/buttons/OpenModalWithFormButton";
import CreateStudentGroupForm from "./forms/CreateStudentGroupForm";
import CreateUserForm from "./forms/CreateUserForm";
import { getCreateCompanyInfoForm } from "../../components/forms/CreateUpdateCompanyInfoForm";
import { selectNewCompanyTemplate } from "../../store/company/CompanySelectors";
import CuratorsTable from "./tables/CuratorsTable";

const AdministrationPage: React.FC = () => {
    const createNewCompanyTemplate = useSelector(selectNewCompanyTemplate)

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0, marginBottom: 24}}>
                        Управление
                    </Title>
                    <Collapse 
                        className="administration-collapse"
                        bordered
                        ghost
                        items={[
                            {
                              key: '1',
                              label: 'Студенты',
                              children: 
                                <Space>
                                    <OpenModalWithFormButton 
                                        buttonText="Добавить группу" modalTitle="Добавление группы" 
                                        form={<CreateStudentGroupForm/>}
                                    />
                                    <OpenModalWithFormButton 
                                        buttonText="Добавить студента" modalTitle="Добавление пользователя - студента"
                                        form={<CreateUserForm userRole="STUDENT"/>}
                                    />
                                </Space>,
                              showArrow: false,
                            },
                            {
                              key: '2',
                              label: 'Компании',
                              children: 
                                <Space>
                                    <OpenModalWithFormButton 
                                        buttonText="Добавить компанию" modalTitle="Добавление компании" 
                                        form={getCreateCompanyInfoForm(createNewCompanyTemplate)}
                                    />
                                    <OpenModalWithFormButton 
                                        buttonText="Добавить представителя компании" modalTitle="Добавление пользователя - представителя компании"
                                        form={<CreateUserForm userRole="COMPANY"/>}
                                    />
                                </Space>,
                              showArrow: false,
                            },
                            {
                                key: '3',
                                label: 'Представители школы',
                                children: 
                                    <OpenModalWithFormButton 
                                        buttonText="Добавить представителя школы" modalTitle="Добавление пользователя - представителя школы"
                                        form={<CreateUserForm userRole="SCHOOL"/>}
                                    />,
                                showArrow: false,
                            },
                            {
                                key: '4',
                                label: 'Кураторы',
                                children: 
                                    <>
                                        <OpenModalWithFormButton 
                                            buttonText="Добавить куратора" modalTitle="Добавление пользователя - куратора от школы"
                                            form={<CreateUserForm userRole="CURATOR"/>}
                                        />
                                        <CuratorsTable/>
                                    </>
                                ,
                                showArrow: false,
                            },
                        ]} 
                    />
                </Card>
            </Layout>
        </>
    )
}

export default AdministrationPage
