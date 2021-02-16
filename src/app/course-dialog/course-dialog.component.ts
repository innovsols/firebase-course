import { CoursesService } from './../services/courses.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../model/course';

@Component({

  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form!: FormGroup;
  description!: string;
  course: Course;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private service: CoursesService) {

    const titles = course.titles;
    this.course = course;
    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    const changes = this.form.value;
    this.service.saveCourse(this.course.id, { titles: changes } as Partial<Course>).subscribe(
      () => this.dialogRef.close(this.form.value)
    );

  }

  close(): void {
    this.dialogRef.close();
  }
}
