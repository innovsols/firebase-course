import { CoursesService } from './../services/courses.service';

import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({

  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;

  beginnersCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(private service: CoursesService) {

   }

  ngOnInit(): void {
    this.reloadCourses();

  }

  reloadCourses(): void {
    this.courses$ = this.service.loadAllCourses();

    this.beginnersCourses$ = this.courses$.pipe(
       map(courses => courses.filter(course => course.categories.includes('BEGINNER')))
     );

    this.advancedCourses$ = this.courses$.pipe(
       map(courses => courses.filter(course => course.categories.includes('ADVANCED')))
     );
  }

}
