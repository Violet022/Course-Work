import { Table, TableColumnsType } from "antd";
import React from "react";
import { StatusHistoryType, ApplicationTypeWithStudentInfo, ShortStudentApplicationInfo, ApplicationType } from "../../../utils/types/types";
import { useNavigate, useParams} from "react-router-dom";
import { StatusTag } from "../TableCellContent/StatusTag";
import { useSelector } from "react-redux";
import { selectApplications, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getStudentApplications } from "../../../store/applications/ApplicationsReducer";

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

const AllStudentApplicationsTable: React.FC = () => {
    const allStudentApplications = useSelector(selectApplications)
    const areFetching = useSelector(selectAreApplicationsFetching)
    const dispatch = useAppDispatch()
    const params = useParams()
    const studentId = params.id == undefined ? "" : params.id

    React.useEffect(() => {
        dispatch(getStudentApplications(studentId))
    }, [])
    
    return (
      <>
        { !areFetching &&
            <Table
                columns={allStudentApplicationsTableColumns}
                dataSource={allStudentApplications}
                tableLayout="fixed"
                pagination={false}
            />
        }
      </>
    );
  };
  
  export default AllStudentApplicationsTable;