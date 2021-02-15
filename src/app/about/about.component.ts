import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Course } from '../model/course';

@Component({

  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('courses').valueChanges()
    .subscribe(console.log);
  }

}
