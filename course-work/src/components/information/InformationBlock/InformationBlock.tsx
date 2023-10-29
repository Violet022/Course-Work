import React from "react";
import { InfoBlockItemType } from '../../../utils/types/types';
import InformationBlockItem from "./InformationBlockItem";

type PropsType = {
    fields: Array<InfoBlockItemType>,
    colWidths: Array<number>
}

const InformationBlock: React.FC<PropsType> = (props) => {
    return (
      <>
        {
            props.fields.filter((field) => { return (field.text !== "" && field.text !== null)})
                        .map((notEmptyfield, idx) => <InformationBlockItem field={notEmptyfield} key={idx} colWidths={props.colWidths} />)
        }
      </>
    )
  };
  
export default InformationBlock;
