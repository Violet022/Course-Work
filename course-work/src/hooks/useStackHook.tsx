import React from "react";
import { useAppDispatch } from "./hooks";
import { useSelector } from "react-redux";
import { selectAllStacks, selectAreStacksFetching } from "../store/stack/StackSelectors";
import { getAllStacks } from "../store/stack/StackReducer";

export function useStack() {
    const dispatch = useAppDispatch()
    const stacks = useSelector(selectAllStacks)
    const areFetching = useSelector(selectAreStacksFetching)

    React.useEffect(() => {
        dispatch(getAllStacks())
    }, [])

    return {stacks, areFetching}
}