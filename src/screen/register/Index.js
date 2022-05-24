import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetRegisterBio,
  SetRegisterEmail,
  SetRegisterName,
  SetRegisterPassword,
} from './redux/action';
import auth, {firebase} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {myDB} from '../../helpers/db';
import {setDataUser} from '../login/redux/action';

const Index = ({navigation}) => {
  // state
  const {email, password, bio, name} = useSelector(state => state.register);
  const dispatch = useDispatch();

  // create new user
  const createUser = async () => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      const token = await messaging().getToken();
      if (token) {
        const payload = {
          name: name,
          email: email,
          bio: bio,
          photoURL: 'https://randomuser.me/api/portraits/men/36.jpg',
          roomChat: [],
          _id: res.user.uid,
          notifToken: token,
        };
        await myDB.ref(`users/${res.user.uid}`).set(payload);
        dispatch(setDataUser(payload));
        firebase.auth().signOut();
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      Alert.alert(error);
    } finally {
    }
  };

  // view
  return (
    <View>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.value}
        onChangeText={value => dispatch(SetRegisterName(value))}
        placeholder="Full Name"
      />
      <TextInput
        style={styles.value}
        onChangeText={value => dispatch(SetRegisterEmail(value))}
        textContentType="emailAddress"
        placeholder="Email"
      />
      <TextInput
        style={styles.value}
        onChangeText={value => dispatch(SetRegisterPassword(value))}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        editable
        maxLength={100}
        multiline
        numberOfLines={4}
        style={styles.bio}
        placeholder="Bio"
        onChangeText={value => dispatch(SetRegisterBio(value))}
      />
      <TouchableOpacity style={styles.registerButton} onPress={createUser}>
        <Icon
          style={styles.registerButtonIcon}
          name="login"
          size={24}
          color={'white'}
        />
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Already have an account?</Text>
      {/* register */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textLogin}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  value: {
    width: moderateScale(280),
    top: moderateScale(150),
    left: moderateScale(35),
    marginBottom: moderateScale(20),
    borderStyle: 'solid',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: 'gray',
  },
  bio: {
    padding: moderateScale(10),
    width: moderateScale(280),
    top: moderateScale(150),
    left: moderateScale(35),
    borderBottomWidth: moderateScale(1),
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  registerButton: {
    width: moderateScale(280),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: '#4D96FF',
    left: moderateScale(35),
    top: moderateScale(170),
  },
  registerButtonText: {
    color: 'white',
    left: moderateScale(120),
    top: moderateScale(-12),
  },
  registerButtonIcon: {
    top: moderateScale(10),
    left: moderateScale(15),
  },
  text: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(70),
    marginTop: moderateScale(180),
  },
  textLogin: {
    // fontWeight: 'bold',
    color: 'blue',
    fontSize: moderateScale(14),
    left: moderateScale(235),
    top: moderateScale(-19),
  },
  title: {
    fontSize: moderateScale(30),
    color: 'black',
    left: moderateScale(110),
    top: moderateScale(60),
  },
});
