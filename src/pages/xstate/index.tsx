import {FC} from 'react';
import PageContainer from '../../components/page-container';
import {createMachine} from 'xstate';
import {useMachine} from '@xstate/react';

// The events that the machine handles
type LightEvent =
    | {type: 'TIMER'}
    | {type: 'POWER_OUTAGE'}
    | {type: 'PED_COUNTDOWN'; duration: number};

// The context (extended state) of the machine
interface LightContext {
    elapsed: number;
}

const lightMachine = createMachine<LightContext, LightEvent>({
    key: 'light',
    initial: 'green',
    context: {elapsed: 0},
    states: {
        green: {
            on: {
                TIMER: {target: 'yellow'},
                POWER_OUTAGE: {target: 'red'},
            },
        },
        yellow: {
            on: {
                TIMER: {target: 'red'},
                POWER_OUTAGE: {target: 'red'},
            },
        },
        red: {
            on: {
                TIMER: {target: 'green'},
                POWER_OUTAGE: {target: 'red'},
            },
            initial: 'walk',
            states: {
                walk: {
                    on: {
                        PED_COUNTDOWN: {target: 'wait'},
                    },
                },
                wait: {
                    on: {
                        PED_COUNTDOWN: {
                            target: 'stop',
                            cond: (context, event) => {
                                return event.duration === 0 && context.elapsed > 0;
                            },
                        },
                    },
                },
                stop: {
                    // Transient transition
                    always: {
                        target: '#light.green',
                    },
                },
            },
        },
    },
});

const Xstate: FC = () => {
    return <PageContainer></PageContainer>;
};

export default Xstate;
