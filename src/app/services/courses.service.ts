import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }

  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses').snapshotChanges().pipe(
      map( snaps => {
        return snaps.map(snap => {
          return {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as {}
          } as Course;
        });
      }),
      first()
    );
    // by default AngularFire observable is realtime stream any changes to DB are immediately reflected
    // in realtime to UI. In order for observable to complete after single fetch first may be used Or
    // in order for it to complete after n values emission take operator may be used.
  }

}
