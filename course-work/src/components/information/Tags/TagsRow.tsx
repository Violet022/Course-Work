import { Tag } from "antd";
import React from "react";
import { CuratorCompanyType, ShortCuratorType } from "../../../utils/types/types";
import ClosableRowTag from "./ClosableRowTag";

type PropsType = {
    tags: Array<CuratorCompanyType> | Array<ShortCuratorType>
    arrayIsEmptyMeaning: string
}

const TagsRow: React.FC<PropsType> = (props) => {
    return (
        <>
            {
                props.tags.length === 0
                ? props.arrayIsEmptyMeaning
                : 
                    <>
                        {
                            props.tags.map((tag: CuratorCompanyType | ShortCuratorType, idx: number) => (
                                <ClosableRowTag key={tag.id} tag={tag}/>
                            ))
                        }
                    </>
            }
        </>
    )
}

export default TagsRow