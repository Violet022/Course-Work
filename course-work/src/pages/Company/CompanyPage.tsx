import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Card, Col, Collapse, Divider, Layout, List, Row, Space, Spin, Typography } from "antd";
import Title from "antd/es/typography/Title";
import InformationBlock from "../../components/information/InformationBlock/InformationBlock";
import { selectUserRole } from "../../store/authentication/AuthSelectors";
import PositionsTableForStudent from "./CompanyForStudent/PositionsTableForStudent";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faGlobe } from "@fortawesome/free-solid-svg-icons";
import PositionsTableForSchool from "./CompanyForSchool/PositionsTableForSchool";
import { selectCompanyInfo, selectIsCompanyInfoFetching } from "../../store/company/CompanySelectors";
import { CompanyDtoType, InfoBlockItemType } from "../../utils/types/types";
import { getCompanyInfo } from "../../store/company/CompanyReducer";
import { useAppDispatch } from "../../hooks/hooks";
import { Image } from 'antd';

const { Text, Link } = Typography;

const createCompanyInfoFieldsArray = (companyInfo: CompanyDtoType) => {
    let companyInfoFieldsArray: Array<InfoBlockItemType>
    const keys = Object.keys(companyInfo)
    
    if (keys.length === 0)
        companyInfoFieldsArray = []
    else {
        companyInfoFieldsArray = [
            {title: 'Сайт', text: companyInfo.websiteURL },
            {title: 'Описание', text: companyInfo.description },
            {title: 'Контакты', text: companyInfo.contacts },
            {title: 'Адрес', text: companyInfo.address },
        ]
    }
    return companyInfoFieldsArray
}

const CompanyPage: React.FC = () => {
    const isFetching = useSelector(selectIsCompanyInfoFetching)
    const [isTableOpened, setIsTableOpened] = useState(false)
    const dispatch = useAppDispatch()
    const params = useParams()
    const companyId = params.id == undefined ? "" : params.id 
    const userRole = useSelector(selectUserRole)
    const companyInfo: CompanyDtoType = useSelector(selectCompanyInfo)

    React.useEffect(() => {
        dispatch(getCompanyInfo(companyId))
    }, [])

    const getTable = () => {
        if (userRole === 'STUDENT') return <PositionsTableForStudent/>
        if (userRole === 'SCHOOL') return <PositionsTableForSchool/>
    }

    const imageSrc = useMemo(() => {
        if (companyInfo.logoURL !== undefined) {
            if(companyInfo.logoURL !== null && companyInfo.logoURL !== '') return companyInfo.logoURL
            else return 'error'
        }
        else return 'error'
    }, [companyInfo])

    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 30 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={isFetching}>
                        <div style={{ marginBottom: 12 }}>
                            <Row align="middle">
                                <Image
                                    width={100}
                                    height={'auto'}
                                    preview={false}
                                    style={{ aspectRatio: 'attr(width) / attr(height)', borderRadius: '50%', float: 'left'}}
                                    src={imageSrc}
                                    fallback="data:image/png;base64,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"
                                />
                                <Col flex="auto" style={{marginLeft: 12}}>
                                    <Title level={3} style={{ marginTop: 0, marginBottom: 4}}>
                                        {companyInfo !== undefined ? companyInfo.name : ''}
                                    </Title>
                                    {
                                        (companyInfo.websiteURL !== null && companyInfo.websiteURL !== '') &&
                                        <>
                                            <Space align="center" style={{cursor: 'pointer'}}>
                                                <FontAwesomeIcon icon={faGlobe} style={{ color: "rgb(140, 140, 140)"}}/>
                                                <Title level={5} type="secondary" style={{ marginBlock: 0}}>
                                                    <a target="_blank" href={companyInfo.websiteURL}>{companyInfo.websiteURL}</a>
                                                </Title>
                                            </Space>
                                        </>
                                    }
                                </Col>
                            </Row>
                        </div> 
                        <InformationBlock fields={createCompanyInfoFieldsArray(companyInfo)} colWidths={[3, 21]}/>
                    </Spin>
                </Card>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={false}>
                        <div style={{marginBottom: 8}} className="blockOpening">
                            <Space align="end" onClick={() => {setIsTableOpened(!isTableOpened)}} 
                                style={{ cursor: 'pointer', marginBottom: 0}}>
                                <Title level={4} style={{ marginBlock: 0}}>
                                    Позиции
                                </Title>
                                {
                                    isTableOpened
                                    ? <FontAwesomeIcon icon={faChevronDown} className="arrow"/>
                                    : <FontAwesomeIcon icon={faChevronUp} className="arrow"/>
                                }
                            </Space>
                        </div>
                        {
                            isTableOpened && getTable()
                        }
                       
                    </Spin>
                </Card>
            </Layout>
        </>
    )
}

export default CompanyPage;