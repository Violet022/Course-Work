import { Layout, Spin } from "antd";
import React from "react";
import { 
    selectIsAuthSuccess, 
    selectIsUserTryingToLogin 
} from "../../store/authentication/AuthSelectors";
import { useSelector } from "react-redux";
import NavigationAfterLogin from "./NavigationAfterLogin";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
    const isAuthSuccess = useSelector(selectIsAuthSuccess)
    const isUserTryingToLogin = useSelector(selectIsUserTryingToLogin)
   
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                {
                    isAuthSuccess
                    ?   <NavigationAfterLogin/>
                    : 
                        <>
                            <Spin spinning={isUserTryingToLogin}
                                tip='Выполняется вход...'
                            >
                                <LoginForm/> 
                            </Spin>
                        </>
                }
            </Layout>
        </>
    )
}

export default LoginPage;