import * as fs from 'fs';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';

export const parseName = (name: string, suffix: string) => {
    name = name.split('/')[0];
    return {
        camelCase: _.camelCase(removeSufix(suffix, name)) + suffix,
        snakeCase: _.snakeCase(removeSufix(suffix, name)) + suffix,
        capitalize: _.upperFirst(_.camelCase(removeSufix(suffix, name)) + suffix),
        lowerCase: _.lowerCase(removeSufix(suffix, name)) + suffix,
        kebabCase: _.kebabCase(removeSufix(suffix, name)) + suffix,
        pluralize: pluralize(_.kebabCase(removeSufix(suffix, name))) + suffix,
        normal: name + suffix,
    };
};

export const parsePath = (name: string, suffix: string): string => {
    let ns = name.split('/');
    ns = ns.map((n, i) => {
        n = _.camelCase(removeSufix(suffix, n));
        return (i === (ns.length - 1)) ? _.upperFirst(n) : n;
    });
    return ns.join('/') + suffix;
};

export const removeSufix = (suffix: string, value: string) => {
    return value.replace(suffix, '');
};

export const existsFile = (filePath: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (err: any, stats: fs.Stats) => {
            if (err && err.code === 'ENOENT') {
                return resolve(false);
            }
            if (err) {
                return reject(err);
            }
            resolve(true);
        });

    });
};

export const writeFile = (filePath: string, content: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err: any) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });

    });
};

export const stopIfValueIsUndefined = (value: any): void => !value ? process.exit(0) : void 0;

export const handleError = (error: any): void => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
};
