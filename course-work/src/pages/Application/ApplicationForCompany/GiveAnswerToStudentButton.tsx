import { Button, Modal } from "antd";
import React, { useState } from "react";
import ProposeOfferButton from "./ProposeOfferButton";
import RejectOfferButton from "./RejectOfferButton";

const GiveAnswerToStudentButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {setIsModalOpen(false)}
    const handleCancel = () => {setIsModalOpen(false)}

    return (
        <>
            <Button type="primary" onClick={() => {setIsModalOpen(true)}}>Дать студенту ответ</Button>
            <Modal className="give-answer-modal" title="Ответ студенту" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                centered
                style={{textAlign:'center'}}
                footer={[]}
            >
                <ProposeOfferButton/>
                <RejectOfferButton/>
            </Modal>
        </>
    )
}

export default GiveAnswerToStudentButton