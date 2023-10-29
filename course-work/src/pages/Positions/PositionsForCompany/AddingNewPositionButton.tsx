import { Button, Modal,  Space } from 'antd';
import React, { useState } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import CreateUpdatePositionForm from '../../../components/forms/CreateUpdatePositionForm';
import { createNewPosition, setNewPosition } from '../../../store/position/PositionReducer';
import { useSelector } from 'react-redux';
import { selectNewPositionTemplate } from '../../../store/position/PositionSelectors';

const AddingNewPositionButton: React.FC = () => {
    const newPosition = useSelector(selectNewPositionTemplate)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleButton = () => setIsModalOpen(prev => !prev)

    return (
        <>
            <Space wrap style={{ paddingTop: 18}}>
                 <Button type="primary" onClick={() => setIsModalOpen(true)}>Добавить новую позицию</Button>
            </Space>
            <VisibilityContext.Provider value={{
                isFormVisible: isModalOpen,
                toggleSwitcher: toggleButton}}
            >
                <Modal 
                    title="Создание новой позиции" 
                    open={isModalOpen} 
                    onOk={() => setIsModalOpen(false)} 
                    onCancel={() => setIsModalOpen(false)} 
                    centered
                    style={{textAlign:'center'}}
                    footer={[]}
                    >
                    <CreateUpdatePositionForm 
                        initialValues={newPosition}
                        onChangeValues={setNewPosition}
                        onSubmit={createNewPosition}
                    />
                </Modal>
            </VisibilityContext.Provider>
            
        </>
    )
}

export default AddingNewPositionButton;