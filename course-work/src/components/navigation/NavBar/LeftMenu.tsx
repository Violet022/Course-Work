import { Menu, MenuProps } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    userRole: string,
    onClick: any,
    keys: any
}

const LeftMenu: React.FC<PropsType> = (props) => {
    const LeftMenuItems = {
        isAuthItems: {
            studentsItems: [
                {
                    label: (
                        <Link to='companies'>
                            Компании
                        </Link>
                    ),
                    key: 'companies',
                },
                {
                    label: (
                        <Link to='positions'>
                            Позиции
                        </Link>
                    ),
                    key: 'positions',
                },
                {
                    label: (
                        <Link to='applications'>
                            Мои заявки
                        </Link>
                    ),
                    key: 'applications',
                },
            ] as MenuProps['items'],
            schoolItems: [
                {
                    label: (
                        <Link to='students'>
                            Студенты
                        </Link>
                    ),
                    key: 'students',
                },
                {
                    label: (
                        <Link to='companies'>
                            Компании
                        </Link>
                    ),
                    key: 'companies',
                },
                {
                    label: (
                        <Link to='positions'>
                            Позиции
                        </Link>
                    ),
                    key: 'positions',
                },
                {
                    label: (
                        <Link to='administration'>
                            Управление
                        </Link>
                    ),
                    key: 'administration',
                },
            ] as MenuProps['items'],
            companyItems: [
                {
                    label: (
                        <Link to='positions'>
                            Позиции
                        </Link>
                    ),
                    key: 'positions',
                },
                {
                    label: (
                        <Link to='students'>
                            Студенты
                        </Link>
                    ),
                    key: 'students',
                },
                {
                    label: (
                        <Link to='applications'>
                            Заявки
                        </Link>
                    ),
                    key: 'applications',
                }
            ] as MenuProps['items']
        },
        notIsAuthItems: [] as MenuProps['items']
    }

    let leftMenuItems: MenuProps['items'] = []
    if (props.isAuth) {
        switch (props.userRole) {
            case 'STUDENT': leftMenuItems = LeftMenuItems.isAuthItems.studentsItems; break
            case 'SCHOOL': leftMenuItems = LeftMenuItems.isAuthItems.schoolItems; break
            case 'COMPANY': leftMenuItems = LeftMenuItems.isAuthItems.companyItems; break
        }
    } else {
        leftMenuItems = LeftMenuItems.notIsAuthItems
    }

    return (
        <>
            { 
                leftMenuItems?.length !== 0 
                && <Menu onClick={props.onClick} selectedKeys={props.keys} mode="horizontal" theme="dark" items={leftMenuItems} />
            }
        </>
    )
}

export default LeftMenu;