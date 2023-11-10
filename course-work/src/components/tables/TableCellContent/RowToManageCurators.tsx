import React, { useCallback, useState } from "react"
import { CompanyDtoType, CuratorCompanyType, SelectOptionType, ShortCuratorType} from "../../../utils/types/types"
import { Button, Flex, Select, Space, Spin, Tag, theme} from "antd"
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { companyServiceAPI } from "../../../api/company-service-api";
import { addCompanyToCurator } from "../../../store/curators/CuratorsReducer";
import { useAppDispatch } from "../../../hooks/hooks";
import TagsRow from "../../information/Tags/TagsRow";
import TagForCuratorManaging from "../../information/Tags/TagForCuratorManaging";
import TagToSelectForCuratorManaging from "../../information/Tags/TagToSelectForCuratorManaging/TagToSelectForCuratorManaging";
import { RowToManageCuratorsContext } from "../../contexts/RowToManageCuratorsContext";

type PropsType = {
    tags: Array<CuratorCompanyType> | Array<ShortCuratorType>,
    entityWithWhichAssociateSelectedValuesId: string,
    entityToSelect: 'CURATOR' | 'COMPANY'
}

export const RowToManageCurators: React.FC<PropsType> = (props) => {
    return (
        <>
            <RowToManageCuratorsContext.Provider value={{
                tags: props.tags,
                entityWithWhichAssociateSelectedValuesId: props.entityWithWhichAssociateSelectedValuesId,
                entityToSelect: props.entityToSelect
            }}>
                <Flex justify={'space-between'} align={'center'}>
                    <Flex wrap="wrap" gap="small">
                        {
                            props.entityToSelect === 'COMPANY'
                            ? <TagsRow tags={props.tags} arrayIsEmptyMeaning="не назначен(а) куратором ни одной компании"/>
                            : <TagsRow tags={props.tags} arrayIsEmptyMeaning="не назначен(ы)"/>
                        }
                    </Flex>
                    <TagToSelectForCuratorManaging/>
                </Flex>
            </RowToManageCuratorsContext.Provider>
        </>
    )
}