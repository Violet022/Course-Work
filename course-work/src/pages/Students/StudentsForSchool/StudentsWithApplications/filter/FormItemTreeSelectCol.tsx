import { Col, Form, TreeSelect } from "antd";
import React, { useContext } from "react";
import { DataTableContext } from "../../../../../components/contexts/DataTableContext";
import { FilterFormColType, StudentWithApplicationsType, studentWithApplicationsKeysType } from "../../../../../utils/types/types";

const FormItemTreeSelectCol: React.FC<FilterFormColType> = (props) => {
    const dataTableContext = useContext(DataTableContext)
    const studentsWithApplications = dataTableContext.dataTable

    const makeTreeSelectOptions = (columnKey: studentWithApplicationsKeysType) => {
        const columnFilterDataArray: Array<string> = []
        studentsWithApplications.map((student: StudentWithApplicationsType) => {
            if (columnKey === 'statusHistory')
                columnFilterDataArray.push(student.statusHistory[student.statusHistory.length - 1].status)
            else
                columnFilterDataArray.push(student[columnKey])
        })
        return Array.from(new Set(columnFilterDataArray)).map((columnFilterDataString) => {
            return {
                value: columnFilterDataString,
                title: columnFilterDataString,
            }
        })
    }

    return (
        <Col span={8}>
            <Form.Item name={props.name} label={props.label}>
                <TreeSelect
                    showSearch
                    style={{ width: '100%', marginBottom: 12, marginTop: 8 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                    placeholder={props.placeholder}
                    allowClear
                    treeDefaultExpandAll
                    treeCheckable
                    switcherIcon={null}
                    treeData={[{
                        title: 'Выбрать все',
                        value: '0-0',
                        children: [...makeTreeSelectOptions(props.name)],
                    }]}
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemTreeSelectCol