import { Injectable, Component } from "@angular/core";




@Injectable()

export class imgArr{
    public images: Array<string> = [];
    constructor(){
        this.images = Array<string>();
    }
}