import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Course } from '../model/course';

const config = {
  apiKey: 'AIzaSyBM9QZTchI2vXuW8dvtiVMbIa6JJWrsU6A',
  authDomain: 'fir-course-510bc.firebaseapp.com',
  projectId: 'fir-course-510bc',
  storageBucket: 'fir-course-510bc.appspot.com',
  messagingSenderId: '207791867774',
  appId: '1:207791867774:web:5a73da7e37d222274a152f'
};

firebase.default.initializeApp(config);

const db = firebase.default.firestore();



@Component({

  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    db.doc('courses/sHwpPTsAlpBEOpTz8hHS').get().then(
      snap => {
        console.log(snap.data());
      }
    );

    db.collection('courses').get()
      .then(snaps => {
        console.log(snaps.docs.map(snap => snap.data()));
        console.log(snaps.docs.map(snap => snap.id));
        const courses: Course[] = snaps.docs.map(snap => {
          return {
            id: snap.id,
            ...snap.data()
          } as Course;
        });
        console.log(courses);
      });
  }

}
