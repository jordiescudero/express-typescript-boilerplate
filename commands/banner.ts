import chalk from 'chalk';
import * as figlet from 'figlet';

console.log(chalk.blue(figlet.textSync(process.argv[2])));
console.log('');
process.exit(0);
