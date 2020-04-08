import React, { useContext } from 'react';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/react';

// import { COURSE_DATA } from './Courses';
import CoursesContext from '../data/courses-context';

const AllGoals: React.FC = () => {
  const coursesCtx = useContext(CoursesContext);

  const goals = coursesCtx.courses
    .filter(course => {
      return course.included;
    })
    .map(course => {
    return course.goals.map(goal => {
      return { ...goal, courseTitle: course.title };
    });
  }).reduce((goalArr, nestedGoals) => {
    let updatedGoalArray = goalArr;
    for (const goal of nestedGoals) {
      updatedGoalArray = updatedGoalArray.concat(goal);
    }
    return updatedGoalArray;
  }, []);
  // console.log(goals);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>All Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { goals.length === 0 && (
          <IonText className="ion-text-center" color="danger"><p>No Goals Found!!!</p></IonText>
        )}
        { goals.length > 0 &&
          <IonList>
            {goals.map(goal => (
              <IonItem key={goal.id}>
                <IonLabel>
                  <h2>{goal.text}</h2>
                  <p>{goal.courseTitle}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default AllGoals;