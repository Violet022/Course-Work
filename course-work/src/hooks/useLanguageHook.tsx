import { useSelector } from "react-redux"
import { selectAllLanguages, selectAreLanguagesFetching } from "../store/stack/StackSelectors"
import React from "react"
import { getAllLanguages } from "../store/stack/StackReducer"
import { useAppDispatch } from "./hooks"

export function useLanguage() {
    const dispatch = useAppDispatch()
    const languages = useSelector(selectAllLanguages)
    const areFetching = useSelector(selectAreLanguagesFetching)

    React.useEffect(() => {
        dispatch(getAllLanguages())
    }, [])

    return {languages, areFetching}
}