import { Spin, Table } from 'antd';
import React, { Key} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectArePositionsFetching, selectPositions } from '../../../store/positions/PositionsSelectors';
import { IntershipPositionDtoType} from '../../../utils/types/types'
import { ColumnsType } from 'antd/es/table';
import { getAllPositions } from '../../../store/positions/PositionsReducer';
import { useAppDispatch } from '../../../hooks/hooks';

const makeSelectOptions = (positions: Array<IntershipPositionDtoType>) => {
    return Array.from(new Set(positions.map((position) => position.stack).filter(stack => stack !== null))).map((columnFilterDataString) => {
        return {
            value: columnFilterDataString as string,
            text: columnFilterDataString as string,
        }
    })
}

const PositionsTableForSchoolAndStudent: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const positions: Array<IntershipPositionDtoType> = useSelector(selectPositions)
    const arePositionsFetching = useSelector(selectArePositionsFetching)

    React.useEffect(() => {
        dispatch(getAllPositions())
    }, [])

    const columns: ColumnsType<IntershipPositionDtoType> = [
        { title: 'Позиция', dataIndex: 'title', key: 'title' },
        { title: 'Стек', dataIndex: 'stack', key: 'stack',
            filters: [...makeSelectOptions(positions)],
            filterSearch: true,
            onFilter: (value: boolean | Key, record) => { 
                if(record.stack !== null) return record.stack.includes(String(value)) 
                else return true
            },
            render: (stackName) => {
                if (stackName === null)
                    stackName = "не указан"
                return stackName
            }
        },
        { title: 'Название компании', dataIndex: 'companyName', key: 'companyName' },
        { title: 'Количество мест', dataIndex: 'numberOfPlaces', key: 'numberOfPlaces',
            render: (numberOfPlaces) => {
                if (numberOfPlaces === null)
                    numberOfPlaces = "не указанo"
                return numberOfPlaces
            }
        }, 
    ];

    return (
        <Spin spinning={arePositionsFetching}>
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
        </Spin>
    )
}

export default PositionsTableForSchoolAndStudent;

