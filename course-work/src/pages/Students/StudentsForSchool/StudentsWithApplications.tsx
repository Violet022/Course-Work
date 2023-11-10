import React from "react";
import { useSelector } from "react-redux";
import { 
    selectAreStudentsFetching,
    selectStudentsWithApplications,
} from "../../../store/students/StudentsSelectors";
import { useAppDispatch } from "../../../hooks/hooks";
import { getCuratorCompaniesStudents, getStudentArrays } from "../../../store/students/StudentsReducer";
import { FilterContextProvider } from "../../../components/contexts/FilterContext";
import { DataTableContext } from "../../../components/contexts/DataTableContext";
import FilterCollapse from "./StudentsWithApplications/filter/FilterCollapse";
import StudentsWithApplicationsTable from "./StudentsWithApplications/table/StudentsWithApplicationsTable";
import { selectIsCuratorAttachedToCompany, selectUserRole } from "../../../store/authentication/AuthSelectors";

const StudentsWithApplications: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const isCuratorAttachedToCompany = useSelector(selectIsCuratorAttachedToCompany)
    const studentsWithApplications = useSelector(selectStudentsWithApplications)
    const areStudentsFetching = useSelector(selectAreStudentsFetching)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if(userRole === 'CURATOR' && isCuratorAttachedToCompany)
            dispatch(getCuratorCompaniesStudents())
        else
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