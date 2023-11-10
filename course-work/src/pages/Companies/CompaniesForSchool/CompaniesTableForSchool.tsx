import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin, Table, TableColumnsType } from "antd";
import { useAppDispatch} from "../../../hooks/hooks";
import { CompanyWithCuratorsType } from "../../../utils/types/types";
import { RowToManageCurators } from "../../../components/tables/TableCellContent/RowToManageCurators";
import { selectAreCompaniesFetching, selectCompaniesWithCurators } from "../../../store/companies/CompaniesSelectors";
import { getAllCompaniesWithCurators } from "../../../store/companies/CompaniesReducer";

const CompaniesTableForSchool: React.FC = () => {
    const companiesWithCurators: Array<CompanyWithCuratorsType>  = useSelector(selectCompaniesWithCurators)
    const areCompaniesFetching: boolean = useSelector(selectAreCompaniesFetching)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const companiesWithCuratorsTableColumns: TableColumnsType<CompanyWithCuratorsType> = [
        { title: 'Название', dataIndex: 'name', key: 'name',
            className: 'pointer',
            onCell: (record, rowIndex) => {
                return {
                    onClick: (e) => {navigate(`/companies/${record.id}`)}
                };
            }
        },
        { title: 'Куратор(ы)', dataIndex: 'curators', key: 'curators',
              render: (companyCurators, record) => {
                  return (
                    <RowToManageCurators tags={companyCurators} 
                        entityWithWhichAssociateSelectedValuesId={record.id}
                        entityToSelect='CURATOR'
                    />
                  )
              }
        },
    ];

    React.useEffect(() => {
        dispatch(getAllCompaniesWithCurators())
    }, [])

    return (
      <>
        <Spin spinning={areCompaniesFetching}>
            <Table
                columns={companiesWithCuratorsTableColumns}
                dataSource={companiesWithCurators}
                tableLayout="fixed"
                pagination={false}
            />
        </Spin>
      </>
    );
}

export default CompaniesTableForSchool;