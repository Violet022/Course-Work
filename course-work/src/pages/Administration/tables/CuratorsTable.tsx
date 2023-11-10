import React from "react";
import Title from "antd/es/typography/Title";
import { Spin, Table, TableColumnsType} from "antd";
import { CuratorType } from "../../../utils/types/types";
import { useSelector } from "react-redux";
import { selectAreCuratorsFetching, selectCurators } from "../../../store/curators/CuratorsSelectors";
import { getAllCurators } from "../../../store/curators/CuratorsReducer";
import { useAppDispatch } from "../../../hooks/hooks";
import { RowToManageCurators } from "../../../components/tables/TableCellContent/RowToManageCurators";

const CuratorsTable: React.FC = () => {
    const allCurators = useSelector(selectCurators)
    const areFetching = useSelector(selectAreCuratorsFetching)
    const dispatch = useAppDispatch()

    const curatorsTableColumns: TableColumnsType<CuratorType> = [
        { title: 'ФИО', dataIndex: 'fio', key: 'fio'},
        { title: 'Курируемые компании', dataIndex: 'companies', key: 'companies',
              render: (curatorCompanies, record) => {
                  return (
                    <>
                        <RowToManageCurators tags={curatorCompanies} 
                            entityWithWhichAssociateSelectedValuesId={record.id}
                            entityToSelect='COMPANY'
                        />
                    </>
                  )
              }
          },
    ];

    React.useEffect(() => {
        dispatch(getAllCurators())
    }, [])

    return (
      <>
        <Title level={5} style={{ marginTop: 16 }}>
            Кураторы
        </Title>
        <Spin spinning={areFetching}>
            <Table
                columns={curatorsTableColumns}
                dataSource={allCurators}
                tableLayout="fixed"
                pagination={false}
            />
        </Spin>
      </>
    );
};
  
export default CuratorsTable;