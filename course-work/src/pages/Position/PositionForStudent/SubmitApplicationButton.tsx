import { Button, Modal, Space, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    selectIsStudentAppliedAnApplication,
    selectIsStudentAppliedAnApplicationFetching,
    selectPositionName 
} from '../../../store/position/PositionSelectors';
import { useAppDispatch } from '../../../hooks/hooks';
import { createApplicationForPosition, findOutIsStudentAppliedAnApplication } from '../../../store/position/PositionReducer';
import ActionConfirmationModal from '../../../components/feedbacks/ActionConfirmationModal';
const { Text} = Typography;

type PropsType = {
    positionId: string
}

const SubmitApplicationButton: React.FC<PropsType> = (props) => {
    const positionName = useSelector(selectPositionName)
    const isApplicationApplied = useSelector(selectIsStudentAppliedAnApplication)
    const isFetching = useSelector(selectIsStudentAppliedAnApplicationFetching)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(findOutIsStudentAppliedAnApplication(props.positionId))
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const SubmitApplicationBtnClick = () => {
        dispatch(createApplicationForPosition())
        setIsModalOpen(false);
    }

    return (
        <>
            <Spin spinning={isFetching}>
                <Space wrap style={{paddingTop: 12}}>
                    <Button type="primary" disabled={isApplicationApplied} onClick={() => {setIsModalOpen(true)}}>
                        {
                            isApplicationApplied
                            ? <Text>Заявка подана</Text>
                            : <Text style={{color: 'white'}}>Подать заявку</Text>
                        }
                    </Button>
                </Space>
            </Spin>
            <ActionConfirmationModal
                innerText={`Подать заявку на прохождение практики на данную позицию`}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSubmitBtnClick={SubmitApplicationBtnClick}
            />
        </>
    )
}

export default SubmitApplicationButton;