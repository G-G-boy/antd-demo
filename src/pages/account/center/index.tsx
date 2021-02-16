import {FC, useEffect, useState} from 'react';
import PageContainer from '@/components/page-container';
import {Card, Col, Row} from 'antd';
import UserInfo from './user-info';

const AccountCenter: FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <PageContainer hasBg={false}>
            <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={8}>
                    <Card loading={loading}>
                        <UserInfo />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={16}>
                    <Card>
                        <div style={{height: 300}} />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default AccountCenter;
