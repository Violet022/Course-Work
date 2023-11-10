import { Table, TableColumnsType } from "antd";
import React from "react";
import { ApplicationTypeWithStudentInfo } from "../../../utils/types/types";
import { useNavigate, useParams} from "react-router-dom";
import { StatusTag } from "../TableCellContent/StatusTag";
import { useSelector } from "react-redux";
import { selectApplicationsWithStudentInfo, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getStudentCompanyApplications } from "../../../store/applications/ApplicationsReducer";

export const studentCompanyApplicationsTableColumns: TableColumnsType<ApplicationTypeWithStudentInfo> = [
    { title: 'Позиция', dataIndex: 'position', key: 'position'},
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

const StudentCompanyApplicationsTable: React.FC = () => {
    const studentCompanyApplications = useSelector(selectApplicationsWithStudentInfo)
    const areFetching = useSelector(selectAreApplicationsFetching)
    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getStudentCompanyApplications(studentId))
    }, [])
    
    return (
      <>
        { !areFetching &&
            <Table
                className='pointer-tr'
                columns={studentCompanyApplicationsTableColumns}
                dataSource={studentCompanyApplications}
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
  
  export default StudentCompanyApplicationsTable;