import { Button, Modal,  Space } from 'antd';
import React, { useState } from 'react';
import { VisibilityContext } from '../../../components/contexts/VisibilityContext';
import { useSelector } from 'react-redux';
import { selectNewInterviewTemplate } from '../../../store/application/ApplicationSelectors';
import CreateUpdateInterviewForm from '../../../components/forms/CreateUpdateInterviewForm';
import { setNewInterview, sheduleAnInterview } from '../../../store/application/ApplicationReducer';

const CreatingInterviewButton: React.FC = () => {
    const newInterview = useSelector(selectNewInterviewTemplate)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleButton = () => setIsModalOpen(prev => !prev)

    return (
        <div>
            <Space wrap style={{ paddingTop: 0, paddingBottom: 12}}>
                 <Button type="primary" onClick={() => setIsModalOpen(true)}>Назначить собеседование</Button>
            </Space>
            <VisibilityContext.Provider value={{
                isVisible: isModalOpen,
                toggleVisibilitySwitcher: toggleButton}}
            >
                <Modal 
                    title="Назначение собеседования" 
                    open={isModalOpen} 
                    onOk={() => setIsModalOpen(false)} 
                    onCancel={() => setIsModalOpen(false)} 
                    centered
                    style={{textAlign:'center'}}
                    footer={[]}
                    >
                    <CreateUpdateInterviewForm 
                        initialValues={newInterview}
                        onChangeValues={setNewInterview}
                        onSubmit={sheduleAnInterview}
                    />
                </Modal>
            </VisibilityContext.Provider>
            
        </div>
    )
}

export default CreatingInterviewButton;