import React, {useState, useCallback, useEffect, useRef} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {myDB} from '../../helpers/db';
import axios from 'axios';
import {fcmUrl, servertoken} from '../../helpers/api';
import {generateID} from '../../helpers/generateID';

const Index = () => {
  const {_user, selectedUser} = useSelector(state => state.global);
  const [chatRoom, setChatroom] = useState({messages: []});

  const createInitialData = useCallback(() => {
    try {
      myDB
        .ref(`chatRoom/${generateID(_user._id, selectedUser._id)}`)
        .on('value', res => {
          const userData = res.val();
          if (userData && userData.messages) {
            setChatroom(userData);
          } else {
            setChatroom(prevState => {
              return {...prevState, ...userData, messages: []};
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [selectedUser._id, _user._id]);

  useEffect(() => {
    createInitialData();
  }, [createInitialData]);

  const onSend = useCallback(
    async (sendedMessage = []) => {
      console.log('sended message: ', sendedMessage);
      let isUpdating = true;
      await myDB
        .ref(`chatRoom/${generateID(_user._id, selectedUser._id)}`)
        .update({
          messages: [
            ...chatRoom.messages,
            {
              ...sendedMessage[0],
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
      _user._id,
      selectedUser._id,
      _user.name,
      selectedUser.notifToken,
      chatRoom.messages,
    ],
  );

  return (
    <GiftedChat
      messages={chatRoom.messages?.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
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
