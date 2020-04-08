import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/react';

const CourseItem: React.FC<{
  courseTitle: string;
  courseId: string;
  courseEnrolledDate: string;
}> = (props) => {

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {props.courseTitle}
        </IonCardTitle>
        <IonCardSubtitle>
          Enrolled on {props.courseEnrolledDate}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="ion-text-right">
          <IonButton
            fill="clear"
            color="secondary"
            routerLink={`/courses/${props.courseId}`}
          >
            View Course Goals
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default CourseItem;