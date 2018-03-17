import chalk from 'chalk';
import * as figlet from 'figlet';
import * as glob from 'glob';
import * as path from 'path';
import * as prompts from 'prompts';

import { Maker } from './lib/Maker';
import { scaffold } from './lib/scaffold';
import { handleError, stopIfValueIsUndefined } from './lib/utils';

console.log(chalk.blue(figlet.textSync('make')));
console.log('');
glob(path.join(__dirname, 'templates/*Maker.ts'), async (error: any, matches: string[]) => {
    if (error) {
        handleError(error);
    }

    const files = matches.map(m => ({
        path: m,
        name: m.replace(__dirname.split(path.sep).join('/'), '').replace('templates/', '').replace('.ts', '').substring(1),
    }));

    const makers: Maker[] = files.map(f => require(f.path)[f.name]).map(c => new c());
    const response = await prompts({
        type: 'autocomplete',
        name: 'value',
        message: 'Pick your template to create',
        choices: makers.map(m => ({
            title: m.name,
            value: m,
        })),
    });
    stopIfValueIsUndefined(response.value);

    try {
        await scaffold(response.value);
    } catch (err) {
        handleError(error);
    }
});
