import React from 'react';
import { useSelector } from 'react-redux';
import { selectAreStudentsFetching, selectCompanyStudents } from '../../../store/students/StudentsSelectors';
import { getCompanyStudents } from '../../../store/students/StudentsReducer';
import { List, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/hooks';

const StudentsForCompanyContainer: React.FC = () => {
    const companyStudents = useSelector(selectCompanyStudents)
    const areFetching = useSelector(selectAreStudentsFetching)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(getCompanyStudents())
    }, [])

    return (
        <>
            <Spin spinning={areFetching }>
                {!areFetching  &&
                    <List
                        itemLayout="horizontal"
                        dataSource={companyStudents}
                        renderItem={(item) => (
                            <List.Item style={{ cursor: 'pointer'}}
                                 onClick={() => navigate(`/students/${item.userId}`)}>
                                {item.lastName} {item.firstName} {item.patronym === null ? '' : item.patronym}
                            </List.Item>
                        )}
                    />
                }
            </Spin>
        </>
    )
};

export default StudentsForCompanyContainer;