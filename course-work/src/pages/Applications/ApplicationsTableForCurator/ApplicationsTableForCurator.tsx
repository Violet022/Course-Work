import {  Spin, Table, TableColumnsType } from "antd";
import React, { Key } from "react";
import { useSelector } from "react-redux";
import { ApplicationTypeWithStudentInfo} from "../../../utils/types/types";
import { selectApplicationsWithStudentInfo, selectAreApplicationsFetching } from "../../../store/applications/ApplicationsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getCuratorCompaniesApplications} from "../../../store/applications/ApplicationsReducer";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "../../../components/tables/TableCellContent/StatusTag";

const makeCompanyNameSelectOptions = (applications: Array<ApplicationTypeWithStudentInfo>) => {
    return Array.from(new Set(applications.map((application) => application.companyName))).map((columnDataString) => {
        return {
            value: columnDataString as string,
            text: columnDataString as string,
        }
    })
}

const ApplicationsTableForCurator: React.FC = () => {
    const areFetching = useSelector(selectAreApplicationsFetching)
    const allCuratorCompaniesApplications: Array<ApplicationTypeWithStudentInfo> = useSelector(selectApplicationsWithStudentInfo)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getCuratorCompaniesApplications())
    }, [])

    const columns: TableColumnsType<ApplicationTypeWithStudentInfo> = [
      { title: 'ФИО', dataIndex: 'fio', key: 'fio' },
      { title: 'Название компании', dataIndex: 'companyName', key: 'companyName',
            filters: [...makeCompanyNameSelectOptions(allCuratorCompaniesApplications)],
            filterSearch: true,
            onFilter: (value: boolean | Key, record) => { 
                return record.companyName.includes(String(value)) 
            }, 
      },
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
                dataSource={allCuratorCompaniesApplications}
                tableLayout="fixed"
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: (e) => {navigate(`/applications/${record.id}`)}
                    };
                }}
            />
        </Spin>
      </>
    );
  };
  
  export default ApplicationsTableForCurator;