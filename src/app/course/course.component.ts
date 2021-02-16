import { Observable } from 'rxjs';
import { Lesson } from './../model/lesson';
import { CoursesService } from './../services/courses.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { finalize, tap } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({

  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course!: Course;

  lessons$: Observable<Lesson[]>;

  loading = true;

  displayedColumns = ['seqNo', 'description', 'duration'];

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  page: EventEmitter<PageEvent>;
  constructor(private route: ActivatedRoute, private service: CoursesService) { }

  ngOnInit(): void {

    // tslint:disable-next-line: no-string-literal
    this.course = this.route.snapshot.data['course'];
    this.loading = true;
    this.lessons$ = this.service.findLessons(this.course.id).pipe(
      finalize(() => this.loading = false)
    );
    // this.service.findLessons(this.course.id).subscribe(lessons => this.lessons = lessons);
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this.loadMore(this.paginator.pageIndex);
  }

  loadMore(pageIndex: number): void {
    console.log(this.paginator.pageSize, this.paginator.pageIndex);
    this.lessons$ = this.service.findLessons(this.course.id, 'asc', pageIndex, this.paginator.pageSize).pipe(
      finalize(() => this.loading = false)
    );
  }

  onPageFired(event: any): void {
    this.loading = true;
    this.loadMore(event.pageIndex);
  }
}
