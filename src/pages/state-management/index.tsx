import {FC, createContext, useState, useContext, useRef, useEffect, MutableRefObject} from 'react';
import PageContainer from '@/components/page-container';
import {Button} from 'antd';

type StateType = {count: number; str: string};
const defaultState: StateType = {count: 0, str: ''};
const StateContext = createContext<MutableRefObject<StateType>>({current: defaultState});

const SetStateContext = createContext<(...args: any[]) => any>(() => undefined);

const useStore = () => {
    const state = useContext(StateContext);
    return state.current;
};

const useDispatch = () => {
    return useContext(SetStateContext);
};

const SetStateProvider: FC<{setState: (...args: any[]) => any}> = ({children, setState}) => {
    return <SetStateContext.Provider value={setState}>{children}</SetStateContext.Provider>;
};

const StateProver: FC = ({children}) => {
    const [state, setState] = useState(defaultState);
    const storeRef = useRef(defaultState);

    useEffect(() => {
        storeRef.current = state;
    }, [state]);

    return (
        <StateContext.Provider value={storeRef}>
            <SetStateProvider setState={setState}>{children}</SetStateProvider>
        </StateContext.Provider>
    );
};

const StateShow: FC = () => {
    const state = useStore();
    const [, forceUpdate] = useState(0);
    console.log('=====StateShow', state.count);

    return (
        <div>
            {state.count}
            <Button onClick={() => forceUpdate((a) => ++a)}>forceUpdate</Button>
        </div>
    );
};

const StrShow: FC = () => {
    const state = useStore();
    console.log('=====Str');
    return <div>{state.str}</div>;
};

const SetState: FC = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch((state) => ({...state, count: state.count + 1}))}>+</Button>
    );
};

const NoThing: FC = () => {
    console.log('=====Not Thing');
    return <div>Not Thing</div>;
};

const StateManagement: FC = () => {
    return (
        <PageContainer>
            <StateProver>
                <StateShow />
                <SetState />
                <StrShow />
                <NoThing />
            </StateProver>
        </PageContainer>
    );
};

export default StateManagement;
