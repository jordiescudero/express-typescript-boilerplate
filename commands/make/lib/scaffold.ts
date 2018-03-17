import chalk from 'chalk';
import * as path from 'path';
import * as prompts from 'prompts';

import {
    existsFile, handleError, parseName, parsePath, stopIfValueIsUndefined, writeFile
} from './utils';

export const scaffold = async (maker: any) => {
    // Get name of the file
    const response = await prompts({
        type: 'text',
        name: 'value',
        message: 'Name',
    });
    stopIfValueIsUndefined(response.value);

    // Prepare context
    const name = parseName(response.value, maker.suffix);
    const filePath = parsePath(response.value, maker.suffix);
    const context = { name, filePath };

    // Call ask method to get more context
    let askContext;
    if (maker.ask) {
        askContext = await maker.ask(context);
        stopIfValueIsUndefined(askContext);
    }

    // Call make method to get file content
    const content = maker.make(context, askContext);

    // Prepare the file path
    const fullFilePath = path.join(__dirname, '../../../', `${maker.target}/${filePath}.ts`);

    // Check if file already exist
    let fileExists = false;
    try {
        fileExists = await existsFile(fullFilePath);
    } catch (error) {
        handleError(error);
    }

    if (fileExists) {
        const overrideResponse = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'Override file?',
            initial: true,
        });
        stopIfValueIsUndefined(overrideResponse.value);
    }

    // Create file
    try {
        await writeFile(fullFilePath, content);
    } catch (error) {
        handleError(error);
    }

    console.log('');
    console.log(chalk.green('✔ ') + 'Create the file: ' + chalk.bold.underline(fullFilePath));
    console.log('');

};
