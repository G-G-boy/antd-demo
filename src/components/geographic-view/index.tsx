import {FC, useEffect, useState} from 'react';
import {get} from '@/util/http';
import {Select, Spin} from 'antd';
import {LabeledValue} from 'antd/es/select';
import styles from './index.module.less';

export interface GeographicItemType {
    name: string;
    id: string;
}

const {Option} = Select;

const nullSelectItem: LabeledValue = {
    label: '',
    value: '',
    key: '',
};

const getOption = (list: GeographicItemType[]) => {
    if (!list || list.length < 1) {
        return (
            <Option key={0} value={0}>
                没有找到选项
            </Option>
        );
    }
    return list.map((item) => (
        <Option key={item.id} value={item.id}>
            {item.name}
        </Option>
    ));
};

const GeographicView: FC = () => {
    const [loading, setLoading] = useState(false);
    const [province, setProvince] = useState<LabeledValue>();
    const [city, setCity] = useState<LabeledValue>();
    const [allProvince, setAllProvince] = useState<GeographicItemType[]>([]);
    const [allcity, setAllCity] = useState<GeographicItemType[]>([]);

    useEffect(() => {
        setLoading(true);
        get<GeographicItemType[]>('province').then((res) => {
            setAllProvince(res.data.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (province) {
            setCity(nullSelectItem);
            setLoading(true);
            get<GeographicItemType[]>('city', {
                id: province.value as string,
            }).then((res) => {
                setAllCity(res.data.data);
                setLoading(false);
            });
        }
    }, [province]);

    return (
        <Spin spinning={loading} delay={300} wrapperClassName={styles.geographic_row}>
            <Select
                className={styles.geographic_item}
                value={province || nullSelectItem}
                labelInValue
                showSearch
                onSelect={setProvince}
            >
                {getOption(allProvince)}
            </Select>

            <Select
                className={styles.geographic_item}
                value={city || nullSelectItem}
                labelInValue
                showSearch
                onSelect={setCity}
            >
                {getOption(allcity)}
            </Select>
        </Spin>
    );
};

export default GeographicView;
