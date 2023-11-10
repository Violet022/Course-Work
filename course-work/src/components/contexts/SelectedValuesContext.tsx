import React, { ReactNode, useContext, useState } from "react"

export const SelectedValuesContext = React.createContext({
    selectedValues: [] as Array<string>,
    setSelectedValues: (values: Array<string>) => {}
})

export const SelectedValuesContextProvider = ({children}: {children: ReactNode}) => {
    const [ selectedValues, setSelectedValues ] = useState<Array<string>>([]);
    return (
        <SelectedValuesContext.Provider value={{
            selectedValues: selectedValues,
            setSelectedValues: setSelectedValues
        }}>
            {children}
        </SelectedValuesContext.Provider>
    )
}

export const useSelectedValues = () => {
    return useContext(SelectedValuesContext)
}



