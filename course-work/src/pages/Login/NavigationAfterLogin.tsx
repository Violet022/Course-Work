import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserRole } from "../../store/authentication/AuthSelectors";

const NavigationAfterLogin: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    let pathname: string = '/'
    if (!!userRole) {
        switch (userRole) {
            case 'STUDENT': pathname='/companies'; break
            case 'SCHOOL': pathname='/students'; break
            case 'COMPANY': pathname='/positions'; break
        }
    }
    return (
        <Navigate to={{pathname}}/>
    )
}

export default NavigationAfterLogin