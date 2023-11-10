import { PlusOutlined } from "@ant-design/icons";
import { Tag, theme } from "antd";
import React, { useContext } from "react";
import { VisibilityContext } from "../../contexts/VisibilityContext";
import { RowToManageCuratorsContext } from "../../contexts/RowToManageCuratorsContext";

const { useToken } = theme;

const TagForCuratorManaging: React.FC = () => {
    const visibilityContext = useContext(VisibilityContext)
    const rowContext = useContext(RowToManageCuratorsContext)
    const { token } = useToken()
    const tagPlusStyle: React.CSSProperties = {
        height: 32,
        background: token.colorBgContainer,
        borderStyle: 'dashed',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <Tag style={tagPlusStyle} icon={<PlusOutlined/>} onClick={() => {visibilityContext.toggleVisibilitySwitcher(true)}}>
            { rowContext.entityToSelect === 'COMPANY'? 'Добавить компанию' : 'Добавить куратора'}
        </Tag>
    )
}

export default TagForCuratorManaging