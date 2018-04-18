import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
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
        public storage: Storage
    ) {

    }

    logout() {
        if (this.afAuth.auth!.currentUser != null) {
           try {
               this.afAuth.auth.signOut();
           } catch (e) {
                console.log("Error logging out: " + e);
           }
        }
    }

    /**
     * This function takes in as a User as an object,
     * which has an email and password field and authenticates 
     * with the firebase database.
     * @param user 
     */
    async login(user: User) {
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            let uid = this.afAuth.auth.currentUser.uid;
        }
        catch (e) {
            console.error(e);
        }
        return;
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