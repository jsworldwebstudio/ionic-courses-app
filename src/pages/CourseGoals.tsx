import React, { useState, useRef, useContext } from 'react';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  isPlatform,
  IonAlert,
  IonToast,
  IonText
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { addOutline } from 'ionicons/icons';

import CoursesContext from '../data/courses-context';
import EditModal from '../components/EditModal';
import EditableGoalItem from '../components/EditableGoalItem';

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const coursesCtx = useContext(CoursesContext);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const selectedGoalIdRef = useRef<string | null>(null);

  const selectedCourseId = useParams<{ courseId: string }>().courseId;

  const selectedCourse = coursesCtx.courses.find(c => c.id === selectedCourseId);
  // const selectedCourse = COURSE_DATA.find(c => c.id === selectedCourseId);
  

  const startDeleteGoalHandler = (goalId: string, event: React.MouseEvent) => {
    setToastMessage('');
    setStartedDeleting(true);
    selectedGoalIdRef.current = goalId;
  };

  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    coursesCtx.deleteGoal(selectedCourseId, selectedGoalIdRef.current!);
    setToastMessage('The Goal was successfully deleted!');
  };

  const startEditGoalHandler = (goalId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const goal = selectedCourse?.goals.find(g => g.id === goalId);
    slidingOptionsRef.current?.closeOpened();
    if (!goal) {
      return;
    };
    setIsEditing(true);
    setSelectedGoal(goal.text);
    setSelectedGoalId(goal.id);
  };

  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal('');
    setSelectedGoalId('');
  };

  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal('');
    setSelectedGoalId('');
  };

  const saveGoalHandler = (text: string) => {
    if (selectedGoal) {
      coursesCtx.updateGoal(selectedCourseId, selectedGoalId, text);

    } else {
      coursesCtx.addGoal(selectedCourseId, text);
    }
    setIsEditing(false);
    // setSelectedGoal('');
    // setSelectedGoalId('');
  };

  let content = <IonText className="ion-text-center" color="danger"><p>No Goals Found!!!</p></IonText>;
  if (!selectedCourse) {
    content = <IonText className="ion-text-center" color="danger"><p>No Courses Found!!!</p></IonText>;
  };
  if (selectedCourse && selectedCourse.goals.length) {
    content = (
      <IonList>
        {selectedCourse?.goals.map(goal => (
          <EditableGoalItem
            key={goal.id}
            slidingRef={slidingOptionsRef}
            goalText={goal.text}
            onStartDelete={startDeleteGoalHandler.bind(null, goal.id)}
            onStartEdit={startEditGoalHandler.bind(null, goal.id)}
          />
        ))}
      </IonList>
    );
  };

  return (
    <>
      <EditModal
        showModal={isEditing}
        CancelModal={cancelEditGoalHandler}
        editedGoal={selectedGoal}
        onSave={saveGoalHandler}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        // onDidDismiss={() => { --- Causes a Warning when you change screens while the toast message is displayed
        //   setToastMessage('');
        // }}
      />
      <IonAlert
        isOpen={startedDeleting}
        header="Are you sure?"
        message="Do you want to delete the goal? This cannot be undone."
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setStartedDeleting(false);
            }
          },
          {
            text: 'Yes',
            handler: deleteGoalHandler
          }
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/courses/list" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : 'No course found!'}
            </IonTitle>
            { !isPlatform('android') &&
              <IonButtons slot="end">
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonButtons>
            }
          </IonToolbar>
        </IonHeader>
        <IonContent>
          { content }
          { isPlatform('android') &&
            <IonFab horizontal="end" vertical="bottom">
              <IonFabButton color="secondary" onClick={startAddGoalHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          }
        </IonContent>
      </IonPage>
    </>
  );
};

export default CourseGoals;