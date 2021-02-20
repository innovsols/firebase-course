import { ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { map } from 'rxjs/operators';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';

@Component({

  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(public ngfAuth: AngularFireAuth,
    // tslint:disable-next-line: ban-types
              @Inject(PLATFORM_ID) platformId: Object,
              private router: Router,
              private ngZone: NgZone,
  ) {

    console.log('PLATFORM_ID', isPlatformServer(platformId));
  }


  ngOnInit(): void {

    this.ngfAuth.authState.subscribe(this.firebaseAuthChangeListener);

    // const uiConfig = {
    //   signInOptions: [
    //     firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
    //     firebase.default.auth.FacebookAuthProvider.PROVIDER_ID,
    //     firebase.default.auth.EmailAuthProvider.PROVIDER_ID
    //   ],
    //   callbacks: {
    //     signInSuccessWithAuthResult: this.onLoginSuccess.bind(this)
    //   }
    // };

    // this.ui = new firebaseui.auth.AuthUI(this.ngfAuth);

    // this.ui = new firebaseui.auth.AuthUI(this.ngfAuth.);
    // this.ui = new firebaseui.auth.AuthUI().start();

    // this.ui = new firebaseui.auth.AuthUI(this.ngfAuth.authState.subscribe());

    // this.ui.start('#ui-auth-container', uiConfig);


  }

  // onLoginSuccess(result: any): boolean {

  //   this.ngZone.run(() => this.router.navigateByUrl('/courses'));
  //   return true;
  //     }

  ngOnDestroy(): void {
   // this.ui.delete();
    }

  // login(): void {
  //   this.ngfAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  // }

  successCallback(data: FirebaseUISignInSuccessWithAuthResult): void {
    console.log('successCallback', data);
    // this.router.navigate(['page']);
    this.ngZone.run(() => this.router.navigateByUrl('/courses'));
  }

  errorCallback(data: FirebaseUISignInFailure): void {
    console.warn('errorCallback', data);
  }

  uiShownCallback(): void {
    console.log('UI shown');
  }



private firebaseAuthChangeListener(response: any): void  {
    // if needed, do a redirect in here
    if (response) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }
}
