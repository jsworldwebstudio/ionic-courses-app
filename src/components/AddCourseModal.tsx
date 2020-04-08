import React, { useRef, useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonText
} from '@ionic/react';

const AddCourseModal: React.FC<{
  showModal: boolean;
  CancelModal: () => void;
  onSave: (title: string, date: Date) => void;
}> = (props) => {
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonDatetimeElement>(null);

  const saveHandler = () => {
    const enteredTitle = titleRef.current!.value;
    const selectedDate = dateRef.current!.value;

    if (
      !enteredTitle ||
      !selectedDate ||
      enteredTitle?.toString().trim().length === 0 ||
      selectedDate.trim().length === 0
    ) {
      setError('Please enter a valid title and select a valid date.');
      return;
    }
    setError('');
    props.onSave(enteredTitle.toString(), new Date(selectedDate));
  };

  return (
    <IonModal isOpen={props.showModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Add Course</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Course</IonLabel>
                <IonInput type="text" ref={titleRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Enrollment Date</IonLabel>
                <IonDatetime displayFormat="MM DD YYYY" min="1989-06-04" ref={dateRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          {error &&
            <IonRow className="ion-text-center">
              <IonCol>
                <IonText color="danger">
                  <p>{ error }</p>
                </IonText>
              </IonCol>
            </IonRow>
          }
          <IonRow className="ion-text-center">
            <IonCol>
              <IonButton color="dark" fill="clear" onClick={props.CancelModal}>Cancel</IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="secondary" expand="block" onClick={saveHandler}>Save</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default AddCourseModal;