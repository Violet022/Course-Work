import React from "react"
import { StudentWithApplicationsType } from "../../utils/types/types"

export const DataTableContext = React.createContext({
    dataTable: [] as Array<StudentWithApplicationsType>,
    isDataFetching: false as boolean
})