/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { API_ROOT } from '../../constants';
import consumer from '../../../channels/consumer';

export default function ChatroomList() {
  const [allChatrooms, setAllChatrooms] = useState([]);

  useEffect(() => {
    const getAllChatrooms = async () => {
      try {
        const response = await fetch(`${API_ROOT}/chatrooms`);
        const chatroomsData = await response.json();
        if (!chatroomsData) {
          console.log('no chatrooms were received');
        } else {
          setAllChatrooms(chatroomsData);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getAllChatrooms();

    const channel = consumer.subscriptions.create('ChatroomChannel', {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log('connected to chatroom channel');
      },

      disconnected() {
        console.log('disconnected from chatroom channel');
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel

        const { newChatroom } = data;
        setAllChatrooms(prevState => [...prevState, newChatroom]);
      },
    });

    return function cleanup() {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>All Chatrooms</h2>
      <Typography gutterBottom style={{ textDecoration: 'bold' }}>
        Click on a chatroom to connect...
      </Typography>
      {allChatrooms.map(chatroom => (
        <RouterLink
          to={`/chatroom/${chatroom.id}`}
          key={`${chatroom.name}-${Math.random().toFixed(5)}`}
        >
          <Typography>{chatroom.name}</Typography>
        </RouterLink>
      ))}
    </div>
  );
}
