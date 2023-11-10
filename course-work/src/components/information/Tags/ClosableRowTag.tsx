import React, { useContext } from "react";
import { CuratorCompanyType, ShortCuratorType } from "../../../utils/types/types";
import { Tag } from "antd";
import { RowToManageCuratorsContext } from "../../contexts/RowToManageCuratorsContext";
import { useAppDispatch } from "../../../hooks/hooks";
import { removeCompanyFromCurator } from "../../../store/curators/CuratorsReducer";

type PropsType = {
    tag: CuratorCompanyType | ShortCuratorType
}

const ClosableRowTag: React.FC<PropsType> = ({tag}) => {
    const dispatch = useAppDispatch()
    const rowContext = useContext(RowToManageCuratorsContext)

    const handleClose = (removedTagId: string) => {
        if (rowContext.entityToSelect === 'COMPANY') {
            const curatorId = rowContext.entityWithWhichAssociateSelectedValuesId
            dispatch(removeCompanyFromCurator(curatorId, removedTagId))
        }
        else {
            const companyId = rowContext.entityWithWhichAssociateSelectedValuesId
            dispatch(removeCompanyFromCurator(removedTagId, companyId))
        }
    };

    return (
        <Tag closable={true}
             onClose={() => handleClose(tag.id)}
        >
            {tag.name}
        </Tag>
    )
}

export default ClosableRowTag