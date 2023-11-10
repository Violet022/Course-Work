import { Button } from "antd";
import React, { useState } from "react"
import ActionConfirmationModal from "../../../components/feedbacks/ActionConfirmationModal";
import { acceptOrRejectOffer } from "../../../store/application/ApplicationReducer";
import { useAppDispatch } from "../../../hooks/hooks";

const RejectOfferButton: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Button type="primary" onClick={() => {setIsModalOpen(true)}} danger>Отклонить</Button>
            <ActionConfirmationModal
                innerText={`Отклонить оффер`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={() => dispatch(acceptOrRejectOffer('OFFER_REJECTED'))}
            />
        </>
    )
}

export default RejectOfferButton;