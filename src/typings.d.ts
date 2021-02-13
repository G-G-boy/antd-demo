/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {title?: string}
    >;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    const classes: {readonly [key: string]: string};
    export default classes;
}

declare module '*.module.scss' {
    const classes: {readonly [key: string]: string};
    export default classes;
}

type Without<T, U> = {[P in Exclude<keyof T, keyof U>]?: never};
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
