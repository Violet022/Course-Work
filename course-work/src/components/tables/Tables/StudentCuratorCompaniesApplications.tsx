import { Table, TableColumnsType } from "antd";
import React from "react";
import { ApplicationType } from "../../../utils/types/types";
import {  useNavigate, useParams} from "react-router-dom";
import { StatusTag } from "../TableCellContent/StatusTag";
import { useSelector } from "react-redux";
import { selectApplications, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getStudentCuratorCompaniesApplications } from "../../../store/applications/ApplicationsReducer";

export const allStudentApplicationsTableColumns: TableColumnsType<ApplicationType> = [
    { title: 'Позиция', dataIndex: 'position', key: 'position'},
    { title: 'Компания', dataIndex: 'companyName', key: 'companyName'},
    { title: 'Статус заявки', dataIndex: 'statusHistory', key: 'statusHistory',
          render: (applicationStatuses) => {
              return <StatusTag applicationStatuses={applicationStatuses}/>
          }
    },
    { title: 'Приоритет заявки', dataIndex: 'priority', key: 'priority',
          render: (applicationPriority) => {
              return applicationPriority === 0 ? 'не выставлен' : applicationPriority
          }
    },
];

const StudentCuratorCompaniesApplications: React.FC = () => {
    const navigate = useNavigate()
    const allStudentApplications = useSelector(selectApplications)
    const areFetching = useSelector(selectAreApplicationsFetching)
    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id

    React.useEffect(() => {
        dispatch(getStudentCuratorCompaniesApplications(studentId))
    }, [])
    
    return (
      <>
        { !areFetching &&
            <Table
                className="pointer-tr"
                columns={allStudentApplicationsTableColumns}
                dataSource={allStudentApplications}
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
        }
      </>
    );
  };
  
  export default StudentCuratorCompaniesApplications;