import { Button, Modal } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';

type PropsType = {
    innerText: string,
    onSubmitBtnClick: () => void,
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void
}

const ActionConfirmationModal: React.FC<PropsType> = (props) => {
    const onSubmit = ()=> {
        props.setIsModalOpen(false)
        props.onSubmitBtnClick()
    }

    return (
        <>
            <Modal 
                className='confirmationModal'
                title={props.innerText} 
                open={props.isModalOpen} 
                onOk={() => {props.setIsModalOpen(false)}} 
                onCancel={() => {props.setIsModalOpen(false)}} 
                centered
                footer={[
                    <Button style={{marginRight: 4}} onClick={() => {props.setIsModalOpen(false)}}>
                        Нет
                    </Button>,
                    <Button style={{marginLeft: 4}} type="primary" key="submit" onClick={onSubmit}>
                        Да
                    </Button>
                ]}
            >
                <div style={{marginTop: 30, marginBottom: 30 }}>Вы уверены, что хотите {props.innerText.toLowerCase()}?</div>
            </Modal>
        </>
    )
}

export default ActionConfirmationModal;