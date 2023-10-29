import React, { useState } from "react"
import ActionConfirmationModal from "../feedbacks/ActionConfirmationModal"

type PropsType = {
    innerText: string,
    onSubmitBtnClick: () => void,
    isModalOpen: boolean,
    setIsModalOpen: (isOpen: boolean) => void
}

const ActionButtonWithConfirmation: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const updatedPositionInfoTemp: CreateUpdatePositionType= useSelector(selectUpdatedPositionInfoTemplate)
    // const dispatch = useAppDispatch()

    // const DeletePosition = () => {
    //     dispatch(deletePosition())
    //     setIsModalOpen(false);
    // }

    return (
        <>
            {/* <div style={{marginBottom: 12}} >
                <FontAwesomeIcon 
                    icon={faTrashCan} 
                    size='lg' 
                    style={{ color: "E76363", cursor: 'pointer'}}
                    onClick={() => {setIsModalOpen(true)}}
                />
            </div>
            <ActionConfirmationModal
                innerText={`Удалить позицию`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={DeletePosition}
            /> */}
        </>
    )
}

export default ActionButtonWithConfirmation;