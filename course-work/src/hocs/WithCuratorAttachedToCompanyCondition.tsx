import React from "react";
import { useSelector } from "react-redux";
import { selectIsCuratorAttachedToCompany, selectUserRole } from "../store/authentication/AuthSelectors";
import CuratorIsNotAttachedToAnyCompany from "../components/information/Warnings/CuratorIsNotAttachedToAnyCompany";

function withCuratorAttachedToCompanyCondition(
    Component: React.ComponentType
  ) {
    const userRole = useSelector(selectUserRole)
    const isCuratorAttachedToCompany = useSelector(selectIsCuratorAttachedToCompany)

    if(userRole === 'CURATOR' && isCuratorAttachedToCompany)
        return <Component/>
    else
        return <CuratorIsNotAttachedToAnyCompany/>
}

export default withCuratorAttachedToCompanyCondition
  