import consumer from './consumer';

consumer.subscriptions.create('ChatroomChannel', {
  connected() {
    // Called when the subscription is ready for use on the server
    // console.log('connected to chatroom channel');
  },

  disconnected() {
    // console.log('disconnected from chatroom channel');
    // Called when the subscription has been terminated by the server
  },

  // received(data) {
  //   // Called when there's incoming data on the websocket for this channel
  //   // console.log('we received data in the chatroom channel!', data);
  // },
});
