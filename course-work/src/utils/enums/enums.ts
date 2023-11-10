export enum ApplicationStatusToColourEnum { 
    'Подана заявка' = 'blue',
    'Назначено собеседование' = 'blue',
    'Ожидается ответ от компании после прохождения собеседования' = 'blue',
    'Ожидается ответ от студента' = 'blue',
    'Предложен оффер' = 'green',
    'Принят оффер' = 'green',
    'В оффере отказано' = 'red',
    'Не принят оффер' = 'red',
}

export type ApplicationStatusToColourEnumKeys = keyof typeof ApplicationStatusToColourEnum


