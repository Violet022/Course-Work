import { Button } from "antd";
import React, { useState } from "react"
import ActionConfirmationModal from "../../../components/feedbacks/ActionConfirmationModal";
import { acceptOrRejectOffer } from "../../../store/application/ApplicationReducer";
import { useAppDispatch } from "../../../hooks/hooks";

const AcceptOfferButton: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Button className="left-button-in-two-buttons" type="primary" onClick={() => {setIsModalOpen(true)}}>Принять</Button>
            <ActionConfirmationModal
                innerText={`Принять оффер`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={() => dispatch(acceptOrRejectOffer('OFFER_ACCEPTED'))}
            />
        </>
    )
}

export default AcceptOfferButton;