import { Button } from "antd";
import React, { useState } from "react"
import ActionConfirmationModal from "../../../components/feedbacks/ActionConfirmationModal";
import { acceptOrRejectOffer, giveAnswerToStudentAfterInterview } from "../../../store/application/ApplicationReducer";
import { useAppDispatch } from "../../../hooks/hooks";

const RejectOfferButton: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useAppDispatch()

    return (
        <>
            <Button className="left-button-in-two-buttons" type="primary" onClick={() => {setIsModalOpen(true)}} danger>
                Отказать в оффере
            </Button>
            <ActionConfirmationModal
                innerText={`Отказать студенту в оффере`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={() => dispatch(giveAnswerToStudentAfterInterview('REJECTED'))}
                
            />
        </>
    )
}

export default RejectOfferButton;