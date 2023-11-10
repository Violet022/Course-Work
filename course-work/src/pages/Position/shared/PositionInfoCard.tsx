import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../store/authentication/AuthSelectors';
import { Card, Spin } from 'antd';
import { selectIsPositionInfoFetching, selectPositionInfo } from '../../../store/position/PositionSelectors';
import { IntershipPositionDtoType } from '../../../utils/types/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { useParams } from 'react-router-dom';
import { getPositionInfo } from '../../../store/position/PositionReducer';
import SubmitApplicationButton from '../PositionForStudent/SubmitApplicationButton';
import PositionInfoCardForCompany from '../PositionForCompany/PositionInfoCardForCompany';
import PositionInfoCardForStudentAndSchool from './PositionInfoCardForStudentAndSchool';

const PositionInfoCard: React.FC = () => {
    const userRole = useSelector(selectUserRole)
    const isFetching = useSelector(selectIsPositionInfoFetching)
    const positionInfo: IntershipPositionDtoType = useSelector(selectPositionInfo)

    const params = useParams()
    const positionId = params.id == undefined ? "" : params.id 

    const dispatch = useAppDispatch()
    
    React.useEffect(() => {
        dispatch(getPositionInfo(positionId))
    }, [])

    return (
        <>
            <Card style={{ margin: 20 }}>
                <Spin spinning={isFetching}>
                    {
                        (userRole === 'COMPANY' || userRole === 'CURATOR') 
                        ? <PositionInfoCardForCompany positionInfo={positionInfo}/>
                        : <PositionInfoCardForStudentAndSchool positionInfo={positionInfo}/>
                    }
                    {userRole === 'STUDENT' && <SubmitApplicationButton positionId={positionId}/>}
                </Spin>
            </Card>
        </>
    )
}

export default PositionInfoCard;
