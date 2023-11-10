import { useSelector } from "react-redux"
import { selectAllTechnologies, selectAreTechnologiesFetching } from "../store/stack/StackSelectors"
import React from "react"
import { getAllTechnologies } from "../store/stack/StackReducer"
import { useAppDispatch } from "./hooks"

export function useTechnology() {
    const dispatch = useAppDispatch()
    const technologies = useSelector(selectAllTechnologies)
    const areFetching = useSelector(selectAreTechnologiesFetching)

    React.useEffect(() => {
        dispatch(getAllTechnologies())
    }, [])

    return {technologies, areFetching}
}