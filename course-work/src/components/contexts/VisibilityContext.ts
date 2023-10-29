import React from "react"

export const VisibilityContext = React.createContext({
    isFormVisible: false,
    toggleSwitcher: () => {}
})