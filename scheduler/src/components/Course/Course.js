import React from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { timeParts, hasConflict, getCourseNumber, getCourseTerm } from './times';

const firebaseConfig = {
  apiKey: "AIzaSyD6ueOF5l8EsHllmL9BQGhOuUlFCYo9x_k",
  authDomain: "quick-react-1b5db.firebaseapp.com",
  databaseURL: "https://quick-react-1b5db.firebaseio.com",
  projectId: "quick-react-1b5db",
  storageBucket: "",
  messagingSenderId: "1008079974445",
  appId: "1:1008079974445:web:708c8999a9d184837448a4",
  measurementId: "G-BMCEEZWQES"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref();

const buttonColor = selected => (
  selected ? 'success' : null
);

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets); 
  else moveCourse(course);
};

const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
};

const Course = ({ course, state, user }) => (
  <Button color={ buttonColor(state.selected.includes(course)) }
    onClick={ () => state.toggle(course) }
    onDoubleClick={ user ? () => moveCourse(course) : null }
    disabled={ hasConflict(course, state.selected) }
    >
    { getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }
  </Button>
);

export { Course, buttonColor , db };