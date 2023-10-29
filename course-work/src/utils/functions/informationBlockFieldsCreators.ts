import { 
    CompanyDtoType, 
    InfoBlockItemType, 
    UserType,
    AdditionalStudentInformationType, 
    InnerStudentProfileInfoType,
    IntershipPositionDtoType,
    StudentApplicationInfoType
} from "../types/types"

// PROFILE
export const createCommonProfileInfoFieldsArray = (profileInfo: UserType) => {
    let fieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(profileInfo)
    
    if (keys.length === 0)
        fieldsArray = []
    else {
        fieldsArray = [
            {title: 'ФИО', text: `${profileInfo.lastName} ${profileInfo.firstName} ${profileInfo.patronym === null 
                ? "" 
                : profileInfo.patronym}` },
            {title: 'Электронная почта', text: profileInfo.email },
            {title: 'Группа', text: profileInfo.groupNumber },
        ]
    }
    return fieldsArray
}

const getSLTNamesArray = (SLTArray: Array<InnerStudentProfileInfoType> | null) => {
    let namesArray: Array<string> = []
    if (SLTArray !== null)
        SLTArray.map(SLTElement => namesArray.push(SLTElement.name))
    return namesArray
}
export const createAdditionalStudentProfileInfoFieldsArray = (additionalInfo: AdditionalStudentInformationType ) => {
    if (additionalInfo === undefined) return []
    let fieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(additionalInfo)
    
    if (keys.length === 0)
        fieldsArray = []
    else {
        fieldsArray = [
            {title: 'Предпочитаемые стеки', text: getSLTNamesArray(additionalInfo.stacks).join(', ') },
            {title: 'Навыки', text: [...getSLTNamesArray(additionalInfo.languages), 
                                     ...getSLTNamesArray(additionalInfo.technologies)].join(', ') },
            {title: 'Резюме', text: additionalInfo.resume },
        ]
    }
    return fieldsArray
}

export const createCompanyInfoFieldsArray = (companyInfo: CompanyDtoType) => {
    if (companyInfo === undefined) return []
    let companyInfoFieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(companyInfo)
    
    if (keys.length === 0)
        companyInfoFieldsArray = []
    else {
        companyInfoFieldsArray = [
            {title: 'Название', text: companyInfo.name },
            {title: 'Описание', text: companyInfo.description },
            {title: 'Сайт', text: companyInfo.websiteURL},
            {title: 'Адрес', text: companyInfo.address },
            {title: 'Контакты', text: companyInfo.contacts }, 
        ]
    }
    return companyInfoFieldsArray
}

export const createPositionInfoFieldsArray = (positionInfo: IntershipPositionDtoType) => {
    if (positionInfo === undefined) return []
    let companyInfoFieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(positionInfo)
    
    if (keys.length === 0)
        companyInfoFieldsArray = []
    else {
        companyInfoFieldsArray = [
            {title: 'Описание', text: positionInfo.description },
            {title: 'Стек', text: positionInfo.stack },
            {title: 'Основной используемый язык', text: positionInfo.language },
            {title: 'Используемые технологии', text: positionInfo.technologies.join(', ') },
            {title: 'Количество мест', text: String(positionInfo.numberOfPlaces) },
        ]
    }
    return companyInfoFieldsArray
}

export const createShortCompanyInfoFieldsArray = (companyInfo: CompanyDtoType) => {
    let companyInfoFieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(companyInfo)
    
    if (keys.length === 0)
        companyInfoFieldsArray = []
    else {
        companyInfoFieldsArray = [
            {title: 'Описание', text: companyInfo.description },
            {title: 'Сайт', text: companyInfo.websiteURL === '' ? 'не указан': companyInfo.websiteURL },
            {title: 'Адрес', text: companyInfo.address },
            {title: 'Контакты', text: companyInfo.contacts },
        ]
    }
    return companyInfoFieldsArray
}

export const createApplicationStudentInfoFieldsArray = (applicationStudentInfo: StudentApplicationInfoType ) => {
    if (applicationStudentInfo === undefined) return []
    let fieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(applicationStudentInfo)
    
    if (keys.length === 0)
        fieldsArray = []
    else {
        fieldsArray = [
            {title: 'Навыки студента', text: [...getSLTNamesArray(applicationStudentInfo.languages), 
                                     ...getSLTNamesArray(applicationStudentInfo.technologies)].join(', ') },
            {title: 'Резюме студента', text: applicationStudentInfo.resume },
        ]
    }
    return fieldsArray
}