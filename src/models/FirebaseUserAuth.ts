import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { User } from './User/User';
import { Vendor } from './User/Vendor'
import { Customer } from './User/Customer'
import { Injectable } from "@angular/core";

@Injectable()
export class FirebaseUserAuth {
    private u: User;
    private c: Customer;
    private v: Vendor;

    constructor(
        private afAuth: AngularFireAuth, 
        private afdb: AngularFireDatabase
    ) {

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
                let uid = this.afAuth.auth.currentUser.uid;
                const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
                
                // Now that we've authenticated them, we can add their data
                // to the database, a different database tree based on their 
                // type.
                
                let ref;
                if (user instanceof Customer) {
                    ref = this.afdb.database.ref('customers/'+ uid).set({
                        name: user.name,
                        email: user.email
                    });
                } else if (user instanceof Vendor) {
                    ref = this.afdb.database.ref('vendors/'+uid).set({
                        name: user.v_name,
                        email: user.email,
                        owner: user.o_name,
                        phone: user.phone
                    });
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}