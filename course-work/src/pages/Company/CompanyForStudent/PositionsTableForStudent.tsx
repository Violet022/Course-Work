import { Collapse, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCompanyPositions } from "../../../store/company/CompanySelectors";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";


interface DataType {
    id: string
    title: string;
    stack: string | null;
    numberOfPlaces: number | string | null;
}
  
const columns: ColumnsType<DataType> = [
    { title: 'Позиция', dataIndex: 'title', key: 'title' },
    { title: 'Стек', dataIndex: 'stack', key: 'stack',
        render: (stackName) => {
            if (stackName === null)
                stackName = "не указан"
            return stackName
        }
    },
    { title: 'Количество мест', dataIndex: 'numberOfPlaces', key: 'numberOfPlaces',
        render: (numberOfPlaces) => {
            if (numberOfPlaces === null)
                numberOfPlaces = "не указанo"
            return numberOfPlaces
        }
    }, 
];

const PositionsTableForStudent: React.FC = () => {
    const positions = useSelector(selectCompanyPositions)
    const navigate = useNavigate()
    
    return (
        <>
            <Table
                className='pointer-tr'
                columns={columns} 
                dataSource={positions}
                pagination={false} 
                tableLayout="fixed"
                onRow={(record, rowIndex) => {
                    return {
                      onClick: (e) => {
                        navigate(`/positions/${record.id}`)
                      }
                    };
                  }}
            >
            </Table>
        </>
    )
}

export default PositionsTableForStudent;