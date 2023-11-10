import { Spin, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectArePositionsFetching, selectPositions } from '../../../store/positions/PositionsSelectors';
import { IntershipPositionDtoType} from '../../../utils/types/types'
import { useAppDispatch } from '../../../hooks/hooks';
import { ColumnsType } from 'antd/es/table';
import { selectCompanyId } from '../../../store/authentication/AuthSelectors';
import { getAllCompanyPositions } from '../../../store/positions/PositionsReducer';
  
const columns: ColumnsType<IntershipPositionDtoType> = [
    { title: 'Позиция', dataIndex: 'title', key: 'title' },
    { title: 'Количество мест', dataIndex: 'numberOfPlaces', key: 'numberOfPlaces',
        render: (numberOfPlaces) => {
            if (numberOfPlaces === null)
                numberOfPlaces = "не указанo"
            return numberOfPlaces
        }
    },
    { title: 'Количество заявок', dataIndex: 'numberOfApplications', key: 'numberOfApplications'} 
];

const PositionsTableForCompany: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const companyId = useSelector(selectCompanyId)
    const positions: Array<IntershipPositionDtoType> = useSelector(selectPositions)
    const arePositionsFetching = useSelector(selectArePositionsFetching)
    
    React.useEffect(() => {
        dispatch(getAllCompanyPositions(companyId))
    }, [])

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

export default PositionsTableForCompany;