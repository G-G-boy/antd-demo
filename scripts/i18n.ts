import {extract, FormatFn, CompileFn, Comparator} from '@formatjs/cli';
import * as path from 'path';
import * as glob from 'glob';
// @ts-ignore
import zh_cn from '../src/locale/langs/zh_cn.json';

const pages = path.resolve(__dirname, '../src/pages');

export const format: FormatFn<Record<string, any>> = (msgs) => {
    const results: Record<string, string> = {};
    for (const k in msgs) {
        console.log((msgs[k] as any)['meta']);
        if (!(zh_cn as any)[k]) {
            results[k] = msgs[k].defaultMessage!;
        }
    }
    return results;
};

export const compareMessages: Comparator = (el1, el2) => {
    return el1.key < el2.key ? -1 : 1;
};

export const compile: CompileFn = (msgs) => {
    const results: Record<string, string> = {};
    for (const k in msgs) {
        results[k] = msgs[k].defaultMessage!;
    }
    return results;
};

glob.glob(pages + '/**/*.@(tsx|ts)', {}, (_err, files) => {
    const resultAsString: Promise<string> = extract(files, {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        format: {
            format,
            compareMessages,
            compile,
        },
        pragma: 'intl-meta',
    });

    resultAsString.then((res) => {
        console.log(res);
    });
});
