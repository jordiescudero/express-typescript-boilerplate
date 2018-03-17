export interface Context {
    name: ContextNames;
    filePath: string;
}

interface ContextNames {
    camelCase: string;
    snakeCase: string;
    capitalize: string;
    lowerCase: string;
    kebabCase: string;
    pluralize: string;
    normal: string;
}
