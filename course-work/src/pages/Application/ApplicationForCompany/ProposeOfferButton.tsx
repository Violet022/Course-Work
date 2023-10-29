import { Button } from "antd";
import React, { useState } from "react"
import ActionConfirmationModal from "../../../components/feedbacks/ActionConfirmationModal";
import { giveAnswerToStudentAfterInterview } from "../../../store/application/ApplicationReducer";
import { useAppDispatch } from "../../../hooks/hooks";

const ProposeOfferButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <>
            <Button className="left-button-in-two-buttons" type="primary" onClick={() => {setIsModalOpen(true)}}>Предложить оффер</Button>
            <ActionConfirmationModal
                innerText={`Предложить студенту оффер`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={() => dispatch(giveAnswerToStudentAfterInterview('OFFER_ISSUED'))}
            />
        </>
    )
}

export default ProposeOfferButton;