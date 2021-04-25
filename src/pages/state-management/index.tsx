import {
    createContext,
    FC,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
    MutableRefObject,
} from 'react';
import PageContainer from '@/components/page-container';
import {Button} from 'antd';
import {isEqual} from 'lodash';
import {Subject} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import {useUpdateEffect} from 'ahooks';

type StateType = {count: number; str: string};
const defaultState: StateType = {count: 0, str: '666'};

const StoreContext = createContext<MutableRefObject<StateType>>({current: defaultState});

const StoreSubscriptionContext = createContext<Subject<StateType>>(new Subject<StateType>());

const DispatchContext = createContext<(...args: any[]) => any>(() => undefined);

const useStore = () => useContext(StoreContext);

const useStore$ = () => useContext(StoreSubscriptionContext);

const useDispatch = () => useContext(DispatchContext);

const useSelector: <T = any, E = T>(
    selector: (state: StateType) => T,
    compare?: (value: T, other: E) => boolean,
) => T = (selector, compare = isEqual) => {
    const [, forceRender] = useReducer((s) => s + 1, 0);
    const store = useStore();
    const state$ = useStore$();
    const selectedState = useRef<any>(selector(store.current));

    useEffect(() => {
        const subscription = state$
            .pipe(
                map((state) => selector(state)),
                filter((latestStoreState) => !compare(latestStoreState, selectedState.current)),
            )
            .subscribe((state) => {
                selectedState.current = state;
                forceRender();
            });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line
    }, []);

    return selectedState.current;
};

const DispatchProvider: FC<{setState: (...args: any[]) => any}> = ({children, setState}) => {
    return <DispatchContext.Provider value={setState}>{children}</DispatchContext.Provider>;
};

const StateProver: FC = ({children}) => {
    const [state, setState] = useState(defaultState);
    const store$ = useMemo(() => new Subject<StateType>(), []);
    const store = useRef<StateType>(state);

    useUpdateEffect(() => {
        store$.next(state);
    }, [store$, state]);

    return (
        <StoreContext.Provider value={store}>
            <StoreSubscriptionContext.Provider value={store$}>
                <DispatchProvider setState={setState}>{children}</DispatchProvider>
            </StoreSubscriptionContext.Provider>
        </StoreContext.Provider>
    );
};

const StateShow: FC = () => {
    const count = useSelector((state) => state.count);
    console.log('=====StateShow', count);

    return <div>{count}</div>;
};

const StrShow: FC = () => {
    const str = useSelector((state) => state.str);
    console.log('=====Str');
    return <div>{str}</div>;
};

const SetState: FC = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Button onClick={() => dispatch((state) => ({...state, count: state.count + 1}))}>
                +
            </Button>
            <Button
                onClick={() => dispatch((state) => ({...state, str: `${new Date().getTime()}`}))}
            >
                str
            </Button>
        </>
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
