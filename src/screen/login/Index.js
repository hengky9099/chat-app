import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setDataUser, SetLoginEmail, SetLoginPassword} from './redux/action';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {myDB} from '../../helpers/db';

const Index = ({navigation}) => {
  // state
  const {email, password} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const emailAuth = async () => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      const token = await messaging().getToken();
      if (token) {
        let isUpdate = false;
        await myDB.ref(`users/${res.user.uid}`).update({
          notifToken: token,
        });
        isUpdate = true;

        if (isUpdate) {
          const results = await myDB.ref(`users/${res.user.uid}`).once('value');
          if (results.val()) {
            dispatch(setDataUser(results.val()));
            navigation.navigate('Dashboard');
          }
        }
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert('The password is invalid!');
      }
      Alert.alert(error);
    } finally {
    }
  };

  // View
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <TextInput
        style={styles.value}
        onChangeText={value => dispatch(SetLoginEmail(value))}
        textContentType="emailAddress"
        placeholder="Email"
      />
      <TextInput
        style={styles.value}
        onChangeText={value => dispatch(SetLoginPassword(value))}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={emailAuth}>
        <Icon
          style={styles.loginButtonIcon}
          name="login"
          size={24}
          color={'white'}
        />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Don't have an account?</Text>
      {/* register */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textregister}>Register</Text>
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
  loginButton: {
    width: moderateScale(280),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: '#4D96FF',
    left: moderateScale(35),
    top: moderateScale(170),
  },
  loginButtonText: {
    color: 'white',
    left: moderateScale(120),
    top: moderateScale(-12),
  },
  loginButtonIcon: {
    top: moderateScale(10),
    left: moderateScale(15),
  },
  googleButton: {
    width: moderateScale(280),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: 'red',
    left: moderateScale(35),
    top: moderateScale(185),
  },
  googleButtonText: {
    color: 'white',
    left: moderateScale(90),
    top: moderateScale(-12),
  },
  googleButtonIcon: {
    top: moderateScale(10),
    left: moderateScale(15),
  },
  container: {
    backgroundColor: 'white',
    height: moderateScale(1500),
  },
  logo: {
    height: moderateScale(200),
    width: moderateScale(200),
    left: moderateScale(70),
    top: moderateScale(130),
  },
  text: {
    color: 'black',
    // fontWeight: 'bold',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(70),
    marginTop: moderateScale(180),
  },
  textregister: {
    // fontWeight: 'bold',
    color: 'blue',
    fontSize: moderateScale(14),
    left: moderateScale(220),
    top: moderateScale(-19),
  },
});
