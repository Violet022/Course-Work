import React from "react"

export const VisibilityContext = React.createContext({
    isVisible: false,
    toggleVisibilitySwitcher: (isVisible?: boolean) => {}
})