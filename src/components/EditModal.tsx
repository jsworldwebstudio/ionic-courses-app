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
  IonText
} from '@ionic/react';

const EditModal: React.FC<{
  showModal: boolean;
  CancelModal: () => void;
  onSave: (goalText: string) => void;
  editedGoal: string | null;
}> = (props) => {
  const [error, setError] = useState('');
  const textRef = useRef<HTMLIonInputElement>(null);

  const saveHandler = () => {
    const enteredText = textRef.current!.value;

    if (
      !enteredText ||
      enteredText?.toString().trim().length === 0
    ) {
      setError('Please enter a valid goal.');
      return;
    }
    setError('');
    props.onSave(enteredText.toString());
  };

  return (
    <IonModal isOpen={props.showModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.editedGoal ? 'Edit' : 'Add'} Goal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Goal</IonLabel>
                <IonInput
                  type="text"
                  value={props.editedGoal ? props.editedGoal : ''}
                  ref={textRef}
                />
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

export default EditModal;