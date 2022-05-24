import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {myDB} from '../../helpers/db';
import axios from 'axios';
import {fcmUrl, servertoken} from '../../helpers/api';

const Index = () => {
  const {_user, selectedUser} = useSelector(state => state.global);
  const [user, setUser] = useState({});

  const createInitialData = useCallback(() => {
    try {
      myDB.ref(`users/${selectedUser._id}`).on('value', res => {
        const userData = res.val();
        if (userData.chatRoom) {
          setUser(userData);
        } else {
          setUser(prevState => {
            return {...prevState, ...userData, chatRoom: []};
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser._id]);

  useEffect(() => {
    createInitialData();
  }, [createInitialData]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      let isUpdating = true;
      await myDB.ref(`users/${_user._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom?.length + 1,
          },
        ],
      });

      await myDB.ref(`users/${selectedUser._id}`).update({
        chatRoom: [
          ...user.chatRoom,
          {
            ...sendedMessage[0],
            idx: user.chatRoom.length + 1,
          },
        ],
      });

      isUpdating = false;
      if (!isUpdating) {
        const body = {
          to: selectedUser.notifToken,
          notification: {
            body: sendedMessage[0].text,
            title: `New Message from ${_user.name}`,
          },
          data: {
            body: sendedMessage[0].text,
            title: `New Messages from ${_user.name}`,
          },
        };
        await axios.post(fcmUrl, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'key=' + servertoken,
          },
        });
      }
    },
    [
      user.chatRoom,
      _user._id,
      selectedUser._id,
      _user.name,
      selectedUser.notifToken,
    ],
  );

  return (
    <GiftedChat
      messages={user?.chatRoom?.sort(function (a, b) {
        return new Date(b.idx) - new Date(a.idx);
      })}
      messagesContainerStyle={{backgroundColor: '#39918C'}}
      renderBubble={props => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
              },
              right: {
                backgroundColor: 'orange',
              },
            }}
          />
        );
      }}
      onSend={sendedMessage => {
        onSend(sendedMessage);
      }}
      user={{
        _id: _user._id,
        name: _user.name,
        bio: _user.bio,
        avatar:
          _user.photoURL ?? 'https://randomuser.me/api/portraits/men/36.jpg',
      }}
    />
  );
};

export default Index;
