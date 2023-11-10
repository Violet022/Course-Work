import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { selectIsCuratorAttachedToCompany, selectUserRole } from '../store/authentication/AuthSelectors'
import { ExtendedUserRoleType, UserRoleType } from '../utils/types/types'

export const useAppDispatch: () => AppDispatch = useDispatch

export function useRole(): ExtendedUserRoleType {
    const role: UserRoleType = useSelector(selectUserRole)
    const isCuratorAttachedToCompany = useSelector(selectIsCuratorAttachedToCompany)

    let userRole: ExtendedUserRoleType = ''
    if (role === 'CURATOR') {
        userRole = isCuratorAttachedToCompany ? 'CURATOR_ATTACHED' : 'CURATOR_NOT_ATTACHED'
    }
    else
        userRole = role

    return userRole
}