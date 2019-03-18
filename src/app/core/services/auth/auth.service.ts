import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '@app/data-model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User | null>;
  authState: firebase.User;
  userData: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        this.authState = user;
        if (user) {
          console.log("User: ", this.user$)
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  get user() {
    return this.user$.pipe(first()).toPromise();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns the user id if authenticated otherwise null.
  get uid(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  // Returns current user display name or Guest
  get displayName(): string {
    return this.authState.displayName || 'this.authState.email';
  }

  // Returns current user photo
  get photoURL(): string {
    return this.authState.photoURL || '';
  }

  // Returns current user email
  get email(): string {
    return this.authState.email || '';
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  createUserWithEmailAndPassword(
    displayName: string,
    email: string,
    password: string,
  ) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user, displayName);
      })
      .then(() => {
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(() => console.log("Wir haben Dir eine Email zur bestätigung der E-Mail Adresse geschickt."))
          .catch(error => console.log(error.message));
      })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
      console.log('Signed Out!');
    })
      .catch(error => this.handleError(error));
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }
  
  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => console.log(`We've sent you a password reset link`))
      .catch(error => console.log(error.message));
  }

  // If error, console log and toast user
  private handleError(error: Error) {
    console.log(error.message);
  }

  private updateUserData(user, displayName) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || displayName,
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
    };

    return userRef.set(data, { merge: true });

  }


}