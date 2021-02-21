import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'firebase-course';

  loggedin$: Observable<boolean>;

  loggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string>;

  constructor(private afAuth: AngularFireAuth) {

  }
  ngOnInit(): void {
    this.afAuth.authState.subscribe(console.log);

    this.loggedin$ = this.afAuth.authState.pipe(map(user => !!user));

    this.loggedOut$ = this.loggedin$.pipe(map(loggedin => !loggedin));

    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => user?.photoURL));

  }

  logout(): void {
  this.afAuth.signOut();
  }
}
