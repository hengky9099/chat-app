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
import {SetLoginEmail, SetLoginPassword} from './redux/action';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Index = ({navigation}) => {
  // state
  const {email, password} = useSelector(state => state.login);
  const dispatch = useDispatch();

  // Login with email and password
  const emailAuth = () =>
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('The password is invalid!');
        }
        console.error(error);
      });

  // Login with Gmail

  GoogleSignin.configure({
    webClientId:
      '525403407240-4ktcqa3qg7b0od35dqm8n75r6lldreoi.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
      <TouchableOpacity style={styles.loginButton}>
        <Icon
          style={styles.loginButtonIcon}
          name="login"
          size={24}
          color={'white'}
          onPress={emailAuth}
        />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <Icons
          style={styles.googleButtonIcon}
          name="google"
          size={24}
          color={'white'}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
        <Text style={styles.googleButtonText}>Login with Google</Text>
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
    marginTop: moderateScale(200),
  },
  textregister: {
    // fontWeight: 'bold',
    color: 'blue',
    fontSize: moderateScale(14),
    left: moderateScale(220),
    top: moderateScale(-19),
  },
});
