import {FC} from 'react';
import {Card, Row, Col} from 'antd';
import PageContainer from '@/components/page-container';
import Bar from './bar';
import Pie from './pie';
import Radar from './radar';

const cardColResponsive = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
};

const Dashboard: FC = () => {
    return (
        <PageContainer hasBg={false}>
            <Row gutter={[24, 24]} className="mb-6">
                <Col {...cardColResponsive}>
                    <Card>
                        <Pie />
                    </Card>
                </Col>
                <Col {...cardColResponsive}>
                    <Card>
                        <Radar />
                    </Card>
                </Col>
            </Row>
            <Card>
                <Bar />
            </Card>
        </PageContainer>
    );
};

export default Dashboard;
