import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course!: Course;

  displayedColumns = ['seqNo', 'description', 'duration'];

  dataSource: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  loadMore(): void {

  }

}
