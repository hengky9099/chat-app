import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {myDB} from '../../helpers/db';
import {launchImageLibrary} from 'react-native-image-picker';

const Index = ({navigation}) => {
  const {_user = {email: '', photoURL: ''}} = useSelector(
    state => state.global,
  );
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const editButton = async () => {
    if (name.length > 0) {
      await myDB.ref('/users/' + _user._id).update({
        name: name,
      });
    }
    if (bio.length > 0) {
      await myDB.ref('/users/' + _user._id).update({
        bio: bio,
      });
    }
    if (image.length > 0) {
      await myDB.ref('/users/' + _user._id).update({
        photoURL: image,
      });
    }

    navigation.navigate('Dashboard');
  };

  const launchImageLibrarys = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(image =>
      setImage(image.assets[0].uri),
    );
  };

  return (
    <View>
      <View style={styles.statusapp}>
        <Icon
          name="chevron-left"
          color="white"
          size={32}
          style={styles.back}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
        />
      </View>
      <TouchableOpacity onPress={launchImageLibrarys}>
        <Image
          style={styles.image}
          source={{
            uri:
              _user.photoURL ??
              'https://randomuser.me/api/portraits/men/36.jpg',
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.value}
        onChangeText={value => setName(value)}
        placeholder="Full Name"
      />
      <TextInput
        editable
        maxLength={100}
        multiline
        numberOfLines={4}
        style={styles.bio}
        placeholder="Bio"
        onChangeText={value => setBio(value)}
      />
      <TouchableOpacity style={styles.Button} onPress={editButton}>
        <Text style={styles.ButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  statusapp: {
    width: moderateScale(360),
    backgroundColor: 'orange',
    height: moderateScale(60),
    marginBottom: moderateScale(20),
  },
  back: {
    top: moderateScale(12),
    marginLeft: moderateScale(10),
    width: moderateScale(30),
  },
  image: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(90),
    marginLeft: moderateScale(90),
    marginTop: moderateScale(20),
  },
  value: {
    width: moderateScale(280),
    top: moderateScale(30),
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
    top: moderateScale(20),
    left: moderateScale(35),
    borderBottomWidth: moderateScale(1),
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  Button: {
    width: moderateScale(280),
    height: moderateScale(40),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: '#4D96FF',
    left: moderateScale(35),
    top: moderateScale(45),
  },
  ButtonText: {
    color: 'white',
    left: moderateScale(120),
  },
});
