import React from 'react';
import {
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem,
  IonLabel
} from '@ionic/react';
import { create, trash } from 'ionicons/icons';

const EditableGoalItem: React.FC<{
  slidingRef: React.Ref<HTMLIonItemSlidingElement>
  onStartEdit: (event: React.MouseEvent) => void;
  onStartDelete: (event: React.MouseEvent) => void;
  goalText: string;
}> = (props) => {

  return (
    <IonItemSliding ref={props.slidingRef}>
      <IonItemOptions side="start">
        <IonItemOption onClick={props.onStartDelete} color="danger">
          <IonIcon slot="icon-only" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        lines="full"
        // button
        // onClick={deleteItemHandler}
      >
        <IonLabel>{props.goalText}</IonLabel>
        {/* <IonButton fill="clear" color="dark" slot="end" onClick={startEditGoalHandler}>
          <IonIcon slot="icon-only" icon={create} />
        </IonButton> */}
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption onClick={props.onStartEdit}>
          <IonIcon slot="icon-only" icon={create} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default EditableGoalItem;