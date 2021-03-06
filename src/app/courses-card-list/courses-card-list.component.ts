import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({

  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit, AfterViewInit {

  @Input()
  courses!: Course[];

  @Output()
  courseEdited = new EventEmitter();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {

  }

  editCourse(course: Course): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;

    this.dialog.open(CourseDialogComponent, dialogConfig)
      .afterClosed().subscribe(
        val => {
          if (val) {
            this.courseEdited.emit(val);
          }
        }
      );
  }
}
