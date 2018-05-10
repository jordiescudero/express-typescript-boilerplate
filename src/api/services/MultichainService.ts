import { Service } from 'typedi';

@Service()
export class MultichainService {

    private multichainInstance: any;

    constructor(
    ) {
        console.log('create');
    }

     public setInstance(multichainInstance: any): any {  this.multichainInstance = multichainInstance; }

     public sayHello(): void { console.log('hello'); }

     public sayHello2(): void { console.log(this.multichainInstance); }

}
