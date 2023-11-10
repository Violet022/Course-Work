import React from "react"
import { CuratorCompanyType, ShortCuratorType} from "../../utils/types/types"

export const RowToManageCuratorsContext = React.createContext({
    tags: [] as Array<CuratorCompanyType> | Array<ShortCuratorType>,
    entityWithWhichAssociateSelectedValuesId: '' as string,
    entityToSelect: 'CURATOR' as 'CURATOR' | 'COMPANY'
})