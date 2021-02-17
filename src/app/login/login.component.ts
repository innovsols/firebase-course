import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({

  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(private ngfAuth: AngularFireAuth,
              private router: Router) { }


  ngOnInit(): void {

    const uiConfig = {
      signInOptions: [
        firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.default.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.default.auth.EmailAuthProvider.PROVIDER_ID
        ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccess.bind(this)
      }
    };

    this.ui = new firebaseui.auth.AuthUI(firebase.default.auth());

    this.ui.start('#ui-auth-container', uiConfig);
  }

  onLoginSuccess(result: any): boolean {
    console.log('Firebase UI result', result);

    this.router.navigateByUrl('/courses');
    return false;
  }

  ngOnDestroy(): void {
    this.ui.delete();
  }
}
