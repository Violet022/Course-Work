import { ExtendedUserRoleType } from "../types/types"

export const isCurator = (userRole: ExtendedUserRoleType) => {
    if (userRole === 'CURATOR_ATTACHED' || userRole === 'CURATOR_NOT_ATTACHED')
        return true
    return false
}