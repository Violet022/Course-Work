import Title from "antd/es/typography/Title";
import React from "react";

type PropsType = {
    titlesLevels: Array<5 | 1 | 2 | 3 | 4 | undefined>,
    title: string,
    subTitle: string
}

const TitleWithSubtitle: React.FC<PropsType> = (props) => {
    return (
        <>
            <Title level={props.titlesLevels[0]} style={{ marginTop: 0, marginBottom: 4 }}>{props.title}</Title>
            <Title level={props.titlesLevels[1]} type="secondary" style={{ marginTop: 0, marginBottom: 12 }}>{props.subTitle}</Title>
        </>
    )
}

export default TitleWithSubtitle;