import {  Spin, Table, TableColumnsType, } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { useSelector } from "react-redux";
import { getAllCompanyPositionsWithApplicationsWithStudentInfo } from "../../../store/positions/PositionsReducer";
import { selectArePositionsWithApplicationsFetching, selectPositionsWithApplications } from "../../../store/positions/PositionsSelectors";
import { IntershipPositionWithApplicationsType, ShortStudentApplicationInfo } from "../../../utils/types/types";
import { useAppDispatch } from "../../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { StatusTag } from "../../../components/tables/TableCellContent/StatusTag";

const positionApplicationsTableColumns: TableColumnsType<ShortStudentApplicationInfo> = [
    { title: 'ФИО', dataIndex: 'fio', key: 'fio'},
    { title: 'Группа', dataIndex: 'groupNumber', key: 'groupNumber'},
    { title: 'Статус заявки', dataIndex: 'statusHistory', key: 'statusHistory',
          render: (applicationStatuses) => {
              return <StatusTag applicationStatuses={applicationStatuses}/>
          }
      },
];

const PositionsTableForSchool: React.FC = () => {
    const areFetching = useSelector(selectArePositionsWithApplicationsFetching)
    const positionsWithApplications = useSelector(selectPositionsWithApplications)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const companyId = params.id == undefined ? "" : params.id 

    React.useEffect(() => {
        dispatch(getAllCompanyPositionsWithApplicationsWithStudentInfo(companyId))
    }, [])

    const columns: TableColumnsType<IntershipPositionWithApplicationsType> = [
        { title: 'Позиция', dataIndex: 'title', key: 'title' },
        { title: 'Количество мест', dataIndex: 'numberOfPlaces', key: 'numberOfPlaces',
            render: (numberOfPlaces) => {
                let innerText = 'не указано'
                if(numberOfPlaces !== null && numberOfPlaces !== '')
                    innerText = numberOfPlaces
                return numberOfPlaces
            }
        },
        { title: 'Количество заявок', dataIndex: 'numberOfApplications', key: 'numberOfApplications' },
    ];
  
    return (
        <>
            <Spin spinning={areFetching}>
                <Table
                columns={columns}
                rowKey="id"
                expandRowByClick
                expandable={{
                    expandedRowRender: record => 
                    <>
                        <div style={{paddingInline: 32}}>
                            <Title level={5} style={{ marginTop: 0 }}>Студенты, подавшие заявку в порядке приоритетности</Title>
                            <Table className="pointer-tr" 
                                style={{marginTop: 4, maxWidth: 700}}
                                columns={positionApplicationsTableColumns} 
                                dataSource={record.applications} 
                                pagination={false} 
                                bordered
                                tableLayout="auto"
                                onRow={(record) => {
                                    return {onClick: (e) => {navigate(`/students/${record.studentId}`)}};
                                }}
                            />
                        </div>
                    </>,
                    rowExpandable: record => record.applications.length !== 0
                }}
                dataSource={positionsWithApplications}
                pagination={false}
                bordered
                />
            </Spin>
        </>
    );
  };
  
  export default PositionsTableForSchool;