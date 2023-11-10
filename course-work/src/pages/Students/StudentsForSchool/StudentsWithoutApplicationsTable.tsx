import React, { useState } from "react";
import { useSelector } from "react-redux";
import { 
    selectAreStudentsFetching,
    selectStudentsWithoutApplications,
} from "../../../store/students/StudentsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getStudentArrays } from "../../../store/students/StudentsReducer";
import { Space, Spin, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { InnerStudentProfileInfoType, StudentWithoutApplicationsType } from "../../../utils/types/types";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import type { ColumnsType } from "antd/es/table/interface";

const columnsStWithoutApp: ColumnsType<StudentWithoutApplicationsType> = [
    { title: 'ФИО', dataIndex: 'fio', key: 'fio' },
    { title: 'Группа', dataIndex: 'groupNumber', key: 'groupNumber'},
    { title: 'Предпочитаемые стеки', dataIndex: 'stacks', key: 'stacks',
        render: (stacksArray) => {
            let stacksNames = stacksArray.map((stack: InnerStudentProfileInfoType) => stack.name)
            return (<>
                    {
                        stacksNames.length !== 0 
                        ? stacksNames.map((stackName: string, idx: any) => (
                            <Tag key={idx}>
                              {stackName}
                            </Tag>
                          ))
                        : <span>не выбраны</span>
                    }</>
            )
        }
    },
];

const StudentsWithoutApplicationsTable: React.FC = () => {
    const [isTableOpened, setIsTableOpened] = useState(false)
    const studentsWithoutApplications = useSelector(selectStudentsWithoutApplications)
    const areFetching = useSelector(selectAreStudentsFetching)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getStudentArrays())
    }, [])

    return (
        <>
            <Spin spinning={areFetching}>
                <div style={{marginBottom: 8}} >
                    <Space align="center" style={{ marginBottom: 0, cursor: 'pointer'}} onClick={() => {setIsTableOpened(prev => !prev)}}>
                        <Title level={5} style={{ marginBlock: 0}}>
                            Студенты, НЕ подавшие заявки
                        </Title>
                        {
                            isTableOpened
                            ? <FontAwesomeIcon icon={faChevronDown} className="arrow"/>
                            : <FontAwesomeIcon icon={faChevronUp} className="arrow"/>
                        }
                    </Space>
                </div>
                {
                    (studentsWithoutApplications.length !== 0 && isTableOpened) &&
                    <Table
                        className="pointer-tr"
                        columns={columnsStWithoutApp} 
                        dataSource={studentsWithoutApplications}
                        pagination={false} 
                        tableLayout="fixed"
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

export default StudentsWithoutApplicationsTable