import { User } from './User';

export class Customer extends User {
    name: string;
    constructor(
        email: string,
        name: string,
        password: string
    ) {
        super(email, password);
        this.name = name;
    }
}