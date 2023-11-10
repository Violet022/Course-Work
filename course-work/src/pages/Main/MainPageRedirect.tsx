import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsCuratorAttachedToCompany, selectUserRole } from "../../store/authentication/AuthSelectors";

const MainPageRedirect: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const isCuratorAttachedToCompany = useSelector(selectIsCuratorAttachedToCompany)
    let pathname: string = '/'
    if (userRole !== '') {
        switch (userRole) {
            case 'STUDENT': pathname='/companies'; break
            case 'SCHOOL': pathname='/students'; break
            case 'COMPANY': pathname='/positions'; break
            case 'CURATOR': {
                pathname = isCuratorAttachedToCompany ? '/companies' : '/students'
            }; break
        }
    }
    return (
        <Navigate to={{pathname}}/>
    )
}

export default MainPageRedirect