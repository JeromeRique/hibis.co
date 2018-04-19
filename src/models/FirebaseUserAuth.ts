import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { CurrentUser } from '../models/CurrentUser'
import { User } from './User/User';
import { Vendor } from './User/Vendor'
import { Customer } from './User/Customer'
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';

@Injectable()
export class FirebaseUserAuth {
    private u: User;
    private c: Customer;
    private v: Vendor;

    constructor(
        private afAuth: AngularFireAuth,
        private afdb: AngularFireDatabase,
        public currUser: CurrentUser
    ) {

    }

    logout() {
        return this.afAuth.auth.signOut();
    }

    /**
     * This function takes in as a User as an object,
     * which has an email and password field and authenticates 
     * with the firebase database.
     * @param user 
     */
    async login(user: User) {
        this.currUser.type = 'Customer';
        return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
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

        if (false) {

        } else {
            try {
                // Create users with email/pass combo
               
                const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
                let uid = this.afAuth.auth.currentUser.uid;
                // Now that we've authenticated them, we can add their data
                // to the database, a different database tree based on their 
                // type.

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
            } catch (e) {
                console.log(e);
            }
        }
    }
}