import React, { useCallback, useState } from "react"
import { CompanyDtoType, CuratorCompanyType, SelectOptionType, ShortCuratorType} from "../../../../utils/types/types"
import { Button, Flex, Select, Space, Spin, Tag, theme} from "antd"
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { VisibilityContext } from "../../../contexts/VisibilityContext";
import { SelectedValuesContextProvider } from "../../../contexts/SelectedValuesContext";
import SelectForCuratorManaging from "../../../dataProviders/Selects/SelectForCuratorManaging";
import TagForCuratorManaging from "../TagForCuratorManaging";
import CuratorManagingControlButtons from "../../../buttons/CuratorManagingControlButtons";

type PropsType = {
    tags: Array<CuratorCompanyType> | Array<ShortCuratorType>,
    entityWithWhichAssociateSelectedValuesId: string,
    entityToSelect: 'CURATOR' | 'COMPANY'
}

const TagToSelectForCuratorManaging: React.FC = () => {
    const [ isSelectVisible, setSelectVisible ] = useState(false);

    return (
        <> 
            <Flex>
                <VisibilityContext.Provider value={{ isVisible : isSelectVisible,
                    toggleVisibilitySwitcher: (isVisible?: boolean) => setSelectVisible(!!isVisible)
                }}>
                    <SelectedValuesContextProvider>
                        {   
                            isSelectVisible 
                            ? 
                                <Space>
                                    <SelectForCuratorManaging/>
                                    <CuratorManagingControlButtons/>
                                </Space> 
                            : 
                                <TagForCuratorManaging/>
                        } 
                    </SelectedValuesContextProvider>
                </VisibilityContext.Provider>
            </Flex>
        </>
    )  
}

export default TagToSelectForCuratorManaging