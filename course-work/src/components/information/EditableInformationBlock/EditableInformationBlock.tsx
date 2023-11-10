import React, { useState } from 'react';
import { Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { 
    InfoBlockItemType, 
    UserType, 
    CompanyDtoType,
    AdditionalStudentInformationType,
    IntershipPositionDtoType, 
    CreateUpdatePositionType
} from '../../../utils/types/types';
import InformationBlock from '../InformationBlock/InformationBlock';
import { VisibilityContext } from '../../contexts/VisibilityContext';

type PropsType = {
    title: string,
    infoBlockdata: UserType | CompanyDtoType | AdditionalStudentInformationType | IntershipPositionDtoType,
    initialFormValues:  UserType | CompanyDtoType | AdditionalStudentInformationType | CreateUpdatePositionType,
    createInformationBlockFieldsArray: (editableInformationBlockInfo: any) => Array<InfoBlockItemType>,
    getForm: (currentData: any) => any,
    colWidths: Array<number>
}

const EditableInformationBlock: React.FC<PropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const toggleEditIcon = () => setIsEditMode(prev => !prev)

    return (
        <>
            <div style={{marginBottom: 16}}>
                <div style={{marginBottom: 8}} >
                    <Space align="center" style={{ marginBottom: 0}}>
                        <Title level={5} style={{ marginBlock: 0, fontSize: 18}}>
                            {props.title}
                        </Title>
                        <FontAwesomeIcon 
                            icon={faPenToSquare} 
                            size='lg' 
                            style={{ color: "8C8C8C", cursor: 'pointer'}}
                            onClick={toggleEditIcon}
                        />
                    </Space>
                </div>
                <VisibilityContext.Provider value={{
                    isVisible : isEditMode,
                    toggleVisibilitySwitcher: toggleEditIcon
                }}>
                    {
                        isEditMode
                        ? props.getForm(props.initialFormValues)
                        : <InformationBlock fields={props.createInformationBlockFieldsArray(props.infoBlockdata)} colWidths={props.colWidths}/>
                    }
                </VisibilityContext.Provider>
            </div>
        </>
    )
}

export default EditableInformationBlock;