import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { selectIsLogoutSuccess } from '../../store/authentication/AuthSelectors';
import { logout } from '../../store/authentication/AuthReducer';
import { useAppDispatch } from '../../hooks/hooks';

const LogoutPage: React.FC = () => {
    const isLogoutSuccess = useSelector(selectIsLogoutSuccess)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [])
    
    return(
        <>
            {
                isLogoutSuccess 
                ? <Navigate to={'/login'}/>
                : <Spin spinning={!isLogoutSuccess}></Spin>
            }
        </>
    )
}

export default LogoutPage
