import {firebase} from '@react-native-firebase/database';

export const myDB = firebase
  .app()
  .database(
    'https://chatapp-b18d0-default-rtdb.asia-southeast1.firebasedatabase.app/',
  );
