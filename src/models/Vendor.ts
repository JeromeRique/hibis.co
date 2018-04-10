import { User } from "./User";

export class Vendor extends User {
    constructor(email: string, password: string) {
        super(email, password)
        
    }
}