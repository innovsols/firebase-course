import { CoursesService } from './courses.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { Injectable } from '@angular/core';

@Injectable()
export class CourseResolver implements Resolve<Course> {

  constructor(private service: CoursesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
      const courseUrl = route.paramMap.get('courseUrl');
      return this.service.findCourseByUrl(courseUrl);

  }

}
