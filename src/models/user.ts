export class User {
    email: string;
    private password: string;

    constructor(private email:string, private password:string) {
        this.email = email;
        this.password = password;
    }
}