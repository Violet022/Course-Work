export const checkIfUndefined = (value: any) => {
    let returningValue = !!value ? value : ''
    return returningValue
}