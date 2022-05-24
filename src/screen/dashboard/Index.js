import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {myDB} from '../../helpers/db';
import {setChoosenUser} from './redux/action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {FAB} from '@rneui/base';

const Index = ({navigation}) => {
  const [data, setData] = useState([]);
  const {_user = {email: ''}} = useSelector(state => state.global);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const saveSelectedPerson = payload => {
    dispatch(setChoosenUser(payload));
    navigation.navigate('Chat');
  };

  const getAllData = useCallback(async () => {
    try {
      const res = await myDB.ref('/users').once('value');
      const userList = Object.values(res.val()).filter(
        val => val.email !== _user.email,
      );
      setData(userList);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [_user.email]);

  const CardComponent = props => {
    const {name, bio, photo} = props;
    return (
      <TouchableOpacity
        style={styles.flatlistContainer}
        onPress={() => saveSelectedPerson(props)}>
        <Image
          style={styles.image}
          source={{
            uri: photo ?? 'https://randomuser.me/api/portraits/men/36.jpg',
          }}
        />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </TouchableOpacity>
    );
  };

  const allUser = async () => {
    navigation.navigate('AllUser');
  };

  const RenderItem = ({item = {name: '', bio: '', photoURL: ''}}) => {
    const {name, bio, photoURL} = item;
    return <CardComponent name={name} bio={bio} photo={photoURL} {...item} />;
  };

  const Logout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusapp}>
        <Text style={styles.statusapptext}>Connect!</Text>
        <Icon
          name="logout"
          color="white"
          size={26}
          style={styles.logout}
          onPress={Logout}
        />
        <Icon
          name="person"
          color="white"
          size={26}
          style={styles.setting}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <Icon
          name="add"
          color="white"
          size={26}
          style={styles.add}
          onPress={allUser}
        />
      </View>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  title: {
    marginLeft: moderateScale(90),
    top: moderateScale(-55),
    color: 'black',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  flatlistContainer: {
    backgroundColor: 'white',
    marginLeft: moderateScale(20),
    // marginBottom: moderateScale(-20),
    // top: moderateScale(70),
    height: moderateScale(80),
  },
  bio: {
    marginLeft: moderateScale(90),
    top: moderateScale(-45),
    color: 'gray',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  statusapp: {
    width: moderateScale(360),
    backgroundColor: 'orange',
    height: moderateScale(60),
    marginBottom: moderateScale(20),
  },
  statusapptext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    left: moderateScale(20),
    top: moderateScale(16),
  },
  logout: {
    marginLeft: moderateScale(310),
    top: moderateScale(-10),
    width: moderateScale(30),
  },
  setting: {
    marginLeft: moderateScale(265),
    top: moderateScale(-36),
    width: moderateScale(30),
  },
  add: {
    top: moderateScale(-62),
    left: moderateScale(222),
    width: moderateScale(30),
  },
  // fab: {
  //   flex: 1,
  //   position: 'absolute',
  //   top: moderateScale(-460),
  //   height: moderateScale(80),
  //   left: moderateScale(270),
  // },
});

export default Index;
