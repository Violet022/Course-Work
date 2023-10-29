import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { 
    selectAreStudentsFetching,
    selectStudentsWithApplications,
} from "../../../store/students/StudentsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getStudentArrays, getStudentsWithApplications } from "../../../store/students/StudentsReducer";
import { Button, Checkbox, Col, Collapse, Form, Row, Space, Spin, Table, TreeSelect, Typography, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ColumnsType, TableProps } from "antd/es/table";
import { StudentWithApplicationsType, columnsArraysType } from "../../../utils/types/types";
import { StatusTag } from "../../../components/tables/TableCellContent/StatusTag";
import Title from "antd/es/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp,  } from "@fortawesome/free-solid-svg-icons";
import { FilterOutlined } from "@ant-design/icons";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { FilterContextProvider } from "../../../components/contexts/FilterContext";
import { DataTableContext } from "../../../components/contexts/DataTableContext";
import FilterCollapse from "./StudentsWithApplications/filter/FilterCollapse";
import FilterForm from "./StudentsWithApplications/filter/FilterForm";
import StudentsWithApplicationsTable from "./StudentsWithApplications/table/StudentsWithApplicationsTable";

const {Text} =Typography

const StudentsWithApplications: React.FC = () => {
    const studentsWithApplications = useSelector(selectStudentsWithApplications)
    const areStudentsFetching = useSelector(selectAreStudentsFetching)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getStudentArrays())
    }, [])

    return (
        <>
            <FilterContextProvider>
                <DataTableContext.Provider value={{dataTable: studentsWithApplications, isDataFetching: areStudentsFetching}}>
                    <FilterCollapse/>
                    <StudentsWithApplicationsTable/>
                </DataTableContext.Provider>
            </FilterContextProvider>
        </>
    )
}

export default StudentsWithApplications