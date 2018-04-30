import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { CurrentUser } from '../models/CurrentUser';
import { User } from './User/User';
import { Vendor } from './User/Vendor'
import { Customer } from './User/Customer'
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { ToastController } from "ionic-angular";
import { Observable } from "@firebase/util";

@Injectable()
export class FirebaseUserAuth {
    private u: User;
    private c: Customer;
    private v: Vendor;

    constructor(
        private afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
        private toast: ToastController,
        public currUser: CurrentUser
    ) {

    }

    logout() {
        this.currUser.type = "";
        return this.afAuth.auth.signOut();
    }

    /**
     * This function takes in as a User as an object,
     * which has an email and password field and authenticates 
     * with the firebase database.
     * @param user 
     */
    async login(user: User) {
        // Determine User Type
        
        
        return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    public checkAuth(){
        return this.afAuth.authState.map((data)=>{
            return data;
        })
    }

    public currentUser(){
        try {
            let uid = this.afAuth.auth.currentUser.uid;
            let ref = this.afdb.database.ref('users/' + uid);
            ref.on('value', snap => {
                this.currUser.type = snap.val().type;
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * This function takes in a User as an object, 
     * which has an email and password field, regardless 
     * of if it is a Customer or Vendor.
     * 
     * The function creates a User with the supplied information,
     * then, depending on the subclass of User, will enter them 
     * into their appropriate table.
     * @param user 
     */
    async register(user: User) {
        let result;
        let uid;
        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
            uid = this.afAuth.auth.currentUser.uid;
        } catch (e) {
            return result;
        }

        // Now that we've authenticated them, we can add their data
        // to the database
        
        if (user instanceof Customer) {
            let ref = this.afdb.database.ref('users/' + uid).set({
                name: user.name,
                email: user.email,
                type: 'Customer'
            });
        } else if (user instanceof Vendor) {
            let ref = this.afdb.database.ref('users/' + uid).set({
                name: user.v_name,
                email: user.email,
                owner: user.o_name,
                phone: user.phone,
                type: 'Vendor'
            });
        }
        return result;
    }

    updateUserSettings(user) {
        // let acc = this.afAuth.auth.currentUser;
        // let ref = this.afdb.database.ref('users/' + acc.uid);
        // if (user.name != "") {
        //     try {
        //         ref.child('name').set(user.name);
        //     } catch (e) {
        //         return e;
        //     }
        // }
        // if (user.email != "") {
        //     try {
        //         ref.child('email').set(user.email);
        //         acc.updateEmail(user.email).then().catch(function (e) {return e});
        //     } catch (e) {
        //         return e;
        //     }
        // }
        // if (user.password != "") {
        //     try {
        //         acc.updatePassword(user.password).then().catch(function(e) {return e});
        //     } catch (e) {
        //         return e;
        //     }
        // }
    }

    deleteAccount () {
        try {
            let acc = this.afAuth.auth.currentUser;
            acc.delete().then(function () {

            }).catch(function (e) {
                return e;
            })
        } catch (e) {
            return e;
        }
    }
}