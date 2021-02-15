import * as echarts from 'echarts/core';
import {
    GridComponent,
    GridComponentOption,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    VisualMapComponent,
} from 'echarts/components';
import {
    BarChart,
    BarSeriesOption,
    PieChart,
    PieSeriesOption,
    RadarChart,
    RadarSeriesOption,
} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

export type ECOption = echarts.ComposeOption<
    BarSeriesOption | GridComponentOption | PieSeriesOption | RadarSeriesOption
>;

echarts.use([
    VisualMapComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    BarChart,
    PieChart,
    RadarChart,
    CanvasRenderer,
]);

export default echarts;
