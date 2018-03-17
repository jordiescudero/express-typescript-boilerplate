import { Context } from './Context';

export interface Maker {
    name: string;
    suffix: string;
    target: string;

    ask?<T>(context: Context): Promise<T>;
    make<T>(context: Context, askContext: T): string;
}
