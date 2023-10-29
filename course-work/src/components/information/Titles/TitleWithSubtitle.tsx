import Title from "antd/es/typography/Title";
import React from "react";

type PropsType = {
    title: string,
    subTitle: string
}

const TitleWithSubtitle: React.FC<PropsType> = (props) => {
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 4 }}>{props.title}</Title>
            <Title level={5} type="secondary" style={{ marginTop: 0, marginBottom: 12 }}>{props.subTitle}</Title>
        </>
    )
}

export default TitleWithSubtitle;