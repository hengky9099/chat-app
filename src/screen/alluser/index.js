import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {SearchBar} from '@rneui/base';
import {useDispatch, useSelector} from 'react-redux';
import {myDB} from '../../helpers/db';
import {moderateScale} from 'react-native-size-matters';
import {setChoosenUser} from '../dashboard/redux/action';
import {generateID} from '../../helpers/generateID';

const Index = ({navigation}) => {
  const [data, setData] = useState([]);
  const {_user = {email: '', name: ''}} = useSelector(state => state.global);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

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
      const res = await myDB.ref(`contactRoom/${_user._id}`).once('value');
      setData(res.val().contact);
      console.log(res.val());
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

  const RenderItem = ({item = {name: '', bio: '', photoURL: ''}}) => {
    const {name, bio, photoURL} = item;
    return <CardComponent name={name} bio={bio} photo={photoURL} {...item} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Name"
        onChangeText={event => setSearch(event.target.search)}
        value={search}
        containerStyle={styles.search}
        inputContainerStyle={{backgroundColor: 'white'}}
      />
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  search: {
    backgroundColor: 'orange',
    borderBottomColor: 'orange',
    borderTopColor: 'orange',
  },
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
    marginBottom: moderateScale(-20),
    top: moderateScale(20),
    // height: moderateScale(80),
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
});
