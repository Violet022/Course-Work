import { ReactNode } from "react"
import { AppStateType } from "../../store/store"

// USER SERVICE
export type CreateUpdateGroupType = {
    groupNumber: string
}
export type GroupType = {
    groupNumber: string,
    students: Array<UserType>
}
export type UserType = {
    userId: string,
    firstName: string,
    lastName: string,
    patronym: string | null,
    role: UserRoleType,
    email: string,
    groupNumber: string | null,
    companyId: string | null
}
export type CreateUserType = {
    companyId: string | null,
    email: string,
    firstName: string,
    groupNumber: string | null,
    lastName: string,
    password: string,
    patronym: string | null,
    role: UserRoleType,
}
export type UpdateUserType = {
    email: string,
    firstName: string,
    lastName: string,
    patronym?: string | null,
}
export type UserSecurityType = {
    email: string,
    password: string,
    role: string
}
export type UserRoleType = 'STUDENT' | 'SCHOOL' | 'COMPANY' | 'CURATOR' | ''
export type ExtendedUserRoleType = 'STUDENT' | 'SCHOOL' | 'COMPANY' | 'CURATOR_ATTACHED' | 'CURATOR_NOT_ATTACHED' | ''

// APPLICATION SERVICE
export type ApplicationType = {
    companyId: string,
    companyName: string,
    id: string,
    interviews: Array<InterviewType>,
    position: string,
    positionId: string,
    priority: string | number,
    statusHistory: Array<StatusHistoryType>,
    studentId: string,
}
export type ApplicationTypeWithStudentInfo = {
    companyName: string,
    id: string,
    interviews: Array<InterviewType>,
    position: string,
    positionId: string,
    priority: string | number,
    statusHistory: Array<StatusHistoryType>,
    studentId: string,
    fio: string,
    groupNumber: string,
}
export type ApplicationPriorityType = {
    applicationId: string,
    priority: string | number
}
export type StudentProfileType = {
    applications: Array<ApplicationType>,
    id: string,
    languages: Array<InnerStudentProfileInfoType>,
    stacks: Array<InnerStudentProfileInfoType>,
    resume: string,
    technologies: Array<InnerStudentProfileInfoType>
}
export type InterviewType = {
    date: string,
    id: string,
    location: string
}
export type CreateUpdateInterviewType = {
    date: string,
    location: string
}
export type StatusHistoryType = {
    addedAt: string,
    applicationId: string,
    id: string,
    status: string
}

export type InnerStudentProfileInfoType = {
    id: number,
    name: string
}
export type UpdateStudentProfileType = {
    languages: Array<string>,
    positions: Array<string>,
    resume: string,
    technologies: Array<string>
}

// COMPANY SERVICE
export type CompanyDtoType = {
    address: string | null,
    contacts: string | null,
    createdAt: string,
    description: string | null,
    id: string,
    logoURL: string | null,
    name: string,
    positions: Array<IntershipPositionDtoType>
    updatedAt: string,
    websiteURL: string | null
}
export type CreateUpdateCompanyType = {
    address: string | null,
    contacts: string | null,
    description: string | null,
    logoURL: string | null,
    name: string,
    websiteURL: string | null
}
export type CreateIntershipPositionType = {
    companyId: string | null,
    description: string | null,
    languageId: string | number | null,
    numberOfPlaces: number | string | null,
    salaryRange: string | null,
    stackId: string | number | null,
    technologiesIds: Array<number>,
    title: string
}
export type IntershipPositionDtoType = {
    companyId: string,
    companyName: string,
    createdAt: string,
    description: string | null,
    id: string,
    language: string | null,
    numberOfApplications: number | string,
    numberOfPlaces: number | string | null,
    numberOfPlacesLeft: number | string | null,
    salaryRange: string | null,
    stack: string | null,
    status: string | null,
    technologies: Array<string>,
    title: string,
    updatedAt: string,
}
export type CreateUpdatePositionType = {
    companyId: string | null
    description: string | null,
    languageId: number | null,
    numberOfPlaces: number | string | null,
    salaryRange: string | null,
    stackId: string | number | null,
    technologiesIds: Array<number>,
    title: string,
}

// STACK SERVICE
export type LanguageType = {
    id: number,
    name: string,
    relatedStackIds: Array<number>,
    relatedTechnologyIds: Array<number>
}
export type CreateUpdateLanguageType = {
    name: string,
    relatedStackIds: Array<number>,
    relatedTechnologyIds: Array<number>
}
export type StackType = {
    id: number,
    name: string,
    relatedLanguageIds: Array<number>,
    relatedTechnologyIds: Array<number>
}
export type CreateUpdateStackType = {
    name: string,
    relatedLanguageIds: Array<number>,
    relatedTechnologyIds: Array<number>
}
export type TechnologyType = {
    id: number,
    name: string,
    relatedLanguageIds: Array<number>,
    relatedStackIds: Array<number>
}
export type CreateUpdateTechnologyType = {
    name: string,
    relatedLanguageIds: Array<number>,
    relatedStackIds: Array<number>
}

// CURATOR SERVICE
export type CuratorDtoType = {
    companies: Array<CuratorCompanyType>,
    id: string
}
export type CuratorCompanyType = {
    id: string,
    name: string
}
export type CuratorType = {
    companies: Array<CuratorCompanyType>,
    id: string
    fio: string
}
export type ShortCuratorType = {
    id: string
    name: string
}

export type AdditionalCuratorInfoType = {
    isAttachedToCompany: boolean,
    companies: Array<CuratorCompanyType>
}

// OTHER TYPES
export type CompanyWithCuratorsType = {
    id: string,
    name: string,
    curators: Array<ShortCuratorType>
}
export type InfoBlockItemType = {
    title: string,
    text: string | null
}
export type AdditionalStudentInformationType = {
    languages: Array<InnerStudentProfileInfoType> | null,
    stacks: Array<InnerStudentProfileInfoType> | null,
    resume: string | null,
    technologies: Array<InnerStudentProfileInfoType> | null
}

export type SelectOptionType = {
    value: string | number,
    label: string
}

export type StackAndElementsType = StackType | LanguageType | TechnologyType

export type TimelineItemType = {
    label: string,
    children: string | ReactNode,
    dot?: ReactNode,
    color: string,
}

export type StudentApplicationInfoType = {
    studentId: string,
    fio: string,
    languages: Array<InnerStudentProfileInfoType>,
    technologies: Array<InnerStudentProfileInfoType>,
    resume: string
}

export type IntershipPositionWithApplicationsType = {
    companyName: string,
    createdAt: string,
    description: string | null,
    id: string,
    language: string | null,
    numberOfApplications: number | string,
    numberOfPlaces: number | string | null,
    numberOfPlacesLeft: number | string | null,
    salaryRange: string | null,
    stack: string | null,
    status: string | null,
    technologies: Array<string>,
    title: string,
    updatedAt: string,
    applications: Array<ShortStudentApplicationInfo>
}

export type ShortStudentApplicationInfo = {
    studentId: string,
    applicationId: string,
    fio: string,
    groupNumber: string,
    statusHistory: Array<StatusHistoryType>
}

export type StudentWithoutApplicationsType = {
    id: string,
    fio: string,
    groupNumber: string,
    stacks: Array<InnerStudentProfileInfoType>  
}

export type StudentWithApplicationsType = {
    id: string,
    fio: string,
    groupNumber: string,
    position: string,
    priority: string | number,
    companyName: string,
    statusHistory: Array<StatusHistoryType>,
    stack: string
}

export type columnsArraysType = {
    groupNumber: Array<string>,
    position: Array<string>,
    stack: Array<string>,
    companyName: Array<string>,
    lastStatusText: Array<string>,
}

export type FilterFormColType = {
    name: studentWithApplicationsKeysType,
    label: string,
    placeholder: string,
}

export type studentsWithApplicationsFilterDataType = {
    groupNumber: string,
    position: string,
    companyName: string,
    statusHistory: string,
    stack: string,
}

export type studentWithApplicationsKeysType = keyof studentsWithApplicationsFilterDataType
