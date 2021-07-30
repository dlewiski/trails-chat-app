/* eslint-disable react/prop-types */
/* eslint radix: ["error", "as-needed"] */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from '@material-ui/core';
import consumer from '../../../channels/consumer';
import { API_ROOT } from '../../constants';
import useStyles from './styles';
import MessageDisplay from '../message-display/MessageDisplay';

export default function ChatroomShow(props) {
  const { currentUser } = props;
  const [currentChatroom, setCurrentChatroom] = useState({
    room: {},
    users: [],
    messages: [],
  });
  const [messagesToShow, setMessagesToShow] = useState([]);
  const [message, setMessage] = useState('');
  const [inputError, setInputError] = useState(false);
  const { chatroomId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    async function getChatroom() {
      try {
        const response = await fetch(`${API_ROOT}/chatrooms/${chatroomId}`);
        const chatroomData = await response.json();
        const { users = [], messages = [] } = chatroomData;
        setMessagesToShow(messages);
        setCurrentChatroom({ room: chatroomData, users, messages });
      } catch (e) {
        console.log(e);
      }
    }
    getChatroom();

    const messagesChannel = consumer.subscriptions.create(
      { channel: 'MessagesChannel', chatroomId },
      {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log('connected to messages channel');
        },

        disconnected() {
          console.log('disconnected from messages channel');
        },

        received(data) {
          // Called when there's incoming data on the websocket for this channel

          const { newMessage } = data;

          setMessagesToShow(prevState => [...prevState, newMessage]);
        },
      },
    );

    return function cleanup() {
      messagesChannel.unsubscribe();
    };
  }, [chatroomId]);

  const handleInputChange = event => {
    if (inputError) {
      setInputError(false);
    }
    setMessage(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (message.length > 0) {
      try {
        const response = await fetch(`${API_ROOT}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, chatroomId, userId: currentUser.id }),
        });
        setMessage('');
      } catch (e) {
        console.log(e);
      }
    } else {
      setInputError(true);
    }
  };

  return (
    <div className={classes.root}>
      <h2>{currentChatroom.room.name}</h2>
      <div className={classes.messageDisplayRoot}>
        <div className={classes.messageDisplayContent}>
          {messagesToShow.length === 0 ? (
            <p>Send a message to start the chat!</p>
          ) : (
            messagesToShow.map((messageToShow, index) => (
              <MessageDisplay
                messageObj={messageToShow}
                messageId={messageToShow.id}
                key={`${currentChatroom.room.name}-${messageToShow.id + index}`}
              />
            ))
          )}
        </div>
      </div>
      <form
        className={classes.formRoot}
        onSubmit={event => handleFormSubmit(event)}
      >
        <FormControl>
          <InputLabel htmlFor="chatroom-name-input">Message</InputLabel>
          <Input
            id="chatroom-name-input"
            onChange={event => handleInputChange(event)}
            value={message}
          />
          {inputError && (
            <FormHelperText error>*Message required</FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </form>
    </div>
  );
}
