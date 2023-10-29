import { FilterOutlined } from "@ant-design/icons";
import { Collapse, Spin, theme } from "antd";
import Title from "antd/es/typography/Title";
import React, { useContext } from "react";
import FilterForm from "./FilterForm";
import { DataTableContext } from "../../../../../components/contexts/DataTableContext";

const FilterCollapse: React.FC = () => {
    const { token } = theme.useToken();
    const dataTableContext = useContext(DataTableContext)
    
    return (
        <Spin spinning={dataTableContext.isDataFetching}>
            <Collapse
                className="collapse-block"
                bordered={false}
                defaultActiveKey={[]}
                expandIcon={() => <FilterOutlined />}
                style={{ background: token.colorBgContainer,
                        fontSize: 16}}
                items={[{
                    key: '1',
                    label: 'Фильтр',
                    children: 
                        <div style={{ paddingBlock: 12,
                            paddingInline: 18,
                            maxWidth: 900,
                            background: token.colorFillAlter,
                            borderRadius: token.borderRadiusLG,
                            border: 'none',}}
                        >
                            <Title level={4} style={{ marginBlock: 0, marginBottom: 12}}>
                                Настройки фильтра
                            </Title>
                            <FilterForm/>
                        </div>
                        
                }]}
            />
        </Spin>
    )
}

export default FilterCollapse