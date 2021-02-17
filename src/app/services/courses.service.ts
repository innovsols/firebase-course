import { Lesson } from './../model/lesson';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Course } from '../model/course';
import { from, Observable } from 'rxjs';
import { convertSnaps } from './db-util';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFirestore) { }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    console.log('CourseId', courseId, 'changes', changes);
    return from( this.db.doc(`courses/${courseId}`).update(changes));
  }
  loadAllCourses(): Observable<Course[]> {
    return this.db.collection('courses', ref => ref.orderBy('seqNo')).snapshotChanges().pipe(
      map(snaps => {
        return convertSnaps<Course>(snaps);
        // return snaps.map(snap => {
        //   return {
        //     id: snap.payload.doc.id,
        //     ...snap.payload.doc.data() as {}
        //   } as Course;
        // });
      }),
      first()
    );
    // by default AngularFire observable is realtime stream any changes to DB are immediately reflected
    // in realtime to UI. In order for observable to complete after single fetch first may be used Or
    // in order for it to complete after n values emission take operator may be used.
  }

  findCourseByUrl(courseUrl: string): Observable<Course>{
    return this.db.collection('courses', ref => ref.where('url', '==', courseUrl)).snapshotChanges().pipe(
      map(snaps => {
        const courses = convertSnaps<Course>(snaps);
        // snaps.map(snap => {
        //   return {
        //     id: snap.payload.doc.id,
        //     ...snap.payload.doc.data() as {}
        //   } as Course;
        // }); const courses =
        // tslint:disable-next-line: triple-equals
        return courses.length == 1 ? courses[0] : undefined;
      }
      ),
      first()
    );
  }

  findLessons(courseId: string, sortOrder: firebase.default.firestore.OrderByDirection = 'asc', pageNumber = 0, pageSize = 3)
  : Observable<Lesson[]> {

  return this.db.collection(`courses/${courseId}/lessons`, ref => ref.orderBy('seqNo', sortOrder)
  .limit(pageSize).startAfter(pageNumber * pageSize)).snapshotChanges().pipe(
      map(snaps => convertSnaps<Lesson>(snaps)),
      first()
    );
  }

}
