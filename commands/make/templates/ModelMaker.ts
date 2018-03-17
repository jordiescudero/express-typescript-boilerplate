import { Context } from '../lib/Context';
import { Maker } from '../lib/Maker';

export class ModelMaker implements Maker {

    public name = 'Model';
    public suffix = '';
    public target = 'src/api/models';

    public make(context: Context): string {
        return `import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ${context.name.capitalize} {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

}
`;
    }

}
