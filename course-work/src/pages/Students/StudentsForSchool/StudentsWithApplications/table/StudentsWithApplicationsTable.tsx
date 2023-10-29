import React, { useContext,useState } from "react";
import { Space, Spin, Table, Typography} from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType} from "antd/es/table";
import { StudentWithApplicationsType} from "../../../../../utils/types/types";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp,  } from "@fortawesome/free-solid-svg-icons";
import { useFilter } from "../../../../../components/contexts/FilterContext";
import { DataTableContext } from "../../../../../components/contexts/DataTableContext";
import { StatusTag } from "../../../../../components/tables/TableCellContent/StatusTag";

const StudentsWithApplicationsTable: React.FC = () => {
    const {filteredInfo, setFilteredInfo} = useFilter() 
    const dataTableContext = useContext(DataTableContext)
    const studentsWithApplications = dataTableContext.dataTable

    const [isTableOpened, setIsTableOpened] = useState(false)
    const navigate = useNavigate()

    const columnsStWithApp: ColumnsType<StudentWithApplicationsType> = [
        { title: 'ФИО', dataIndex: 'fio', key: 'fio',
            filteredValue: filteredInfo.fio || null,
            sorter: {
                
                compare: (a, b) => a.fio.localeCompare(b.fio),
                multiple: 2,
            },
            onFilter: (value: string | number | boolean, record) => record.fio.includes(String(value)) 
        },
        { title: 'Группа', dataIndex: 'groupNumber', key: 'groupNumber',
          filteredValue: filteredInfo.groupNumber || null,
          onFilter: (value: string | number | boolean, record) => record.groupNumber.includes(String(value))
        },
        { title: 'Приоритет', dataIndex: 'priority', key: 'priority',
            filteredValue: filteredInfo.priority || null,
            onFilter: (value: string | number | boolean, record) => Number(record.priority) != Number.MAX_SAFE_INTEGER,
            sorter: {
                compare: (a, b) => Number(a.priority) - Number(b.priority),
                multiple: 1,
            },
            sortDirections: ['ascend'],
            render: (priority) => {
                let innerText = priority === Number.MAX_SAFE_INTEGER ? 'не выставлен': priority
                return innerText
            }
        },
        { title: 'Позиция', dataIndex: 'position', key: 'position',
          filteredValue: filteredInfo.position || null,
          onFilter: (value: string | number | boolean, record) => record.position.includes(String(value)) 
        },
        { title: 'Стек', dataIndex: 'stack', key: 'stack',
          filteredValue: filteredInfo.stack || null,
          onFilter: (value: string | number | boolean, record) => record.stack.includes(String(value)) 
        },
        { title: 'Компания', dataIndex: 'companyName', key: 'companyName',
          filteredValue: filteredInfo.companyName || null,
          onFilter: (value: string | number | boolean, record) => record.companyName.includes(String(value))
        },
        { title: 'Статус заявки', dataIndex: 'statusHistory', key: 'statusHistory',
            render: (applicationStatuses) => {
                return <StatusTag applicationStatuses={applicationStatuses}/>
            },
            filteredValue: filteredInfo.status || null,
            onFilter: (value: string | number | boolean, record) => 
                      record.statusHistory[record.statusHistory.length - 1].status.includes(String(value))
        }, 
    ];

    return (
        <>
            <Spin spinning={dataTableContext.isDataFetching}>
                <div style={{marginBottom: 8}} >
                    <Space align="center" style={{ marginBottom: 12, cursor: 'pointer'}} onClick={() => {if (!dataTableContext.isDataFetching) setIsTableOpened(prev => !prev)}}>
                        <Title level={5} style={{ marginBlock: 0}}>
                            Студенты, подавшие заявки
                        </Title>
                        {
                            isTableOpened
                            ? <FontAwesomeIcon icon={faChevronDown} className="arrow"/>
                            : <FontAwesomeIcon icon={faChevronUp} className="arrow"/>
                        }
                    </Space>
                </div>
                {
                    (studentsWithApplications.length !== 0 && isTableOpened) &&
                    <Table
                        style={{marginBottom: 24}}
                        columns={columnsStWithApp} 
                        dataSource={studentsWithApplications}
                        pagination={false} 
                        tableLayout="auto"
                        bordered
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (e) => {
                                    navigate(`/students/${record.id}`)
                                }
                            };
                        }}
                    >
                    </Table>
                }
            </Spin>
        </>
    )
}

export default StudentsWithApplicationsTable