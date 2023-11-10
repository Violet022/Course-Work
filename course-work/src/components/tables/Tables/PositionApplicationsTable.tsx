import { Table, TableColumnsType } from "antd";
import React from "react";
import { ApplicationTypeWithStudentInfo } from "../../../utils/types/types";
import { useNavigate} from "react-router-dom";
import { StatusTag } from "../TableCellContent/StatusTag";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../store/authentication/AuthSelectors";

type PropsType = {
    positionApplications: Array<ApplicationTypeWithStudentInfo>,
    areFetching: boolean
}

export const positionApplicationsTableColumns: TableColumnsType<ApplicationTypeWithStudentInfo> = [
    { title: 'ФИО', dataIndex: 'fio', key: 'fio'},
    { title: 'Группа', dataIndex: 'groupNumber', key: 'groupNumber'},
    { title: 'Статус заявки', dataIndex: 'statusHistory', key: 'statusHistory',
          render: (applicationStatuses) => {
              return <StatusTag applicationStatuses={applicationStatuses}/>
          }
      },
];

const PositionApplicationsTable: React.FC<PropsType> = (props) => {
    const userRole = useSelector(selectUserRole)
    const navigate = useNavigate()
    return (
      <>
        { !props.areFetching &&
            <Table
                className='pointer-tr'
                columns={positionApplicationsTableColumns}
                dataSource={props.positionApplications}
                tableLayout="fixed"
                pagination={false}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => { navigate(`/applications/${record.id}`)}
                    };
                }}
            />
        }
      </>
    );
  };
  
  export default PositionApplicationsTable;