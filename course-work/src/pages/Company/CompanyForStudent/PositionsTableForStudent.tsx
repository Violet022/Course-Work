import { Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectCompanyPositions } from "../../../store/company/CompanySelectors";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { IntershipPositionDtoType } from "../../../utils/types/types";
  
const columns: ColumnsType<IntershipPositionDtoType> = [
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