/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import consumer from '../../../channels/consumer';
// import { API_ROOT } from '../../constants';
// import { API_WS_ROOT } from '../../constants';

function ChatroomWS(props) {
  const { currentChatroomId, setCurrentChatroom } = props;
  // const [wsResponse, setWsResponse] = useState({ status: 'initialized' });

  useEffect(() => {
    // async function getChatroom() {
    //   try {
    //     const response = fetch(`${API_ROOT}/chatrooms/${currentChatroomId}`);
    //     const chatroomData = await response.json();
    //     if (!chatroomData) {
    //       console.log('no chatroom was received');
    //     } else {
    //       setCurrentChatroom(chatroomData);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // getChatroom();

    const channel = consumer.subscriptions.create(
      { channel: 'ChatroomChannel', chatroom_id: currentChatroomId },
      {
        connected() {
          // Called when the subscription is ready for use on the server
          console.log('connected to chatroom channel');
        },

        disconnected() {
          console.log('disconnected from chatroom channel');
          // Called when the subscription has been terminated by the server
        },

        received(data) {
          // Called when there's incoming data on the websocket for this channel
          console.log('we received data in the chatroom channel!', data);
          const { room, users, messages } = data;
          setCurrentChatroom({
            room: room.data,
            users,
            messages,
          });
        },
      },
    );
    // const connection = new WebSocket(API_WS_ROOT);
    // connection.onmessage = evt => {
    //   // add the new message to state
    //   console.log('ws event', evt);
    //   setWsResponse(prevState => ({
    //     ...prevState,
    //     messages: [evt.data],
    //   }));
    // };
    // console.log('ws connection', connection);

    // // Connection opened
    // connection.addEventListener('open', function (event) {
    //   connection.send('Hello Server!');
    // });

    // // Listen for messages
    // connection.addEventListener('message', function (event) {
    //   console.log('Message from server ', event.data);
    // });

    // const streamId = {
    //   command: 'message',
    //   identifier: JSON.stringify({ channel: 'ChatroomChannel' }),
    //   data: JSON.stringify({ action: 'speak', content: 'Hi everyone !' }),
    // };
    // // for testing purposes: sending to the echo service which will send it back back
    // setInterval(() => {
    //   connection.send(JSON.stringify(streamId));
    // }, 10000);

    return channel.unsubscribe();
  });

  return (
    <div>
      {/* <div>CHATROOM WS HERE WE COME!!!!! {wsResponse.status}</div> */}
      <div>CHAT ROOM ACTIONCABLE HERE WE COME!!</div>
    </div>
  );
}

ChatroomWS.propTypes = {
  setCurrentChatroom: PropTypes.func.isRequired,
};

export default ChatroomWS;
