import {FC, useEffect} from 'react';
import echarts, {ECOption} from '@/util/echarts';

const option: ECOption = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
        },
    ],
};

const Bar: FC = () => {
    useEffect(() => {
        const myChart = echarts.init(document.getElementById('bar') as HTMLDivElement);
        myChart.setOption<ECOption>(option);
    }, []);
    return <div id="bar" style={{width: '100%', height: '500px'}} />;
};

export default Bar;
