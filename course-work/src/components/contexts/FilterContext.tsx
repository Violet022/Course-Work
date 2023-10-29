import { FilterValue } from "antd/es/table/interface";
import React, { ReactNode, useContext, useState } from "react"

export const FilterContext = React.createContext({
    filteredInfo: {} as Record<string, FilterValue | null>,
    setFilteredInfo: (filteredInfo: Record<string, FilterValue | null>) => {}
})

export const FilterContextProvider = ({children}: {children: ReactNode}) => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({})
    return (
        <FilterContext.Provider value={{
            filteredInfo: filteredInfo,
            setFilteredInfo: setFilteredInfo
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    return useContext(FilterContext)
}