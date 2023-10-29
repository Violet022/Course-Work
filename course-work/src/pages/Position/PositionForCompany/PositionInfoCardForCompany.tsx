import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Title from 'antd/es/typography/Title';
import { selectUpdatedPositionInfoTemplate } from '../../../store/position/PositionSelectors';
import { IntershipPositionDtoType, CreateUpdatePositionType } from '../../../utils/types/types';
import { createPositionInfoFieldsArray } from '../../../utils/functions/informationBlockFieldsCreators';
import EditableInformationBlock from '../../../components/information/EditableInformationBlock/EditableInformationBlock';
import { getUpdatePositionForm } from '../../../components/forms/CreateUpdatePositionForm';
import { Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../hooks/hooks';
import ActionConfirmationModal from '../../../components/feedbacks/ActionConfirmationModal';
import { deletePosition } from '../../../store/position/PositionReducer';

type PropsType = {
    positionInfo: IntershipPositionDtoType
}

const PositionInfoCardForCompany: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const updatedPositionInfoTemp: CreateUpdatePositionType= useSelector(selectUpdatedPositionInfoTemplate)
    const dispatch = useAppDispatch()

    const DeletePosition = () => {
        dispatch(deletePosition())
        setIsModalOpen(false);
    }

    return (
        <>
            <div style={{marginBottom: 12}} >
                <Space align="center" style={{ marginBottom: 0}}>
                    <Title level={3} style={{ marginBlock: 0}}>
                        {props.positionInfo.title}
                    </Title>
                    <FontAwesomeIcon 
                        icon={faTrashCan} 
                        size='lg' 
                        style={{ color: "E76363", cursor: 'pointer'}}
                        onClick={() => {setIsModalOpen(true)}}
                    />
                </Space>
            </div>
            <EditableInformationBlock
                title='Информация о позиции'
                infoBlockdata={props.positionInfo}
                initialFormValues={updatedPositionInfoTemp}
                createInformationBlockFieldsArray={createPositionInfoFieldsArray}
                getForm={getUpdatePositionForm}
                colWidths={[5, 19]}
            />
            <ActionConfirmationModal
                innerText={`Удалить позицию`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={DeletePosition}
            />
        </>
    )
}

export default PositionInfoCardForCompany;
