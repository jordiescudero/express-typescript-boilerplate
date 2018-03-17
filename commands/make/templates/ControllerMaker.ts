import { Context } from '../lib/Context';
import { Maker } from '../lib/Maker';

export class ControllerMaker implements Maker {

    public name = 'Controller';
    public suffix = 'Controller';
    public target = 'src/api/controllers';

    public make(context: Context): string {
        return `import { Authorized,  JsonController } from 'routing-controllers';

@Authorized()
@JsonController('/${context.name.pluralize}')
export class ${context.name.capitalize}Controller {

}
`;
    }

}
