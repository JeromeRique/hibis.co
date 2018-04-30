import { Injectable } from "@angular/core";

@Injectable()
export class CurrentUser {
    public type: string;

    constructor() {
        this.type = "";
    }
}