import React, { useState, useContext } from 'react';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  isPlatform,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
// import { useHistory } from 'react-router-dom';
// import { uuid } from 'uuidv4';

import AddCourseModal from '../components/AddCourseModal';
import CourseItem from '../components/CourseItem';
import CoursesContext from '../data/courses-context';

export const COURSE_DATA = [
  {
    id: 'c1',
    title: 'Ionic + React - The Practical Guide',
    enrolled: new Date('04/01/2020'),
    goals: [
      { id: 'c1g1', text: 'Finish the course!' },
      { id: 'c1g2', text: 'Learn Ionic!' },
      { id: 'c1g3', text: 'Learn Ionic + React!' },
      { id: 'c1g4', text: 'Learn to write a mobile application!' },
    ]
  },
  {
    id: 'c2',
    title: 'React.js - The Complete Guide',
    enrolled: new Date('03/01/2020'),
    goals: [
      { id: 'c2g1', text: 'Finish the course!' },
      { id: 'c2g2', text: 'Learn React!' }
    ]
  },
  {
    id: 'c3',
    title: 'JavaScript - The Complete Guide',
    enrolled: new Date('02/01/2020'),
    goals: [
      { id: 'c3g1', text: 'Finish the course!' },
      { id: 'c3g2', text: 'Learn JavaScript tricks!' },
      { id: 'c3g3', text: 'Learn JavaScript ES6!' }
    ]
  }
];

const Courses: React.FC = () => {
  // console.log('uuid = ', uuid().toString());
  const [isEditing, setIsEditing] = useState(false);

  const coursesCtx = useContext(CoursesContext);
  // const history = useHistory();

  // const changepageHandler = () => {
  //   history.push('/course-goals');
  // };

  const startAddCourseHandler = () => {
    setIsEditing(true);
  };

  const cancelCourseHandler = () => {
    setIsEditing(false);
  };

  const courseAddHandler = (title: string, date: Date) => {
    coursesCtx.addCourse(title, date);
    setIsEditing(false);
  };

  return (
    <>
    <AddCourseModal
      showModal={isEditing}
      CancelModal={cancelCourseHandler}
      onSave={courseAddHandler}
    />
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Courses</IonTitle>
            { !isPlatform('android') &&
              <IonButtons slot="end">
                <IonButton onClick={startAddCourseHandler}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonButtons>
            }
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {/* COURSE_DATA.map(course => (*/}
          { coursesCtx.courses.map(course => (
            <IonRow key={course.id}>
              <IonCol size-md="4" offset-md="4">
                <CourseItem
                  courseId={course.id}
                  courseTitle={course.title}
                  courseEnrolledDate={course.enrolled.toLocaleDateString('en-US',
                    {year: 'numeric', month: '2-digit', day: '2-digit'})}
                />
              </IonCol>
            </IonRow>
          )) }
        </IonGrid>
        { isPlatform('android') &&
          <IonFab horizontal="end" vertical="bottom">
            <IonFabButton color="secondary" onClick={startAddCourseHandler}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        }
      </IonContent>
    </IonPage>
    </>
  );
};

export default Courses;