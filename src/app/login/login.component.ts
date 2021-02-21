import { ReactiveFormsModule } from '@angular/forms';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';

@Component({

  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(private ngfAuth: AngularFireAuth,
              private router: Router,
              private ngZone: NgZone) { }


  ngOnInit(): void {

    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this)
      }
    };


    this.ui = new firebaseui.auth.AuthUI(firebase.auth());


    this.ui.start('#ui-auth-container', uiConfig);
    console.log('ngfAuth', JSON.stringify(this.ngfAuth));



  }

  onLoginSuccess(result: any): boolean {
    console.log('Firebase UI result', result);

    this.ngZone.run(() => this.router.navigateByUrl('/courses'));
    return false;

  }

  ngOnDestroy(): void {
    this.ui.delete();
  }
}
