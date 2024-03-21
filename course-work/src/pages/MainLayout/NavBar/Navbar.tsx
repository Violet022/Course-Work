import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';

import {  Col, MenuProps, Row} from 'antd';
import { Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';

import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';

import { selectIsAuth, selectUserRole } from '../../../store/authentication/AuthSelectors';
import { logout } from '../../../store/authentication/AuthReducer';
import { faUser as faSolidUser} from "@fortawesome/free-solid-svg-icons";
import {faUser as faRegularUser} from '@fortawesome/free-regular-svg-icons'

const Navbar: React.FC = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const [icon, setIcon] = useState(faRegularUser)
    const [current, setCurrent] = useState<string>()
    const isAuth = useSelector(selectIsAuth)
    const userRole = useSelector(selectUserRole)

    const logoutBtnClick = () => { dispatch(logout())}

    const onClick: MenuProps['onClick'] = (e) => {
        if(e.key !== 'notifications' && e.key !== 'login') setCurrent(e.key);
        if(e.key === 'profile')
            setIcon(faSolidUser)
        else
            setIcon(faRegularUser)
    };

    useEffect(() => {
        let loc = location.pathname.split('/')[1]
        if(loc !== 'notifications' && loc !== 'login')
            setCurrent(loc);
    }, [location]);

    return (
        <Header style={{ padding: 0 }} >
            <Row wrap={false} align="middle" style={{ justifyContent: "space-between" }}>
                <Title level={4} 
                        style={{ marginInline: 20, marginTop: 0, marginBottom: 0, float: "left", color: 'white'}}>
                    HITs
                </Title>
                <Col flex='auto'>
                    <LeftMenu onClick={onClick} keys={[current]} isAuth={isAuth} userRole={userRole}/>
                </Col>
                <Col flex='auto'>
                    <RightMenu onClick={onClick} keys={[current]} isAuth={isAuth} logout={logoutBtnClick} icon={icon}/>
                </Col>
            </Row>
        </Header>
    );
};

export default Navbar;