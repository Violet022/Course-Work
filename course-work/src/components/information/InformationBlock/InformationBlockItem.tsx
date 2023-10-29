import React from "react";
import { InfoBlockItemType } from '../../../utils/types/types'
import { Col, Row, Typography } from "antd";

const { Text} = Typography;

type PropsType = {
    field: InfoBlockItemType,
    colWidths: Array<number>
}

const InformationBlockItem: React.FC<PropsType> = (props) => {
    return (
        <Row style={{ marginBottom: 2 }}>
            <Col span={props.colWidths[0]} style={{ paddingRight: 20 }}>
                <Text strong style={{ fontSize: 16, wordWrap: 'break-word' }}>
                    {props.field.title}
                </Text>
            </Col>
            <Col span={props.colWidths[1]} >
                <Text style={{ fontSize: 16, wordWrap: 'break-word'}}>
                    {props.field.text}
                </Text>
            </Col>
        </Row>
    )
  };
  
export default InformationBlockItem;
