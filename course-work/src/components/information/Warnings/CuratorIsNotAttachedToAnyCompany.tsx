import { Alert } from "antd";
import React from "react";

const CuratorIsNotAttachedToAnyCompany: React.FC = () => {
    return (
        <>
            <Alert
                message="Просмотр страницы ограничен"
                description="На текущий момент вы не были назначены куратором компании, поэтому просмотр страницы ограничен"
                type="info"
                showIcon
            />
        </>
    )
}

export default CuratorIsNotAttachedToAnyCompany