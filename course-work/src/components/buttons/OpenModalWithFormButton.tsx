import { Button, Modal,  Space } from 'antd';
import React, { ReactNode, useState } from 'react';
import { VisibilityContext } from '../../components/contexts/VisibilityContext';
import { useSelector } from 'react-redux';

type PropsType = {
    buttonText: string,
    modalTitle: string,
    form: ReactNode
}

const OpenModalWithFormButton = (props: PropsType): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleButton = () => setIsModalOpen(prev => !prev)

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>{props.buttonText}</Button>
            <VisibilityContext.Provider value={{
                isFormVisible: isModalOpen,
                toggleSwitcher: toggleButton}}
            >
                <Modal 
                    title={props.modalTitle} 
                    open={isModalOpen} 
                    onOk={() => setIsModalOpen(false)} 
                    onCancel={() => setIsModalOpen(false)} 
                    centered
                    style={{textAlign:'center'}}
                    footer={[]}
                    >
                    {props.form}
                </Modal>
            </VisibilityContext.Provider>
            
        </>
    )
}

export default OpenModalWithFormButton;

