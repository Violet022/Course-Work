import React, { useCallback, useState } from "react";
import { Form, Select, Spin } from "antd";
import { GroupType, SelectOptionType } from "../../../utils/types/types";
import { userServiceAPI } from "../../../api/user-service-api";

type PropsType = {
    isDisabled: boolean
}

const AllGroupsSelect: React.FC<PropsType> = ({isDisabled}) => {
    const [ options, setOptions ] = useState<Array<SelectOptionType>>([]);
    const [ areOptionsFetching, setAreOptionsFetching ] = useState(false);

    const getGroupsSelectOptions = useCallback( async () => {
        const groups = await userServiceAPI.getAllGroups()
        setOptions(groups.map((group: GroupType) => {
            return {
                value: group.groupNumber,
                label: group.groupNumber
            }
        }))
    }, []);

    const onSelectClick = (open: boolean) => {
        if (open === true) {
            setAreOptionsFetching(true)
            getGroupsSelectOptions()
                .then(() => setAreOptionsFetching(false))
        }
    }

    return (
        <Form.Item name="stGroupNumber" label="Группа"
                                // className={`form-item-${props.userRole !== 'STUDENT' ? 'disabled' : 'not-disables'}`}
                                // rules={[{ required: props.userRole === 'STUDENT', message: 'Выберите группу' }]}
                        >
        <Select
            allowClear
            disabled={isDisabled}
            placeholder="Выберите группу"
            notFoundContent={areOptionsFetching ? <Spin size="small" /> : null}
            options={options}
            onDropdownVisibleChange={(e) => {onSelectClick(e)}}
        />
        </Form.Item>
    )
}

export default AllGroupsSelect