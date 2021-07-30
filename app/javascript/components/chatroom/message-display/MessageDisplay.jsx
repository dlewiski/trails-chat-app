/* eslint-disable react/prop-types */
/* eslint radix: ["error", "as-needed"] */
import React, { useState, useEffect } from 'react';
import consumer from '../../../channels/consumer';
import { API_ROOT } from '../../constants';
import useStyles from './styles';

export default function MessageDisplay(props) {
  const { messageObj, messageId } = props;
  const reactionList = ['!!', '!?', '??', '<3', ':(', ';)'];
  const [currentReaction, setCurrentReaction] = useState('');
  const [showReactionList, setShowReactionList] = useState({
    messageId: null,
    show: false,
  });
  const classes = useStyles();

  useEffect(() => {
    const messageReactionChannel = consumer.subscriptions.create(
      { channel: 'MessageReactionsChannel', messageId },
      {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log('connected to message reactions channel');
        },

        disconnected() {
          console.log('disconnected from messages channel');
        },

        received(data) {
          // Called when there's incoming data on the websocket for this channel

          console.log(data);

          // const { newMessage } = data;

          // setMessagesToShow(prevState => [...prevState, newMessage]);
        },
      },
    );
    return function cleanup() {
      messageReactionChannel.unsubscribe();
    };
  }, [messageId]);

  const setMessageReaction = async reaction => {
    try {
      const response = await fetch(`${API_ROOT}/message_reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reaction, messageId }),
      });
      setCurrentReaction(reaction);
      console.log('response status', response.status);
    } catch (e) {
      console.log(e);
    }

    setShowReactionList({
      messageId: null,
      show: false,
    });
  };

  const handleMessageClick = event => {
    setShowReactionList(prevState => ({
      show: !prevState.show,
      messageId: parseInt(event.target.id),
    }));
  };

  return (
    <div>
      <button
        type="button"
        className={classes.messageDisplay}
        onClick={event => handleMessageClick(event)}
        id={messageObj.id}
      >
        {messageObj.content}
      </button>
      {currentReaction.length !== 0 && (
        <p className={classes.currentReactionButton}>{currentReaction}</p>
      )}
      {showReactionList.messageId === messageObj.id && showReactionList.show && (
        <div className={classes.reactionDisplayList}>
          {reactionList.map(reaction => (
            <button
              key={reaction}
              type="button"
              id={reaction}
              className={classes.reactionDisplay}
              onClick={() => setMessageReaction(reaction, messageObj.id)}
            >
              {reaction}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
