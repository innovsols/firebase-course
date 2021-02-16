import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { of } from 'rxjs';
import { Course } from '../model/course';

@Component({

  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {


  }

  save(): void {
    const firebaseCourseRef =
      this.db.doc('/courses/sHwpPTsAlpBEOpTz8hHS').ref;

    const rxjsCourseRef =
      this.db.doc('/courses/DpI50HhmagU0IokQRGVu').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseCourseRef, { titles: { description: 'Firebase Course',
      longDescription: 'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire' } });

    batch.update(rxjsCourseRef, { titles: { description: 'RxJs Course' ,
      longDescription: 'Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples'} });

    const batch$ = of(batch.commit());

    batch$.subscribe();
  }
}
