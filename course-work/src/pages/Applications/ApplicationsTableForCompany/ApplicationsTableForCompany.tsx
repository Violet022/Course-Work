import {  Spin, Table, TableColumnsType } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationTypeWithStudentInfo} from "../../../utils/types/types";
import { selectApplicationsWithStudentInfo, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getCompanyApplications} from "../../../store/applications/ApplicationsReducer";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "../../../components/tables/TableCellContent/StatusTag";

const ApplicationsTableForCompany: React.FC = () => {
    const areFetching = useSelector(selectAreApplicationsFetching)
    const allCompanyApplications: Array<ApplicationTypeWithStudentInfo> = useSelector(selectApplicationsWithStudentInfo)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getCompanyApplications())
    }, [])

    const columns: TableColumnsType<ApplicationTypeWithStudentInfo> = [
      { title: 'ФИО', dataIndex: 'fio', key: 'fio' },
      { title: 'Позиция', dataIndex: 'position', key: 'position' },
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
                dataSource={allCompanyApplications}
                tableLayout="fixed"
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: (e) => { navigate(`/applications/${record.id}`)}
                    };
                }}
            />
        </Spin>
      </>
    );
  };
  
  export default ApplicationsTableForCompany;