import { Spin, Table, TableColumnsType } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationType, StatusHistoryType } from "../../../utils/types/types";
import { selectApplications, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getCompanyApplications, getStudentApplications } from "../../../store/applications/ApplicationsReducer";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "../../../components/tables/TableCellContent/StatusTag";


const ApplicationsTableForStudent: React.FC = () => {
    const areFetching = useSelector(selectAreApplicationsFetching)
    const studentApplications: Array<ApplicationType> = useSelector(selectApplications)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getStudentApplications())
    }, [])

    const columns: TableColumnsType<ApplicationType> = [
      { title: 'Позиция', dataIndex: 'position', key: 'position' },
      { title: 'Название компании', dataIndex: 'companyName', key: 'companyName' },
      { title: 'Статус заявки', dataIndex: 'statusHistory', key: 'statusHistory',
            render: (applicationStatuses) => {
                return <StatusTag applicationStatuses={applicationStatuses}/>
            } 
        },
    ];

  
    return (
      <>
        <Spin spinning={areFetching}>
            <Table
                className='pointer-tr'
                columns={columns}
                dataSource={studentApplications}
                tableLayout="fixed"
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: (e) => {
                            navigate(`/applications/${record.id}`)
                        }
                    };
                }}
            />
        </Spin>
      </>
    );
  };
  
  export default ApplicationsTableForStudent;