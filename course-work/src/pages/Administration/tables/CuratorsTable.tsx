import React from "react";
import Title from "antd/es/typography/Title";
import { Col, Row, Spin, Table, TableColumnsType, Tag } from "antd";
import { CuratorCompanyType, CuratorType } from "../../../utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { selectAreCuratorsFetching, selectCurators } from "../../../store/curators/CuratorsSelectors";
import { getAllCurators } from "../../../store/curators/CuratorsReducer";
import { useAppDispatch } from "../../../hooks/hooks";
import { RowWithAddedAndRemovableTags } from "../../../components/tables/TableCellContent/RowWithAddedAndRemovableTags";

const CuratorsTable: React.FC = () => {
    const allCurators = useSelector(selectCurators)
    const areFetching = useSelector(selectAreCuratorsFetching)
    const dispatch = useAppDispatch()

    const curatorsTableColumns: TableColumnsType<CuratorType> = [
        { title: 'ФИО', dataIndex: 'fio', key: 'fio'},
        { title: 'Курируемые компании', dataIndex: 'companies', key: 'companies',
              render: (curatorCompanies) => {
                  return (
                    <RowWithAddedAndRemovableTags tags={curatorCompanies}/>
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
                tableLayout="auto"
                pagination={false}
            />
        </Spin>
      </>
    );
};
  
export default CuratorsTable;