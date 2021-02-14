import { CourseResolver } from './services/course.resolve';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CourseComponent,
    CourseDialogComponent,
    CoursesCardListComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CourseResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
