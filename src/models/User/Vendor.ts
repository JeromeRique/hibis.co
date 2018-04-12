import { User } from "./User";

export class Vendor extends User {
    v_name: string;
    o_name: string;
    phone: string;
    constructor(
        email: string, 
        password: string,
        v_name: string,
        o_name: string,
        phone: string ) {
        super(email, password);
        this.v_name = v_name;
        this.o_name = o_name;
        this.phone = phone;
    }
}