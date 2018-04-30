import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FirebaseUserAuth } from '../../models/FirebaseUserAuth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import 'firebase/storage'
//import { imgArr } from '../imgArr';

export class Upload{
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();
  
    constructor(file: File){
      this.file = file;
    }
  }
  
  @Injectable()
  export class UploadFileService{
  
    constructor(
        //private myImageArray: imgArr
        private afdb: AngularFireDatabase){
    }
  
    private basepath:string = '/uploads';
    uploads: FirebaseListObservable<Upload[]>;
  
    pushUpload(upload: Upload): Promise<string>{
        let storageRef = firebase.storage().ref();
        let uploadTask = storageRef.child(`${this.basepath}/${upload.file.name}`).put(upload.file);

        return new Promise((resolve, reject) => {
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,  (snapshot)=>{
                upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
            },
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                upload.url = uploadTask.snapshot.downloadURL
                console.log(upload.url);
                upload.name = upload.file.name
                //this.saveFileData(upload)
                //this.myImageArray.images.push(upload.url);
                resolve(upload.url);
            });
        })

        
        
        
    }
    private saveFileData(upload: Upload){
      this.afdb.list(`${this.basepath}/`).push(upload);
  
    }
  }