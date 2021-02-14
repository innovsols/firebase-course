import { Course } from './src/app/model/course';
import {COURSES, findLessonsForCourse} from './db-data';

import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBM9QZTchI2vXuW8dvtiVMbIa6JJWrsU6A',
  authDomain: 'fir-course-510bc.firebaseapp.com',
  projectId: 'fir-course-510bc',
  storageBucket: 'fir-course-510bc.appspot.com',
  messagingSenderId: '207791867774',
  appId: '1:207791867774:web:5a73da7e37d222274a152f'
};

console.log('Uploading data to the database with the following config:\n');

console.log(JSON.stringify(config));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');


const app = firebase.default.initializeApp(config);
const db = firebase.default.firestore();

main().then(r => console.log('Done.'));

async function uploadData(): Promise<void> {
  const courses = await db.collection('courses');

  for (const course of Object.values<Course>(COURSES)){
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');

    const courseLessons = findLessonsForCourse(parseInt(course.id, 10));
    console.log(`Uploading course ${course.titles.description}`);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

function removeId(data: any): any {
  const newData: any = {...data};
  delete newData.id;
  return newData;
}

async function main(): Promise<void>{
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  }catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}
